variable "vpc_cidr_block" {
  default = "10.0.0.0/16"
}
variable "private_subnet_cidr_blocks" {
  default = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
}
variable "public_subnet_cidr_blocks" {
  default = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]
}
variable "cluster_endpoint_public_access_cidrs" {
  description = "CIDR ranges allowed to reach the EKS public API endpoint"
  type        = list(string)
  validation {
    condition = length(var.cluster_endpoint_public_access_cidrs) > 0 && alltrue([
      for cidr in var.cluster_endpoint_public_access_cidrs : can(cidrhost(cidr, 0)) && cidr != "0.0.0.0/0"
    ])
    error_message = "Supply one or more valid restricted IPv4 CIDR ranges, not a world-open range."
  }
}
variable "k8s_version" {
  default = "1.27"
}

variable "k8s_cluster_name" {
  default = "myapp-eks-cluster"
}

variable "aws_region" {
  default = "eu-central-1"
}


