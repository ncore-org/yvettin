# Frontend Delivery Workflow

## 1) Intake

- Confirm request scope is frontend-only.
- Map impacted routes/components/stores.

## 2) Plan

- Select target libraries from enterprise stack.
- Decide whether change needs UI component, hook, store, or config.

## 3) Implement

- Add/update typed modules.
- Keep presentation and state separated.
- Wire observability only through approved wrappers.

## 4) Verify

- `npm run lint`
- `npm run build`
- Smoke check key viewport behavior.

## 5) Document

- Update `agent.md` when capabilities change.
- Update `.opencode/docs` when SDK/LSP/workflow changes.
