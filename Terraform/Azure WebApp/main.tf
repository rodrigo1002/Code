terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
  }
}

provider "azurerm" {
  features {}
}
resource "azurerm_service_plan" "plan787878" {
  name                = "plan787878"
  resource_group_name = "Rodrigo-GP"
  location            = "North Europe"
  os_type             = "Windows"
  sku_name            = "F1"
}
resource "azurerm_windows_web_app" "New-App-RM" {
  name                = "New-App-RM"
  resource_group_name = "Rodrigo-GP"
  location            = "North Europe"
  service_plan_id     = azurerm_service_plan.plan787878.id

  site_config {
    always_on = false
    application_stack {
      current_stack  = "dotnet"
      dotnet_version = "v8.0"
    }
  }

  depends_on = [azurerm_service_plan.plan787878]
}

resource "azurerm_mssql_server" "sqlserver294203" {
  name                         = "sqlserver294203"
  resource_group_name          = "Rodrigo-GP"
  location                     = "North Europe"
  version                      = "12.0"
  administrator_login          = "sqlusr"
  administrator_login_password = var.sql_admin_password
}
resource "azurerm_mssql_database" "appdb" {
  name         = "appdb"
  server_id    = azurerm_mssql_server.sqlserver294203.id
  collation    = "SQL_Latin1_General_CP1_CI_AS"
  license_type = "LicenseIncluded"
  max_size_gb  = 2
  sku_name     = "Basic"
  depends_on   = [azurerm_mssql_server.sqlserver294203]
}
variable "sql_admin_password" {
  description = "SQL administrator password supplied through a protected tfvars file or TF_VAR_sql_admin_password"
  type        = string
  sensitive   = true
}
