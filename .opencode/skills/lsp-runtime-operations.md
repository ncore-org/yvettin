# Skill: LSP Runtime Operations

## Intent

Keep local language intelligence stable for TypeScript/React/Tailwind and supporting config languages.

## Start commands

- `npm run lsp:ts`
- `npm run lsp:tailwind`
- `npm run lsp:html`
- `npm run lsp:css`
- `npm run lsp:json`
- `npm run lsp:yaml`
- `npm run lsp:bash`

## Triage checklist

1. Verify command starts without module resolution errors.
2. Verify target file extension maps to the expected server.
3. Restart only affected LSP first, then full stack if needed.
4. Keep `tooling.manifest.json` in sync with any command changes.

## Frontend runtime reminder

- Yvettin frontend runs on port `4009`.
- If route behavior looks stale (404 or html-only render), do a clean build and restart runtime.
