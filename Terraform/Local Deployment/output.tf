output "vm_name" {
  value = hyperv_machine_instance.default.name
}

output "vm_state" {
  value = hyperv_machine_instance.default.state
}

output "vm_memory_size_bytes" {
  value = hyperv_machine_instance.default.memory_maximum_bytes
}

output "vm_processor_count" {
  value = hyperv_machine_instance.default.processor_count
}

output "vm_network_adapter_name" {
  value = hyperv_machine_instance.default.network_adaptors[0].name
}

output "vm_network_switch_name" {
  value = hyperv_machine_instance.default.network_adaptors[0].switch_name
}

output "vm_hard_disk_path" {
  value = hyperv_machine_instance.default.hard_disk_drives[0].path
}

