# Output resource group ID
output "resource_group_id" {
  value = azurerm_resource_group.rg.id
}

# Output virtual network ID
output "virtual_network_id" {
  value = azurerm_virtual_network.vnet.id
}

# Output subnet ID
output "subnet_id" {
  value = azurerm_subnet.subnet.id
}

# Output SQL Server fully qualified domain name (FQDN)
output "sql_server_fqdn" {
  value = azurerm_sql_server.sqlserver.fully_qualified_domain_name
}

# Output SQL Server administrator login
output "sql_server_admin_login" {
  value = azurerm_sql_server.sqlserver.administrator_login
}

# Output SQL Database ID
output "sql_database_id" {
  value = azurerm_sql_database.sqldb.id
}
