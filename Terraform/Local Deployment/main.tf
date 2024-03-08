terraform {
  required_providers {
    hyperv = {
      source  = "taliesins/hyperv"
      version = ">= 1.0.3"
    }
  }
}

provider "hyperv" {
  # Username and password for connecting to Hyper-V
  user     = "Administrator" # Update with your username
  password = "RM" # Update with your password

  # Host and port for connecting to Hyper-V
  host = "Ryan-PC" # Hyper-V host, use localhost if running on the same machine
  port = 5986        # Port for WinRM HTTPS listener

  # Connection settings
  https           = true  # Use HTTPS for WinRM
  insecure        = false # Do not allow insecure connections
  use_ntlm        = true  # Use NTLM authentication
  tls_server_name = ""    # Server name for TLS verification, leave empty for default

  # Certificate paths (if applicable)
  cacert_path = "" # Path to CA certificate, leave empty if not using custom CA
  cert_path   = "" # Path to client certificate, leave empty if not using client certificate authentication
  key_path    = "" # Path to client private key, leave empty if not using client certificate authentication

  # Timeout for connection operations
  timeout = "30s" # Connection timeout
}


resource "hyperv_network_switch" "dmz" {
  name                                    = "DMZ"
  notes                                   = ""
  allow_management_os                     = true
  enable_embedded_teaming                 = false
  enable_iov                              = false
  enable_packet_direct                    = false
  minimum_bandwidth_mode                  = "None"
  switch_type                             = "Internal"
  net_adapter_names                       = []
  default_flow_minimum_bandwidth_absolute = 0
  default_flow_minimum_bandwidth_weight   = 0
  default_queue_vmmq_enabled              = false
  default_queue_vmmq_queue_pairs          = 16
  default_queue_vrss_enabled              = false
}

resource "hyperv_vhd" "webserver" {
  path = "C:\\Code\\GitHub\\Terraform\\Local Deployment\\VM\\webserver.vhdx" #Needs to be absolute path
  size = 10737418240                                                         #10GB
}

resource "hyperv_machine_instance" "default" {
  name                                    = "RM-WebServer"
  generation                              = 2
  automatic_critical_error_action         = "Pause"
  automatic_critical_error_action_timeout = 30
  automatic_start_action                  = "StartIfRunning"
  automatic_start_delay                   = 0
  automatic_stop_action                   = "Save"
  checkpoint_type                         = "Production"
  guest_controlled_cache_types            = false
  high_memory_mapped_io_space             = 2147483648  # 2048 MB in bytes
  lock_on_disconnect                      = "Off"
  low_memory_mapped_io_space              = 2147483648
  memory_maximum_bytes                    = 2147483648  # 2048 MB in bytes
  memory_minimum_bytes                    = 2147483648
  memory_startup_bytes                    = 2147483648
  notes                                   = ""
  processor_count                         = 1
  smart_paging_file_path                  = "C:\\Code\\GitHub\\Terraform\\Local Deployment\\VM\\Hyper-V"
  snapshot_file_location                  = "C:\\Code\\GitHub\\Terraform\\Local Deployment\\VM\\Hyper-V"
  #dynamic_memory                         = false
  static_memory = true
  state         = "Running"

  # Configure firmware
  vm_firmware {
    enable_secure_boot = "Off"
    #secure_boot_template            = ""
    preferred_network_boot_protocol = "IPv4"
    console_mode                    = "None"
    pause_after_boot_failure        = "Off"
    
    boot_order {
    boot_type             = "DvdDrive"
    controller_number     = "0"
    controller_location   = "1"
  }
    boot_order {
      boot_type           = "HardDiskDrive"
      controller_number   = "0"
      controller_location = "0"
    }
    boot_order {
      boot_type            = "NetworkAdapter"
      network_adapter_name = "wan"
    }
  }

  # Configure processor
  vm_processor {
    compatibility_for_migration_enabled               = false
    compatibility_for_older_operating_systems_enabled = false
    hw_thread_count_per_core                          = 0
    maximum                                           = 100
    reserve                                           = 0
    relative_weight                                   = 100
    maximum_count_per_numa_node                       = 0
    maximum_count_per_numa_socket                     = 0
    enable_host_resource_protection                   = false
    expose_virtualization_extensions                  = false
  }

  # Configure integration services
  integration_services = {
    "Guest Service Interface" = false
    "Heartbeat"               = true
    "Key-Value Pair Exchange" = true
    "Shutdown"                = true
    "Time Synchronization"    = true
    "VSS"                     = true
  }

  # Create a network adaptor
  network_adaptors {
    name                                       = "wan"
    switch_name                                = hyperv_network_switch.dmz.name
    management_os                              = false
    is_legacy                                  = false
    dynamic_mac_address                        = true
    static_mac_address                         = ""
    mac_address_spoofing                       = "Off"
    dhcp_guard                                 = "Off"
    router_guard                               = "Off"
    port_mirroring                             = "None"
    ieee_priority_tag                          = "Off"
    vmq_weight                                 = 100
    iov_queue_pairs_requested                  = 1
    iov_interrupt_moderation                   = "Off"
    iov_weight                                 = 100
    ipsec_offload_maximum_security_association = 512
    maximum_bandwidth                          = 0
    minimum_bandwidth_absolute                 = 0
    minimum_bandwidth_weight                   = 0
    mandatory_feature_id                       = []
    resource_pool_name                         = ""
    test_replica_pool_name                     = ""
    test_replica_switch_name                   = ""
    virtual_subnet_id                          = 0
    allow_teaming                              = "On"
    not_monitored_in_cluster                   = false
    storm_limit                                = 0
    dynamic_ip_address_limit                   = 0
    device_naming                              = "Off"
    fix_speed_10g                              = "Off"
    packet_direct_num_procs                    = 0
    packet_direct_moderation_count             = 0
    packet_direct_moderation_interval          = 0
    vrss_enabled                               = true
    vmmq_enabled                               = false
    vmmq_queue_pairs                           = 16
  }

  # Create dvd drive
  dvd_drives {
    controller_number   = "0"
    controller_location = "1"
    path                = "C:\\Code\\GitHub\\Terraform\\Local Deployment\\VM\\W11.iso"
    resource_pool_name  = ""
  }

  # Create a hard disk drive
  hard_disk_drives {
    controller_type                 = "Scsi"
    controller_number               = "0"
    controller_location             = "0"
    path                            = hyperv_vhd.webserver.path
    disk_number                     = 4294967295
    resource_pool_name              = "Primordial"
    support_persistent_reservations = false
    maximum_iops                    = 0
    minimum_iops                    = 0
    qos_policy_id                   = "00000000-0000-0000-0000-000000000000"
    override_cache_attributes       = "Default"
  }
}