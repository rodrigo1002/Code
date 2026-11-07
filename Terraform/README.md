# Terraform examples

Each directory is an independent Terraform root module. Review its planned changes before applying them. No credentials are embedded in the provider blocks. Configure AWS credentials through the standard AWS CLI or environment credential chain.

- `Terraform/` requires an `admin_cidr` value for administrator SSH access.
- `AWS EC2/` requires `admin_cidr` and an existing `key_pair_name`.
- `AWS Docker/` requires `admin_cidr`, `app_ingress_cidr`, and `public_key_location`.
- `AWS EKS Cluster/` requires `cluster_endpoint_public_access_cidrs` with one or more restricted IPv4 CIDR ranges.

Provide the required inputs using a protected `*.tfvars` file that is excluded from version control. Do not use `0.0.0.0/0` for administrator or cluster API access. Public web listeners that were intentionally public remain open to HTTP or HTTPS traffic.
