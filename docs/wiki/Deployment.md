# Deployment

Deployment templates are available in:

```text
deploy/
templates/deployment/
```

## Docker

```bash
docker build -f deploy/Dockerfile -t apun-hi-bhagwan-hai .
docker run --env-file .env -p 3000:3000 -p 50051:50051 apun-hi-bhagwan-hai
```

## Docker Compose

```bash
docker compose -f deploy/docker-compose.yml up --build
```

## Kubernetes

```bash
kubectl apply -f deploy/k8s/
```
