# Getting Started

## Requirements

- Node.js `22.x`
- npm `11.17.0`
- Git

## Setup

```bash
npm install
cp .env.example .env
npm run prisma:generate -w apps/api
npm run prisma:migrate -w apps/api
npm run dev
```

## Verification

```bash
npm run scan
```

## Important Commands

```bash
npm run dev
npm run build
npm run test
npm run lint
npm run typecheck
npm run deps:check
```
