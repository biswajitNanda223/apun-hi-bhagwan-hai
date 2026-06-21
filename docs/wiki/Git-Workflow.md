# Git Workflow

This repo uses Husky, lint-staged, and commitlint.

## Before Commit

```bash
npm run commit:ready
git add .
git commit -m "feat: add user api"
```

## Commit Message Format

Use Conventional Commits:

```text
type(scope optional): subject
```

Examples:

```text
feat: add user api
fix(api): handle duplicate user email
docs: update deployment guide
chore(deps): update lint tooling
```

Allowed types:

- `feat`
- `fix`
- `docs`
- `chore`
- `refactor`
- `test`
- `ci`
- `build`
- `perf`
- `style`
- `revert`
