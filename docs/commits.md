# Commit Workflow

Use this guide before creating commits in the monorepo.

## One-Time Setup

```bash
npm install
npm run prepare
```

`npm run prepare` installs the Husky Git hooks for the local clone.

## Before Committing

Run the full commit readiness check:

```bash
npm run commit:ready
```

This prints changed files and then runs:

```bash
npm run scan
```

The scan includes formatting, linting, TypeScript checking, tests, and build verification.

## Pre-Commit Hook

The Git pre-commit hook is stored in:

```text
.husky/pre-commit
```

It runs:

```bash
npm run pre-commit
```

The script runs `lint-staged` on staged files and then runs TypeScript checking.

## Commit Message Hook

The Git commit message hook is stored in:

```text
.husky/commit-msg
```

It runs commitlint and enforces Conventional Commits:

```text
type(scope optional): short subject
```

Examples:

```text
feat: add user api
fix(api): handle duplicate user email
docs: update deployment guide
chore(deps): update lint tooling
refactor(domain): simplify user factory
test(domain): cover user validation
```

Invalid examples:

```text
added api
feature: user api
feat:
```

## Recommended Commit Commands

```bash
git status --short
npm run commit:ready
git add .
git commit -m "feat: add user api"
```

Use conventional commit prefixes:

| Prefix     | Use For                                        |
| ---------- | ---------------------------------------------- |
| `feat`     | New behavior                                   |
| `fix`      | Bug fixes                                      |
| `docs`     | Documentation only                             |
| `refactor` | Code structure changes without behavior change |
| `test`     | Tests                                          |
| `chore`    | Tooling, dependencies, repo maintenance        |
| `ci`       | CI configuration                               |
| `build`    | Build system or packaging changes              |
| `perf`     | Performance improvements                       |
| `style`    | Formatting-only changes                        |
| `revert`   | Reverting a previous commit                    |

To test a commit message manually:

```bash
echo "feat: add user api" | npx commitlint
```

## Dependency Checks

Check for known vulnerabilities:

```bash
npm run deps:audit
```

Check outdated dependencies:

```bash
npm run deps:outdated
```

Run audit and outdated dependency reporting together:

```bash
npm run deps:check
```

Apply safe audit fixes:

```bash
npm run deps:fix
```

Avoid force-upgrading major versions without reading migration notes.
