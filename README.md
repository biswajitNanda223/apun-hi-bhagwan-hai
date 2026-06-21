# apun-hi-bhagwan-hai

A production-oriented Fastify monorepo built with TypeScript, npm workspaces, REST, gRPC, Prisma, SOLID layering, and factory-based composition.

This repository includes a small user-management backend that exposes the same application use cases through both HTTP REST and gRPC.

## GitHub Description

Production-ready Fastify TypeScript monorepo with REST, gRPC, Prisma, Swagger docs, deployment templates, and strict Git quality gates.

## Contents

- [Architecture](#architecture)
- [Repository Structure](#repository-structure)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [REST API](#rest-api)
- [gRPC API](#grpc-api)
- [Prisma](#prisma)
- [Scripts](#scripts)
- [Quality Gates](#quality-gates)
- [Pre-Commit Hooks](#pre-commit-hooks)
- [Commit Workflow](#commit-workflow)
- [Dependency Checks](#dependency-checks)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [Development Workflow](#development-workflow)

## Architecture

The codebase follows clean layering and dependency inversion:

```text
Client
  -> apps/api                 REST and gRPC transport layer
  -> packages/application     Use cases and orchestration
  -> packages/domain          Entities, repository ports, business rules
  -> packages/infrastructure  Prisma repository adapters
  -> Database
```

Core rules:

- Domain code has no dependency on Fastify, Prisma, gRPC, HTTP, or environment config.
- Application services depend on domain repository interfaces.
- Infrastructure implements repository interfaces.
- Transport handlers call application services only.
- Factories own object construction and dependency wiring.

## Repository Structure

```text
.
|-- apps
|   `-- api
|       |-- prisma                  Prisma schema and migrations
|       `-- src
|           |-- factories           App composition root
|           |-- grpc                gRPC server factory
|           |-- http                Fastify app and REST routes
|           `-- main.ts             Runtime entrypoint
|-- packages
|   |-- application                 Use cases and service factories
|   |-- config                      Environment loading
|   |-- contracts                   Shared gRPC proto contract helpers
|   |-- domain                      Entities, domain factories, ports
|   `-- infrastructure              Prisma client and repositories
|-- docs                            HLD, LLD, data flow, deployment docs
|-- deploy                          Docker, Compose, Kubernetes templates
|-- templates                       Release/deployment templates
|-- AGENTS.md                       Agent and contributor engineering rules
`-- README.md
```

## Prerequisites

- Node.js `22.x`
- npm `11.17.0` through `packageManager`
- Git

This repo uses npm workspaces. `pnpm` is not required.

## Quick Start

```bash
npm install
cp .env.example .env
npm run prisma:generate -w apps/api
npm run prisma:migrate -w apps/api
npm run dev
```

The app starts:

- REST API: `http://localhost:3000`
- gRPC API: `localhost:50051`
- API docs: `http://localhost:3000/docs`

Health check:

```bash
curl http://localhost:3000/health
```

Expected response:

```json
{
  "status": "ok",
  "service": "fastify-workspace-api"
}
```

## Environment Variables

Create `.env` from `.env.example`.

| Variable       | Default         | Description                    |
| -------------- | --------------- | ------------------------------ |
| `NODE_ENV`     | `development`   | Runtime environment            |
| `HOST`         | `0.0.0.0`       | REST and gRPC bind host        |
| `REST_PORT`    | `3000`          | Fastify HTTP port              |
| `GRPC_PORT`    | `50051`         | gRPC server port               |
| `DATABASE_URL` | `file:./dev.db` | Prisma database connection URL |

## REST API

Interactive Swagger UI docs are available at:

```text
http://localhost:3000/docs
```

### Health

```http
GET /health
```

### Create User

```http
POST /users
Content-Type: application/json
```

```json
{
  "email": "demo@example.com",
  "name": "Demo User"
}
```

### List Users

```http
GET /users
```

### Get User

```http
GET /users/:id
```

## gRPC API

The gRPC contract is defined in:

```text
packages/contracts/proto/user.proto
```

Server address:

```text
localhost:50051
```

## Prisma

Generate Prisma Client:

```bash
npm run prisma:generate -w apps/api
```

Create or apply local migrations:

```bash
npm run prisma:migrate -w apps/api
```

If npm workspace argument forwarding causes trouble with migration names, run Prisma directly from the API workspace:

```bash
cd apps/api
npx prisma migrate dev --schema prisma/schema.prisma --name init
```

Deploy migrations in production:

```bash
npm run prisma:deploy -w apps/api
```

Open Prisma Studio:

```bash
npm run prisma:studio -w apps/api
```

## Scripts

| Script                  | Purpose                                        |
| ----------------------- | ---------------------------------------------- |
| `npm run dev`           | Build packages, then run the API in watch mode |
| `npm run build`         | Build all packages and the API app             |
| `npm run start`         | Start the built API app                        |
| `npm run lint`          | Run ESLint                                     |
| `npm run format`        | Format files with Prettier                     |
| `npm run format:check`  | Check formatting                               |
| `npm run typecheck`     | Run TypeScript without emitting files          |
| `npm run test`          | Run Vitest                                     |
| `npm run pre-commit`    | Run staged checks and TypeScript validation    |
| `npm run commit:status` | Show changed Git files                         |
| `npm run commit:check`  | Run the full scan before committing            |
| `npm run commit:lint`   | Validate a commit message file                 |
| `npm run commit:ready`  | Show status and run the full commit check      |
| `npm run scan`          | Run format, lint, typecheck, tests, and build  |
| `npm run scan:quick`    | Run lint, typecheck, and tests                 |
| `npm run scan:security` | Run npm audit at moderate severity or higher   |
| `npm run deps:check`    | Run dependency audit and outdated report       |
| `npm run deps:outdated` | Show outdated workspace dependencies           |
| `npm run deps:audit`    | Check dependency vulnerabilities               |
| `npm run deps:fix`      | Apply safe npm audit fixes                     |

## Quality Gates

Run these before pushing changes:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
```

## Pre-Commit Hooks

Husky and lint-staged are configured.

After cloning or initializing Git:

```bash
npm install
npm run prepare
```

The pre-commit hook runs:

```bash
npm run pre-commit
```

Changed TypeScript, JavaScript, JSON, Markdown, and YAML files are formatted automatically. Lintable JS/TS files are fixed where possible.

## Commit Workflow

Before committing:

```bash
npm run commit:ready
git add .
git commit -m "feat: add user api"
```

See [Commit Workflow](./docs/commits.md) for commit conventions and dependency check commands.

Commit messages are enforced by commitlint. Use Conventional Commits:

```text
feat: add user api
fix(api): handle duplicate user email
chore(deps): update lint tooling
docs: update deployment guide
```

## Dependency Checks

```bash
npm run deps:audit
npm run deps:check
```

Current dependency audit status should be checked with `npm run deps:audit` before release. `npm run deps:outdated` reports available upgrades. Prisma is intentionally pinned to audited-safe `6.19.3` because the current npm `latest` tag for Prisma 7 reports a moderate audit finding.

## Deployment

### Docker

```bash
docker build -f deploy/Dockerfile -t fastify-workspace-api .
docker run --env-file .env -p 3000:3000 -p 50051:50051 fastify-workspace-api
```

### Docker Compose

```bash
docker compose -f deploy/docker-compose.yml up --build
```

### Kubernetes

Review and update image names in `deploy/k8s/deployment.yaml`, then apply:

```bash
kubectl apply -f deploy/k8s/
```

## Documentation

- [Architecture and HLD](./docs/architecture.md)
- [API Documentation](./docs/api.md)
- [Low-Level Design](./docs/lld.md)
- [Development Guide](./docs/development.md)
- [Deployment Guide](./docs/deployment.md)
- [Commit Workflow](./docs/commits.md)
- [Monorepo Guide](./docs/monorepo.md)
- [Agent Instructions](./AGENTS.md)
- [Wiki Home](./docs/wiki/Home.md)

## Development Workflow

1. Add business rules and repository contracts in `packages/domain`.
2. Add use cases in `packages/application`.
3. Add persistence adapters in `packages/infrastructure`.
4. Add REST or gRPC transport wiring in `apps/api`.
5. Update docs when architecture, data flow, or deployment behavior changes.
6. Run all quality gates before committing.
