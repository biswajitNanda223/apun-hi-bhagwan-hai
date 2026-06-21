# API Docs

## REST

Swagger UI:

```text
http://localhost:3000/docs
```

REST endpoints:

| Method | Path         | Purpose      |
| ------ | ------------ | ------------ |
| `GET`  | `/health`    | Health check |
| `POST` | `/users`     | Create user  |
| `GET`  | `/users`     | List users   |
| `GET`  | `/users/:id` | Get user     |

## gRPC

Address:

```text
localhost:50051
```

Proto:

```text
packages/contracts/proto/user.proto
```

Methods:

- `CreateUser`
- `GetUser`
- `ListUsers`
