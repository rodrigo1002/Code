provider "aws" {
  region     = "us-west-2"
  access_key = ""
  secret_key = ""
}

# Variable declaration
variable "user" {
  type    = string
  default = "ubuntu" # Default user name
}

# Create the ALB
resource "aws_lb" "example" {
  name               = "example-alb"
  internal           = false
  load_balancer_type = "application"
}

# Create the Target Group
resource "aws_lb_target_group" "example" {
  name     = "example-tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id
}

# Create the listener
resource "aws_lb_listener" "example" {
  load_balancer_arn = aws_lb.example.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    target_group_arn = aws_lb_target_group.example.arn
    type             = "forward"
  }
}

# Create the EC2 instances
resource "aws_instance" "docker" {
  ami           = "ami-0ff8a91507f77f867" # Ubuntu 18.04 LTS
  instance_type = "t3.micro"

  count = 4

  vpc_security_group_ids = [aws_security_group.example.id]

  user_data = <<-EOF
#!/bin/bash
sudo apt-get update
sudo apt-get install -y docker.io
EOF

  connection {
    type        = "ssh"
    user        = var.user
    private_key = file("~/.ssh/id_rsa")
    host        = "example.com" # Replace with the appropriate host value
  }

  lifecycle {
    create_before_destroy = true
  }

  provisioner "remote-exec" {
    inline = [
      "sudo usermod -a -G docker ${var.user}",
    ]
  }
}

# Create the security group
resource "aws_security_group" "example" {
  name        = "example"
  description = "Example security group"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Register the instances with the target group
resource "aws_lb_target_group_attachment" "example" {
  target_group_arn = aws_lb_target_group.example.arn
  target_id        = aws_instance.docker[0].id
  port             = 80
}

resource "aws_lb_target_group_attachment" "group" {
  target_group_arn = aws_lb_target_group.example.arn
  target_id        = aws_instance.docker[1].id
  port             = 80
}
