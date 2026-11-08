output "resource_group_id" {
  value = azurerm_resource_group.rg.id
}

output "virtual_network_id" {
  value = azurerm_virtual_network.vnet.id
}

output "subnet_id" {
  value = azurerm_subnet.subnet.id
}

output "sql_server_fqdn" {
  value = azurerm_mssql_server.sqlserver.fully_qualified_domain_name
}

output "sql_server_admin_login" {
  value = azurerm_mssql_server.sqlserver.administrator_login
}

output "sql_database_id" {
  value = azurerm_mssql_database.sqldb.id
}
