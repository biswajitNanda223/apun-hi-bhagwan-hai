# Agent Instructions

This repository is a TypeScript Fastify monorepo.

## Engineering Rules

- Preserve the layer direction: `domain -> application -> infrastructure -> apps`.
- Domain code must not import Fastify, Prisma, gRPC, HTTP, environment, or filesystem concerns.
- Application code coordinates use cases through interfaces from the domain layer.
- Infrastructure implements ports and owns adapters such as Prisma repositories.
- Apps compose dependencies through factories and expose transport protocols.
- Prefer constructor injection and factory functions over global singletons.
- Keep REST and gRPC behavior aligned by calling the same application services.

## Before Opening a PR

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
```

## Git Agent Rules

- Run `npm run commit:ready` before committing when time allows.
- Use Conventional Commits only.
- Valid examples:
  - `feat: add user api`
  - `fix(api): handle duplicate user email`
  - `docs: update deployment guide`
  - `chore(deps): update lint tooling`
- Do not bypass Husky hooks unless the user explicitly asks.
- Do not commit `.env`, local databases, logs, generated coverage, or `node_modules`.
- Check `git status --short` before staging.
- Stage intentionally with `git add .` only when the whole worktree is intended for the commit.
- Push to `origin` after a successful commit when the user explicitly asks to publish.

## GitHub Repo

```text
https://github.com/biswajitNanda223/apun-hi-bhagwan-hai
```

## Change Guidelines

- Add new business behavior in `packages/domain` and `packages/application`.
- Add database implementation details in `packages/infrastructure`.
- Add route or transport wiring in `apps/api`.
- Update `docs/architecture.md` or `docs/lld.md` when changing boundaries or data flow.
