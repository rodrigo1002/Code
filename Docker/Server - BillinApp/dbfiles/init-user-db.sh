#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 -v billing_password="$BILLING_DB_PASSWORD" --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER billingapp WITH PASSWORD :'billing_password';
    CREATE DATABASE billingapp_db OWNER billingapp;
EOSQL
