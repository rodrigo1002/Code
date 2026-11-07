#Requires -Version 7.0
[CmdletBinding()]
param([ValidateSet(5,10,30,60)][int]$IntervalSeconds = 10)

while ($true) {
    & (Join-Path $PSScriptRoot 'collect-dashboard.ps1')
    Start-Sleep -Seconds $IntervalSeconds
}
