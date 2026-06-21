# Development Guide

## Local Setup

```bash
npm install
cp .env.example .env
npm run prisma:generate -w apps/api
npm run prisma:migrate -w apps/api
npm run dev
```

Open REST API docs:

```text
http://localhost:3000/docs
```

Direct Prisma command:

```bash
cd apps/api
npx prisma migrate dev --schema prisma/schema.prisma --name init
```

## Adding a Feature

1. Add entity rules and repository ports in `packages/domain`.
2. Add use cases in `packages/application`.
3. Add adapter implementations in `packages/infrastructure`.
4. Add REST or gRPC transport wiring in `apps/api`.
5. Update docs and tests.

## Pre-Commit

The hook in `.husky/pre-commit` runs:

```bash
npm run precommit
```

`lint-staged` formats and lints only changed files.
