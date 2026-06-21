# Deployment

## Docker

```bash
docker build -f deploy/Dockerfile -t fastify-workspace-api .
docker run --env-file .env -p 3000:3000 -p 50051:50051 fastify-workspace-api
```

## Docker Compose

```bash
docker compose -f deploy/docker-compose.yml up --build
```

## Kubernetes

Update image names in `deploy/k8s/deployment.yaml`, then apply:

```bash
kubectl apply -f deploy/k8s/
```

## Runtime Ports

| Protocol | Env         | Default |
| -------- | ----------- | ------- |
| REST     | `REST_PORT` | `3000`  |
| gRPC     | `GRPC_PORT` | `50051` |
