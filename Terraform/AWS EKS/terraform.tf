terraform {
  required_version = ">= 1.7.4"

  required_providers {
    aws = {
      source = "registry.terraform.io/hashicorp/aws"
    }
  }
}