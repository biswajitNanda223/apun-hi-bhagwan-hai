# Architecture

## High-Level Design

```mermaid
flowchart LR
  Client[HTTP/gRPC Clients] --> Api[apps/api]
  Api --> App[packages/application]
  App --> Domain[packages/domain]
  Api --> Infra[packages/infrastructure]
  Infra --> Domain
  Infra --> Prisma[Prisma Client]
  Prisma --> Db[(Database)]
  Api --> Contracts[packages/contracts]
  Api --> Config[packages/config]
```

## Responsibilities

| Layer          | Responsibility                                                   | Must Not Own            |
| -------------- | ---------------------------------------------------------------- | ----------------------- |
| Domain         | Entities, business rules, repository contracts, domain factories | HTTP, gRPC, Prisma      |
| Application    | Use cases and orchestration                                      | Database implementation |
| Infrastructure | Prisma adapters and external system implementations              | Transport routing       |
| API App        | Composition root, REST routes, gRPC handlers                     | Business rules          |
| Contracts      | Shared gRPC proto files                                          | Runtime service logic   |
| Config         | Environment parsing                                              | Application behavior    |

## Data Flow Diagram

```mermaid
sequenceDiagram
  participant C as Client
  participant R as REST/gRPC Transport
  participant S as UserService
  participant P as UserRepository Port
  participant D as Prisma Adapter
  participant DB as Database

  C->>R: Create/List/Get user
  R->>S: Call use case
  S->>P: Use repository interface
  P->>D: Runtime implementation
  D->>DB: Prisma query
  DB-->>D: Record
  D-->>S: Domain entity
  S-->>R: DTO
  R-->>C: HTTP JSON or gRPC response
```

## Factory Design Pattern

Composition is intentionally centralized:

- `ContainerFactory` creates database clients, repositories, and application services.
- `FastifyAppFactory` creates and configures the REST API.
- `UserGrpcServerFactory` creates the gRPC server and binds service handlers.
- `UserFactory` creates and rehydrates domain entities.
- `UserServiceFactory` wires application services with repository interfaces.

This keeps construction separate from behavior and makes unit tests simple.
