resource "aws_instance" "inst" {
  count          = var.instance_count
  ami            = var.ami
  instance_type  = var.instance_type
  subnet_id      = var.subnet

  tags = {
    Name = "TERRAFORM-GURU-${count.index}"
  }
}

variable "instance_count" {}

variable "ami" {}

variable "instance_type" {}

variable "subnet" {}

output "aws_instances" {
  value = aws_instance.inst.*.tags.Name
}