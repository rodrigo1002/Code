# Output the virtual machine data
output "virtual_machine_info" {
  value = {
    name            = hyperv_virtual_machine.example_vm.name
    processor_count = hyperv_virtual_machine.example_vm.processor_count
    memory          = hyperv_virtual_machine.example_vm.memory
    disk_paths      = [for disk in hyperv_virtual_machine.example_vm.disk : disk.path]
    network_interfaces = [
      for iface in hyperv_virtual_machine.example_vm.network_interface : {
        ipv4_address = iface.ipv4_address[0].address
        subnet_mask  = iface.ipv4_address[0].subnet_mask
      }
    ]
  }
}
