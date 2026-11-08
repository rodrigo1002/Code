variable "cluster_endpoint_public_access_cidrs" {
  description = "Restricted IPv4 CIDR ranges allowed to reach the EKS public API endpoint"
  type        = list(string)

  validation {
    condition = length(var.cluster_endpoint_public_access_cidrs) > 0 && alltrue([
      for cidr in var.cluster_endpoint_public_access_cidrs : can(cidrnetmask(cidr)) && cidr != "0.0.0.0/0"
    ])
    error_message = "Supply one or more valid restricted IPv4 CIDR ranges, not a world-open range."
  }
}
