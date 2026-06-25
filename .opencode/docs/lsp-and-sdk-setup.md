# OpenCode LSP and SDK Setup

This workspace uses `.opencode/package.json` as the local agent runtime.

## Installed SDK layers

- Core OpenCode SDK: `@opencode-ai/sdk`, `@opencode-ai/plugin`
- Plugin and orchestration: `@plannotator/opencode`, `@tarquinen/opencode-dcp`, `opencode-knowledge`
- Enterprise interoperability: `@modelcontextprotocol/sdk`
- Validation and contracts: `zod`
- Runtime observability: `@sentry/node`

## Installed LSP stack

- `typescript-language-server` for TS/JS/React
- `@tailwindcss/language-server` for utility class intelligence
- `vscode-langservers-extracted` for HTML/CSS/JSON
- `yaml-language-server` for CI and config yaml
- `bash-language-server` for shell scripts

## Launch commands

Run inside `.opencode/`:

- `npm run lsp:ts`
- `npm run lsp:tailwind`
- `npm run lsp:html`
- `npm run lsp:css`
- `npm run lsp:json`
- `npm run lsp:yaml`
- `npm run lsp:bash`

See `.opencode/plugins/tooling.manifest.json` for grouped runtime metadata.
