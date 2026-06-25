#!/usr/bin/env node

/**
 * YVETTIN - POKROČILÝ MONITORING SYSTÉM
 * 
 * Monitoruje:
 * - Štruktúru stránky (nie len HTTP status)
 * - Načítanie CSS a JS súborov
 * - Prítomnosť kľúčových komponentov
 * - Dostupnosť kategórií
 * - Remote server status
 * 
 * Spustenie: node monitoring-system.js
 */

const https = require('https');
const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// ============================================================================
// KONFIGURÁCIA
// ============================================================================

const CONFIG = {
  // Remote node
  remote: {
    host: '10.99.99.158',
    user: 'alex',
    password: 'Homosko123',
    port: 4009,
  },
  
  // Monitoring intervals (ms)
  intervals: {
    quick: 5000,      // Quick health check
    standard: 30000,  // Standard check
    deep: 300000,     // Deep structure check
  },
  
  // URLs to monitor
  urls: {
    homepage: '/',
    categories: [
      '/obuv',
      '/vypredaj',
      '/novinky',
      '/dropy',
      '/oblecenie',
      '/sport',
      '/doplnky',
      '/streetwear',
      '/premium',
    ],
    critical: [
      '/kosik',
      '/checkout',
    ],
  },
  
  // Expected structure patterns
  patterns: {
    homepage: [
      '<!DOCTYPE html>',
      '<html lang="sk">',
      'YVETTIN',
      '<header',
      '<main',
      '<footer',
      'ExitIntentPopup',
      'CookieBanner',
    ],
    category: [
      '<!DOCTYPE html>',
      'CategoryBannerSlider',
      'ProductCard',
      'BrandsCarousel',
    ],
    css: [
      '@font-face',
      'font-family',
    ],
    js: [
      'function',
      'exports',
    ],
  },
  
  // Output
  logFile: '/ncore-openclaw-backup/workspace-yvettin/yvettin/logs/monitoring.log',
  statusFile: '/ncore-openclaw-backup/workspace-yvettin/yvettin/logs/monitoring-status.json',
};

// ============================================================================
// LOGGING
// ============================================================================

class Logger {
  constructor(logFile) {
    this.logFile = logFile;
    this.ensureLogDir();
  }
  
  ensureLogDir() {
    const dir = path.dirname(this.logFile);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }
  
  log(level, message, data = null) {
    const timestamp = new Date().toISOString();
    const logLine = `[${timestamp}] [${level}] ${message}${data ? ' | ' + JSON.stringify(data) : ''}\n`;
    
    // Console output
    const colors = {
      INFO: '\x1b[32m',    // Green
      WARN: '\x1b[33m',    // Yellow
      ERROR: '\x1b[31m',   // Red
      CRITICAL: '\x1b[35m', // Magenta
    };
    
    console.log(`${colors[level] || '\x1b[37m'}${logLine}\x1b[0m`.trim());
    
    // File output
    fs.appendFileSync(this.logFile, logLine);
  }
  
  info(message, data) { this.log('INFO', message, data); }
  warn(message, data) { this.log('WARN', message, data); }
  error(message, data) { this.log('ERROR', message, data); }
  critical(message, data) { this.log('CRITICAL', message, data); }
}

const logger = new Logger(CONFIG.logFile);

// ============================================================================
// HTTP CLIENT
// ============================================================================

class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  
  async get(path, timeout = 10000) {
    return new Promise((resolve, reject) => {
      const url = new URL(path, this.baseUrl);
      const lib = url.protocol === 'https:' ? https : http;
      
      const req = lib.get(url.toString(), { timeout }, (res) => {
        let data = '';
        
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: data,
          });
        });
      });
      
      req.on('error', reject);
      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });
    });
  }
}

// ============================================================================
// MONITORING CHECKS
// ============================================================================

class MonitoringSystem {
  constructor() {
    this.publicUrl = null;
    this.status = {
      lastCheck: null,
      homepage: null,
      categories: {},
      assets: { css: null, js: null },
      remote: null,
      tunnel: null,
    };
    this.checkCount = 0;
    this.consecutiveFailures = 0;
  }
  
  // ============================================================================
  // REMOTE CHECKS
  // ============================================================================
  
  async checkRemoteServer() {
    try {
      const result = await this.sshExec('curl -s -o /dev/null -w \'%{http_code}\' http://localhost:4009/');
      const status = parseInt(result.trim());
      
      this.status.remote = {
        status: status === 200 ? 'OK' : 'ERROR',
        httpCode: status,
        timestamp: new Date().toISOString(),
      };
      
      if (status === 200) {
        logger.info('Remote server is responding', { status });
      } else {
        logger.error('Remote server returned non-200 status', { status });
      }
      
      return status === 200;
    } catch (error) {
      this.status.remote = {
        status: 'ERROR',
        error: error.message,
        timestamp: new Date().toISOString(),
      };
      logger.critical('Remote server check failed', { error: error.message });
      return false;
    }
  }
  
  async checkTunnel() {
    try {
      const result = await this.sshExec('grep trycloudflare /home/alex/tunnel.log | tail -1');
      const match = result.match(/https:\/\/[^\s]+trycloudflare\.com/);
      
      if (match) {
        this.publicUrl = match[0];
        this.status.tunnel = {
          status: 'OK',
          url: this.publicUrl,
          timestamp: new Date().toISOString(),
        };
        logger.info('Tunnel is active', { url: this.publicUrl });
        return true;
      } else {
        throw new Error('No tunnel URL found in log');
      }
    } catch (error) {
      this.status.tunnel = {
        status: 'ERROR',
        error: error.message,
        timestamp: new Date().toISOString(),
      };
      logger.critical('Tunnel check failed', { error: error.message });
      return false;
    }
  }
  
  sshExec(command) {
    return new Promise((resolve, reject) => {
      const sshpass = spawn('sshpass', [
        '-p', CONFIG.remote.password,
        'ssh',
        '-o', 'StrictHostKeyChecking=no',
        `${CONFIG.remote.user}@${CONFIG.remote.host}`,
        command
      ]);
      
      let output = '';
      let error = '';
      
      sshpass.stdout.on('data', data => output += data.toString());
      sshpass.stderr.on('data', data => error += data.toString());
      
      sshpass.on('close', code => {
        if (code === 0) {
          resolve(output);
        } else {
          reject(new Error(`SSH command failed: ${error}`));
        }
      });
    });
  }
  
  // ============================================================================
  // STRUCTURE CHECKS
  // ============================================================================
  
  async checkHomepageStructure() {
    if (!this.publicUrl) return false;
    
    try {
      const client = new HttpClient(this.publicUrl);
      const response = await client.get('/');
      
      const checks = {
        status: response.status === 200,
        hasDoctype: response.body.includes('<!DOCTYPE html>'),
        hasHtml: response.body.includes('<html lang="sk">'),
        hasHeader: response.body.includes('<header'),
        hasMain: response.body.includes('<main'),
        hasFooter: response.body.includes('<footer'),
        hasExitPopup: response.body.includes('ExitIntentPopup'),
        hasCookieBanner: response.body.includes('CookieBanner'),
        hasNavigation: response.body.includes('Dropy') && response.body.includes('VÝPREDAJ'),
      };
      
      const allPassed = Object.values(checks).every(v => v === true);
      
      this.status.homepage = {
        status: allPassed ? 'OK' : 'DEGRADED',
        checks,
        timestamp: new Date().toISOString(),
      };
      
      if (allPassed) {
        logger.info('Homepage structure OK');
      } else {
        const failed = Object.entries(checks).filter(([_, v]) => !v).map(([k]) => k);
        logger.warn('Homepage structure degraded', { failed });
      }
      
      return allPassed;
    } catch (error) {
      this.status.homepage = {
        status: 'ERROR',
        error: error.message,
        timestamp: new Date().toISOString(),
      };
      logger.critical('Homepage check failed', { error: error.message });
      return false;
    }
  }
  
  async checkCategoryPages() {
    if (!this.publicUrl) return;
    
    const client = new HttpClient(this.publicUrl);
    
    for (const category of CONFIG.urls.categories) {
      try {
        const response = await client.get(category);
        
        const checks = {
          status: response.status === 200,
          hasDoctype: response.body.includes('<!DOCTYPE html>'),
          hasBannerSlider: response.body.includes('CategoryBannerSlider'),
          hasProducts: response.body.includes('ProductCard'),
        };
        
        const allPassed = Object.values(checks).every(v => v === true);
        
        this.status.categories[category] = {
          status: allPassed ? 'OK' : 'ERROR',
          checks,
          timestamp: new Date().toISOString(),
        };
        
        if (!allPassed) {
          logger.warn(`Category ${category} check failed`);
        }
      } catch (error) {
        this.status.categories[category] = {
          status: 'ERROR',
          error: error.message,
          timestamp: new Date().toISOString(),
        };
        logger.error(`Category ${category} check failed`, { error: error.message });
      }
    }
  }
  
  async checkAssets() {
    if (!this.publicUrl) return;
    
    const client = new HttpClient(this.publicUrl);
    
    // Check CSS
    try {
      const response = await client.get('/_next/static/css/7cb3544bf353f918.css');
      
      this.status.assets.css = {
        status: response.status === 200 && response.body.includes('@font-face') ? 'OK' : 'ERROR',
        httpCode: response.status,
        size: response.body.length,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      this.status.assets.css = {
        status: 'ERROR',
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
    
    // Check JS (main chunk)
    try {
      const response = await client.get('/');
      const jsMatch = response.body.match(/\/_next\/static\/chunks\/[^"]+\.js/);
      
      if (jsMatch) {
        const jsResponse = await client.get(jsMatch[0]);
        
        this.status.assets.js = {
          status: jsResponse.status === 200 ? 'OK' : 'ERROR',
          httpCode: jsResponse.status,
          timestamp: new Date().toISOString(),
        };
      }
    } catch (error) {
      this.status.assets.js = {
        status: 'ERROR',
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }
  
  // ============================================================================
  // STATUS MANAGEMENT
  // ============================================================================
  
  async runQuickCheck() {
    this.checkCount++;
    logger.info(`Running quick check #${this.checkCount}`);
    
    const checks = await Promise.allSettled([
      this.checkRemoteServer(),
      this.checkTunnel(),
    ]);
    
    const allPassed = checks.every(r => r.status === 'fulfilled' && r.value === true);
    
    if (allPassed) {
      this.consecutiveFailures = 0;
    } else {
      this.consecutiveFailures++;
      
      if (this.consecutiveFailures >= 3) {
        logger.critical('Multiple consecutive failures detected!');
      }
    }
    
    this.status.lastCheck = new Date().toISOString();
    this.saveStatus();
  }
  
  async runDeepCheck() {
    logger.info('Running deep structure check');
    
    await Promise.allSettled([
      this.checkHomepageStructure(),
      this.checkCategoryPages(),
      this.checkAssets(),
    ]);
    
    this.status.lastCheck = new Date().toISOString();
    this.saveStatus();
  }
  
  saveStatus() {
    fs.writeFileSync(CONFIG.statusFile, JSON.stringify(this.status, null, 2));
  }
  
  // ============================================================================
  // MAIN LOOP
  // ============================================================================
  
  start() {
    logger.info('Starting monitoring system', { config: CONFIG.intervals });
    
    // Quick check every 30s
    setInterval(() => this.runQuickCheck(), CONFIG.intervals.standard);
    
    // Deep check every 5min
    setInterval(() => this.runDeepCheck(), CONFIG.intervals.deep);
    
    // Initial check
    this.runQuickCheck();
    setTimeout(() => this.runDeepCheck(), 5000);
  }
}

// ============================================================================
// START
// ============================================================================

const monitoring = new MonitoringSystem();
monitoring.start();

// Graceful shutdown
process.on('SIGINT', () => {
  logger.info('Monitoring system shutting down');
  process.exit(0);
});
