#Requires -Version 7.0

if (-not $IsWindows) {
    Write-Error 'This script is supported only on Windows.'
    return
}

$errors = [System.Collections.Generic.List[string]]::new()

function Get-CimData {
    param([Parameter(Mandatory)][string]$ClassName)

    try {
        Get-CimInstance -ClassName $ClassName -ErrorAction Stop
    }
    catch {
        $errors.Add("${ClassName}: $($_.Exception.Message)")
        $null
    }
}

function Get-ValueOrNA {
    param($Value)

    if ($null -eq $Value -or [string]::IsNullOrWhiteSpace([string]$Value)) {
        'N/A'
    }
    else {
        $Value
    }
}

$computerSystem = Get-CimData -ClassName Win32_ComputerSystem
$operatingSystem = Get-CimData -ClassName Win32_OperatingSystem
$processors = @(Get-CimData -ClassName Win32_Processor)

$runningAccount = try {
    [System.Security.Principal.WindowsIdentity]::GetCurrent().Name
}
catch {
    $errors.Add("Running account: $($_.Exception.Message)")
    "$env:USERDOMAIN\$env:USERNAME"
}

$windowsRelease = try {
    (Get-ItemProperty -Path 'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion' -ErrorAction Stop).DisplayVersion
}
catch {
    $errors.Add("Windows display version: $($_.Exception.Message)")
    $null
}

$ipv4Addresses = try {
    Get-NetIPAddress -AddressFamily IPv4 -ErrorAction Stop |
        Where-Object {
            $_.IPAddress -ne '127.0.0.1' -and
            $_.AddressState -eq 'Preferred' -and
            -not $_.SkipAsSource
        } |
        Sort-Object -Property InterfaceIndex, IPAddress -Unique |
        ForEach-Object { "$($_.InterfaceAlias): $($_.IPAddress)" }
}
catch {
    $errors.Add("IPv4 addresses: $($_.Exception.Message)")
    @()
}

$cpuNames = $processors | ForEach-Object Name | Where-Object { $_ } | Sort-Object -Unique
$physicalCores = ($processors | Measure-Object -Property NumberOfCores -Sum).Sum
$logicalProcessors = ($processors | Measure-Object -Property NumberOfLogicalProcessors -Sum).Sum

$cpuInformation = if ($cpuNames) {
    "$($cpuNames -join '; ') ($(Get-ValueOrNA $physicalCores) physical cores, $(Get-ValueOrNA $logicalProcessors) logical processors)"
}
else {
    'N/A'
}

[PSCustomObject][ordered]@{
    ComputerName            = (Get-ValueOrNA $computerSystem.Name)
    InteractiveUser         = (Get-ValueOrNA $computerSystem.UserName)
    RunningAccount          = (Get-ValueOrNA $runningAccount)
    WindowsProduct          = (Get-ValueOrNA $operatingSystem.Caption)
    WindowsVersion          = (Get-ValueOrNA $operatingSystem.Version)
    WindowsBuild            = (Get-ValueOrNA $operatingSystem.BuildNumber)
    WindowsDisplayVersion   = (Get-ValueOrNA $windowsRelease)
    PowerShellVersion       = $PSVersionTable.PSVersion.ToString()
    CPU                     = $cpuInformation
    TotalMemoryGiB          = if ($computerSystem.TotalPhysicalMemory) { [math]::Round($computerSystem.TotalPhysicalMemory / 1GB, 2) } else { 'N/A' }
    AvailableMemoryGiB      = if ($null -ne $operatingSystem.FreePhysicalMemory) { [math]::Round($operatingSystem.FreePhysicalMemory / 1MB, 2) } else { 'N/A' }
    IPv4Addresses           = if ($ipv4Addresses) { $ipv4Addresses -join '; ' } else { 'N/A' }
    Errors                  = if ($errors.Count) { $errors -join '; ' } else { $null }
}
