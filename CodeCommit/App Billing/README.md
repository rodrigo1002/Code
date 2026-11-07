## Billing API configuration

The API requires `BILLING_API_USER`, `BILLING_API_USER_PASSWORD`, `BILLING_ADMIN_USER`, and `BILLING_ADMIN_PASSWORD`. It fails during startup when credentials are missing. Set `BILLING_CORS_ALLOWED_ORIGINS` to a comma-separated list of exact frontend origins. Requests that modify data must send the CSRF token issued in the `XSRF-TOKEN` cookie through the `X-XSRF-TOKEN` header.

The default `local` profile uses an in-memory H2 database and creates a temporary schema. Configure PostgreSQL with `BILLING_DB_URL`, `BILLING_DB_USER`, and `BILLING_DB_PASSWORD`, and activate a non-local profile. Hibernate schema validation defaults to `validate` outside the local profile. For an existing PostgreSQL database, back it up, inspect and run `src/main/resources/db/migration/V1__invoice_amount_decimal.sql` manually before startup. The migration aborts if any stored invoice amount has more than two decimal places. Do not rely on Hibernate schema updates for production data.

Invoice amounts use decimal precision and must be positive with at most two fractional digits. PUT updates an existing invoice and returns 404 if it does not exist. GET and DELETE by ID also return 404 when the invoice is absent.
