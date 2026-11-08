# Terraform examples

Each directory is an independent Terraform root module. Review its planned changes before applying them. AWS credentials use the standard CLI or environment credential chain. Azure examples use the AzureRM provider authentication chain, such as Azure CLI login or supported environment variables.

- `Terraform/` requires an `admin_cidr` IPv4 range for administrator SSH access.
- `AWS EC2/` requires `admin_cidr` and an existing `key_pair_name`.
- `AWS Docker/` requires `admin_cidr`, `app_ingress_cidr`, and `public_key_location`.
- `AWS EKS/` and `AWS EKS Cluster/` require `cluster_endpoint_public_access_cidrs` with one or more restricted IPv4 CIDR ranges.
- `Azure SQL/` requires resource and SQL administrator inputs, including `sql_client_cidr` and a protected administrator password.
- `Azure WebApp/` requires `TF_VAR_sql_admin_password` or a protected tfvars value.
- `LocalStack EC2/` requires an `ami_id` available in the local LocalStack environment.
- `Local Hyper-V Deployment/` requires `hyperv_host`, `hyperv_user`, `hyperv_password`, and `vm_storage_path` inputs.

Provide sensitive inputs using a protected `*.tfvars` file excluded from version control or supported environment variables. Do not use `0.0.0.0/0` for administrator, SQL, or cluster API access. Public web listeners that are intentionally public may accept HTTP or HTTPS traffic. LocalStack uses its documented local test credentials and endpoints.
