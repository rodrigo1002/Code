module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 19.0"

  cluster_name    = "Rodrigo-eks"
  cluster_version = "1.24"

  vpc_id                          = module.vpc.vpc_id
  subnet_ids                      = module.vpc.private_subnets
  cluster_endpoint_public_access  = true
  cluster_endpoint_private_access = true

  cluster_addons = {

    coredns = {
      resolve_conflict = "OVERWRITE"
    }

    vpc-cni = {
      resolve_conflict = "OVERWRITE"
    }

    kube-proxy = {
      resolve_conflict = "OVERWRITE"
    }

    csi = {
      resolve_conflict = "OVERWRITE"
    }
  }

  manage_aws_auth_configmap = true
   aws_auth_users = [
  {
    userarn = "arn:aws:iam::123456789012:user/developer"
    username = "Rodrigo"
    groups   = ["system:masters"]
  }
]

  eks_managed_node_groups = {
    node-group = {
      desired_capacity = 1
      max_capacity     = 2
      min_capacity     = 1
      instance_types   = ["t3.medium"]

      tags = {
        Environment = "tutorial"
      }
    }
  }

  tags = {
    Terraform   = "true"
    Environment = "tutorial"
  }
}

data "aws_eks_cluster" "cluster" {
  name = module.eks.cluster_id
}

data "aws_eks_cluster_auth" "cluster" {
  name = module.eks.cluster_id
}

provider "kubernetes" {
  host                   = data.aws_eks_cluster.cluster.endpoint
  cluster_ca_certificate = base64decode(data.aws_eks_cluster.cluster)
  token                  = data.aws_eks_cluster_auth.token

}