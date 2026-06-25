# PROJECT CONTEXT SEPARATION RULES

## Current Active Project: Yvettin
- **Location**: `/ncore-openclaw-backup/yvettin/`
- **Working scope**: Limited to Yvettin project only

## STRICT SEPARATION POLICY
1. **NO CROSS-REFERENCE** between Yvettin and NCore OpenClaw Core projects
2. **NO SHARING** of data, variables, or configurations
3. **SEPARATE WORKING DIRECTORIES** at all times
4. **CHECK PROJECT CONTEXT** before executing any commands

## Project Boundaries:
- Yvettin: `/ncore-openclaw-backup/yvettin/`
- NCore: `/ncore-openclaw-core/` (frozen, no interaction)
- Workspace: `/home/ncore-system/.openclaw/workspace/` (shared tools only)

## Before switching contexts:
1. Save current work
2. Verify current project directory
3. Update context notes
4. Clear any project-specific variables if needed