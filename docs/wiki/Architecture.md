# Architecture

The project uses layered architecture:

```text
apps/api
  -> packages/application
  -> packages/domain
  -> packages/infrastructure
  -> database
```

## Rules

- Domain owns entities and ports.
- Application owns use cases.
- Infrastructure owns adapters such as Prisma repositories.
- Apps own Fastify, REST routes, gRPC handlers, Swagger, and composition.
- Factories create dependencies and keep construction separate from behavior.

See:

- `docs/architecture.md`
- `docs/lld.md`
