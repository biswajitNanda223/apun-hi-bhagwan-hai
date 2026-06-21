# API Documentation

The Fastify app exposes FastAPI-style interactive API documentation with Swagger UI.

## Local URLs

After starting the API:

```bash
npm run dev
```

Open:

```text
http://localhost:3000/docs
```

OpenAPI JSON is available through the Swagger UI plugin routes.

## Documented REST Endpoints

| Method | Path         | Description    |
| ------ | ------------ | -------------- |
| `GET`  | `/health`    | Service health |
| `POST` | `/users`     | Create a user  |
| `GET`  | `/users`     | List users     |
| `GET`  | `/users/:id` | Get user by id |

## How Docs Are Generated

Fastify route schemas are defined beside route handlers:

```text
apps/api/src/http/routes
```

Swagger is registered before routes:

```text
apps/api/src/plugins/swagger.plugin.ts
```

When adding a new REST endpoint, add a `schema` object with:

- `tags`
- `summary`
- `body` when the route accepts a request body
- `params` when the route uses path params
- `response` for success and error responses

Keeping schemas beside routes makes validation and documentation stay aligned.
