# Monorepo Guide

This repo uses npm workspaces.

## Workspace Layout

```text
apps/*       Runnable applications
packages/*   Shared libraries and internal modules
```

## TypeScript Config Pattern

Each workspace uses two TypeScript configs:

```text
tsconfig.json         Editor and no-emit typechecking
tsconfig.build.json   Production build output to dist
```

Use source path aliases only in `tsconfig.json`. Clear path aliases in `tsconfig.build.json` so package builds resolve already-built workspace packages through `node_modules`.

## Add a New App

Create a folder under `apps`.

```text
apps/worker
|-- package.json
|-- tsconfig.json
|-- tsconfig.build.json
`-- src
    `-- main.ts
```

Example `apps/worker/package.json`:

```json
{
  "name": "@fastify-workspace/worker",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "main": "dist/main.js",
  "scripts": {
    "dev": "tsx watch src/main.ts",
    "build": "tsc -p tsconfig.build.json",
    "start": "node dist/main.js"
  },
  "dependencies": {
    "@fastify-workspace/config": "0.1.0"
  }
}
```

Example `apps/worker/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "noEmit": true,
    "paths": {
      "@fastify-workspace/config": ["../../packages/config/src/index.ts"]
    }
  },
  "include": ["src/**/*.ts"],
  "exclude": ["src/**/*.test.ts", "src/**/*.spec.ts"]
}
```

Example `apps/worker/tsconfig.build.json`:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "noEmit": false,
    "rootDir": "src",
    "outDir": "dist",
    "paths": {}
  },
  "exclude": ["src/**/*.test.ts", "src/**/*.spec.ts"]
}
```

Then add the app build command to the root `build` script if it must ship with CI.

## Add a New Package

Create a folder under `packages`.

```text
packages/notifications
|-- package.json
|-- tsconfig.json
|-- tsconfig.build.json
`-- src
    `-- index.ts
```

Example `packages/notifications/package.json`:

```json
{
  "name": "@fastify-workspace/notifications",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc -p tsconfig.build.json"
  }
}
```

Example `packages/notifications/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "noEmit": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["src/**/*.test.ts", "src/**/*.spec.ts"]
}
```

Example `packages/notifications/tsconfig.build.json`:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "noEmit": false,
    "rootDir": "src",
    "outDir": "dist"
  },
  "exclude": ["src/**/*.test.ts", "src/**/*.spec.ts"]
}
```

If another workspace imports it, use the local package version:

```json
{
  "dependencies": {
    "@fastify-workspace/notifications": "0.1.0"
  }
}
```

Then add a root TypeScript path alias in `tsconfig.json` for editor and root typecheck support:

```json
"@fastify-workspace/notifications": ["./packages/notifications/src/index.ts"]
```

If an app or package imports it directly, add the same alias to that workspace `tsconfig.json`.

## Dependency Direction

Keep dependencies moving in this direction:

```text
apps -> infrastructure -> application -> domain
```

Domain packages should not import apps, infrastructure, Prisma, Fastify, or transport libraries.

## After Adding a Workspace

```bash
npm install
npm run scan
```
