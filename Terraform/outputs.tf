output "load_balancer_dns_name" {
  value = aws_lb.example.dns_name
}

output "instance_public_ips" {
  value = aws_instance.docker[*].public_ip
}
