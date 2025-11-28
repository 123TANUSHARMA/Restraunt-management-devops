# Restaurant Microservices (Node.js) - Demo Project

Small demo project with 4 microservices (Menu, Order, Payment, Reservation), Docker, Kubernetes manifests, and GitHub Actions CI/CD.
Each service uses a small SQLite file DB (demo-friendly). API Gateway is Nginx proxy.

## Quick local run (Docker Compose)
1. Build and start:
   ```bash
   docker-compose up --build
   ```
2. Open API Gateway:
   http://localhost:8080/
   - Menu: http://localhost:8080/menu
   - Create order: POST http://localhost:8080/orders
   - Payments: http://localhost:8080/payments
   - Reservations: http://localhost:8080/reservations

## Run tests locally (per service)
Example:
```bash
cd menu-service
npm install
npm test
```

## Deploy to Minikube
1. Start minikube and enable ingress:
   ```bash
   minikube start --driver=docker
   minikube addons enable ingress
   ```
2. Use minikube docker-env to build images inside minikube's Docker daemon:
   ```bash
   eval $(minikube -p minikube docker-env)
   docker build -t menu-service:latest ./menu-service
   docker build -t order-service:latest ./order-service
   docker build -t payment-service:latest ./payment-service
   docker build -t reservation-service:latest ./reservation-service
   docker build -t api-gateway:latest ./api-gateway
   kubectl apply -f k8s/namespace.yaml
   kubectl apply -f k8s/menu-deployment.yaml
   kubectl apply -f k8s/order-deployment.yaml
   kubectl apply -f k8s/payment-deployment.yaml
   kubectl apply -f k8s/reservation-deployment.yaml
   kubectl apply -f k8s/gateway-deployment.yaml
   kubectl apply -f k8s/ingress.yaml
   ```

## GitHub Actions (CI/CD)
- Set secrets in your GitHub repository: `DOCKERHUB_USER`, `DOCKERHUB_TOKEN`, `KUBE_CONFIG` (if you want CI to deploy to K8s)
- Push to `main` to trigger the workflow.

## Notes
- Replace `YOUR_DOCKERHUB_USER` in the k8s manifests with your Docker Hub username if you push images to Docker Hub.
- This repo is intentionally small and demo-friendly. For production you'd add secure secrets management, monitoring, health checks, readiness/liveness probes, and more.
