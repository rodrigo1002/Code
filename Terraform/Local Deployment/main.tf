# main.tf
provider "hyperv" {
  server = "localhost"
}

# Define a virtual machine resource
resource "hyperv_virtual_machine" "example_vm" {
  name            = var.vm_name
  vm_switch_name = var.switch_name

  dynamic_memory {
    enabled             = true
    maximum_bytes_per_second = 10000000
    minimum_bytes_per_second = 10000000
    buffer_percentage   = 20
    weight              = 75
  }

  processor_count = 2
  memory          = 2048

  dynamic "disk" {
  for_each = [1]
  content {
    path   = "C:\\Code\\GitHub\\Terraform\\Local Deployment\\VM\\${var.vm_name}.vhdx"
    size   = 20 # Size in GB
    format = "vhdx"
  }
}

  dynamic "network_interface" {
    for_each = [1]
    content {
      dynamic "ipv4_address" {
        for_each = [1]
        content {
          address      = "192.168.1.10"
          address_type = "static"
          subnet_mask  = 24
        }
      }
    }
  }

  dynamic "network_interface" {
    for_each = [2]
    content {
      dynamic "ipv4_address" {
        for_each = [0]
        content {
          address      = "192.168.1.11"
          address_type = "static"
          subnet_mask  = 24
        }
      }
    }
  }
}
