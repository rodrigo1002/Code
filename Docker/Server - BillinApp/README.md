# Billing stack configuration

The Compose stack now builds the backend from `CodeCommit/App Billing`, runs its Maven verification during the image build, and requires database and API credentials from the environment. Set the `POSTGRES_PROD_*`, `POSTGRES_PREP_*`, `BILLING_PROD_*`, and `BILLING_PREP_*` variables referenced in `stack-billing.yml` before starting the stack. Keep those values in a protected environment file and do not commit it.

The PostgreSQL initialization script uses the configured `BILLING_*_DB_PASSWORD` to create a non-superuser `billingapp` role. Existing named database directories are not reinitialized by PostgreSQL. Rotate old credentials and review the schema migration manually before reusing existing data. Run the guarded amount conversion in `CodeCommit/App Billing/src/main/resources/db/migration/V1__invoice_amount_decimal.sql` before starting the updated API.

The Angular folders contain generated bundles without their original source project. Default Basic credentials were removed, so the UI remains unable to authenticate until it is rebuilt from maintained source with an explicit authentication and CSRF flow. Backend host ports bind to loopback. Put a reviewed HTTPS ingress or reverse proxy in front of the API before enabling remote browser access.
