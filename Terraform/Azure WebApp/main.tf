terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "3.17"
    }
  }
}

provider "azurerm" {
  features {}
  subscription_id = ""
  tenant_id       = ""
  client_id       = ""
  client_secret   = ""
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
      dotnet_version = "v6.0"
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
  administrator_login_password = "Azure@123"
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