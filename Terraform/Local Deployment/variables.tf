# variables.tf
variable "vm_name" {
  type    = string
  default = "Terraform-VM" # Default name for the VM
}

variable "switch_name" {
  type    = string
  default = "Default Switch" # Default name for the virtual switch
}
