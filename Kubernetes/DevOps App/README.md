# Billing application deployment

## Build and deploy

From this directory, point Docker at Minikube and build the backend from maintained Spring source. The build runs Maven verification. Build the checked-in Angular artifact only for static file serving. It no longer contains a usable API credential and cannot complete the API authentication and CSRF flow.

```sh
eval $(minikube -p minikube docker-env)
cd srcSpringbootBillingApp/billing
docker build -t billingapp-back:0.0.4 .
cd ../../billingApp_images_v4/angular
docker build -t billingapp-front:0.0.4 .
cd ../..
```

Create `postgres-secret` with `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, and `BILLING_DB_PASSWORD`. Create `pgadmin-secret` with unique `PGADMIN_DEFAULT_EMAIL` and `PGADMIN_DEFAULT_PASSWORD` values. Create `billing-api-credentials` with `SPRING_PROFILES_ACTIVE=production`, `BILLING_DB_URL`, `BILLING_DB_USER`, `BILLING_DB_PASSWORD`, `BILLING_DDL_AUTO=validate`, `BILLING_API_USER`, `BILLING_API_USER_PASSWORD`, `BILLING_ADMIN_USER`, `BILLING_ADMIN_PASSWORD`, and `BILLING_CORS_ALLOWED_ORIGINS`. Keep secret values in a secret manager or protected environment file. Do not commit them. Use the in-cluster database URL `jdbc:postgresql://postgres-service:5432/billingapp_db`.

Back up an existing database, inspect and run `srcSpringbootBillingApp/billing/src/main/resources/db/migration/V1__invoice_amount_decimal.sql` manually before deploying. It stops if existing invoice amounts have more than two decimal places. The Kubernetes PostgreSQL service is cluster-internal, and the billing API service is ClusterIP. Use a controlled ingress or `kubectl port-forward` for operator access.

Apply the database and application manifests after creating the Secrets:

```sh
kubectl apply -f db/
kubectl apply -f billingApp/
kubectl port-forward service/billing-app-back-service 7080:7080
```
