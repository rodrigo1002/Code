output "instance_name" {
  value = aws_instance.example.name
}

output "instance_ip" {
  value = aws_instance.example.public_ip
}
