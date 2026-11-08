provider "aws" {
  region = "us-east-1"
}

data "aws_iam_user" "me" {
  user_name = "Rodrigo"
}
