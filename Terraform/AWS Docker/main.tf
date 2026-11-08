terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

variable "aws_region" {
  description = "AWS region for the example deployment"
  type        = string
  default     = "eu-central-1"
}
variable "vpc_cidr_block" {
  description = "CIDR block for the application VPC"
  type        = string
  default     = "10.20.0.0/16"
}
variable "subnet_cidr_block" {
  description = "CIDR block for the public application subnet"
  type        = string
  default     = "10.20.1.0/24"
}
variable "avail_zone" {
  description = "Availability zone for the instance"
  type        = string
  default     = "eu-central-1a"
}
variable "env_prefix" {
  description = "Prefix used for resource names"
  type        = string
  default     = "dev"
}
variable "admin_cidr" {
  description = "Administrator CIDR allowed to SSH to the instance"
  type        = string
  validation {
    condition     = can(cidrnetmask(var.admin_cidr)) && var.admin_cidr != "0.0.0.0/0"
    error_message = "admin_cidr must be a valid, restricted IPv4 CIDR range."
  }
}
variable "app_ingress_cidr" {
  description = "CIDR allowed to access the application on port 8080"
  type        = string
  validation {
    condition     = can(cidrnetmask(var.app_ingress_cidr)) && var.app_ingress_cidr != "0.0.0.0/0"
    error_message = "app_ingress_cidr must be a valid, restricted IPv4 CIDR range."
  }
}
variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}
variable "public_key_location" {
  description = "Path to the SSH public key file"
  type        = string
}

data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-2023.*-x86_64"]
  }
  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

resource "aws_vpc" "myapp" {
  cidr_block           = var.vpc_cidr_block
  enable_dns_support   = true
  enable_dns_hostnames = true
  tags = { Name = "${var.env_prefix}-vpc" }
}

resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.myapp.id
  cidr_block              = var.subnet_cidr_block
  availability_zone       = var.avail_zone
  map_public_ip_on_launch = true
  tags = { Name = "${var.env_prefix}-subnet" }
}

resource "aws_internet_gateway" "myapp" {
  vpc_id = aws_vpc.myapp.id
  tags   = { Name = "${var.env_prefix}-igw" }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.myapp.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.myapp.id
  }
  tags = { Name = "${var.env_prefix}-public-rtb" }
}

resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}

resource "aws_security_group" "application" {
  name        = "${var.env_prefix}-application"
  description = "Restrict SSH and application ingress to configured CIDRs"
  vpc_id      = aws_vpc.myapp.id

  ingress {
    description = "Administrator SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.admin_cidr]
  }
  ingress {
    description = "Application traffic"
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = [var.app_ingress_cidr]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = { Name = "${var.env_prefix}-application-sg" }
}

resource "aws_key_pair" "ssh" {
  key_name   = "${var.env_prefix}-server-key"
  public_key = file(var.public_key_location)
}

resource "aws_instance" "myapp" {
  ami                         = data.aws_ami.amazon_linux.id
  instance_type               = var.instance_type
  subnet_id                   = aws_subnet.public.id
  vpc_security_group_ids      = [aws_security_group.application.id]
  availability_zone           = var.avail_zone
  associate_public_ip_address = true
  key_name                    = aws_key_pair.ssh.key_name
  user_data                   = file("${path.module}/entry-script.sh")
  user_data_replace_on_change = true

  tags = { Name = "${var.env_prefix}-server" }
}

output "ami_id" {
  value = data.aws_ami.amazon_linux.id
}
output "instance_public_ip" {
  value = aws_instance.myapp.public_ip
}
