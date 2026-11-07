#Requires -Version 7.0
[CmdletBinding()]
param(
    [string]$OutputPath = (Join-Path $PSScriptRoot '..\data\dashboard.json')
)

if (-not $IsWindows) { throw 'This collector is supported only on Windows.' }

$errors = [ordered]@{}
function Get-Safely {
    param([string]$Section, [scriptblock]$Action, $Fallback = $null)
    try { & $Action } catch { $errors[$Section] = $_.Exception.Message; $Fallback }
}
function Get-Text($Value) { if ($null -eq $Value -or [string]::IsNullOrWhiteSpace("$Value")) { 'N/A' } else { "$Value" } }
function To-GiB($Bytes) { if ($null -eq $Bytes) { $null } else { [math]::Round($Bytes / 1GB, 2) } }
function Get-Status($Percent) { if ($null -eq $Percent) { 'N/A' } elseif ($Percent -ge 90) { 'Critical' } elseif ($Percent -ge 80) { 'Warning' } else { 'Normal' } }

$computer = Get-Safely 'System' { Get-CimInstance Win32_ComputerSystem -ErrorAction Stop }
$os = Get-Safely 'System' { Get-CimInstance Win32_OperatingSystem -ErrorAction Stop }
$bios = Get-Safely 'Hardware' { Get-CimInstance Win32_BIOS -ErrorAction Stop }
$processors = @(Get-Safely 'CPU' { Get-CimInstance Win32_Processor -ErrorAction Stop } @())
$displayVersion = Get-Safely 'System' { (Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion' -ErrorAction Stop).DisplayVersion }
$runningAccount = Get-Safely 'System' { [System.Security.Principal.WindowsIdentity]::GetCurrent().Name } "$env:USERDOMAIN\$env:USERNAME"

$freeGiB = if ($null -ne $os.FreePhysicalMemory) { [math]::Round($os.FreePhysicalMemory / 1MB, 2) } else { $null }
$totalGiB = To-GiB $computer.TotalPhysicalMemory
$usedGiB = if ($null -ne $totalGiB -and $null -ne $freeGiB) { [math]::Round($totalGiB - $freeGiB, 2) } else { $null }
$memoryPercent = if ($totalGiB -gt 0 -and $null -ne $usedGiB) { [math]::Round(($usedGiB / $totalGiB) * 100, 1) } else { $null }
$lastBoot = if ($os.LastBootUpTime) { [datetime]$os.LastBootUpTime } else { $null }
$lastBootText = if ($lastBoot) { $lastBoot.ToString('o') } else { $null }
$uptimeSeconds = if ($lastBoot) { [math]::Round(((Get-Date) - $lastBoot).TotalSeconds) } else { $null }

$drives = @(Get-Safely 'Storage' {
    Get-CimInstance Win32_LogicalDisk -Filter 'DriveType=3' -ErrorAction Stop | ForEach-Object {
        $used = $_.Size - $_.FreeSpace
        $percent = if ($_.Size -gt 0) { [math]::Round(($used / $_.Size) * 100, 1) } else { $null }
        [ordered]@{ letter=$_.DeviceID; label=(Get-Text $_.VolumeName); filesystem=(Get-Text $_.FileSystem); totalGiB=(To-GiB $_.Size); usedGiB=(To-GiB $used); freeGiB=(To-GiB $_.FreeSpace); usagePercent=$percent; status=(Get-Status $percent) }
    }
} @())

$adapters = @(Get-Safely 'Network' {
    $gatewayByIndex = @{}
    Get-NetRoute -DestinationPrefix '0.0.0.0/0' -ErrorAction Stop | ForEach-Object { if (-not $gatewayByIndex.ContainsKey($_.InterfaceIndex)) { $gatewayByIndex[$_.InterfaceIndex] = $_.NextHop } }
    Get-NetAdapter -IncludeHidden -ErrorAction Stop | Where-Object { $_.Status -notin @('Disabled', 'Not Present') -and $_.InterfaceDescription -notmatch 'WAN Miniport|Kernel Debug|Teredo|IP-HTTPS|6to4' } | ForEach-Object {
        $adapter = $_; $name = "$($adapter.Name) $($adapter.InterfaceDescription)"
        $kind = if ($name -match 'Virtual|Hyper-V|VirtualBox|VMware|Docker|WSL|TAP|vEthernet|Wi-Fi Direct') { 'Virtual' } elseif ($name -match 'VPN|WireGuard|OpenVPN|Tailscale') { 'VPN' } elseif ($name -match 'Wi-?Fi|Wireless|802\.11') { 'Wi-Fi' } else { 'Ethernet' }
        $ips = @(Get-NetIPAddress -InterfaceIndex $adapter.ifIndex -ErrorAction SilentlyContinue | Where-Object { $_.AddressState -eq 'Preferred' -and -not $_.SkipAsSource })
        [ordered]@{ name=$adapter.InterfaceDescription; alias=$adapter.Name; type=$kind; status="$($adapter.Status)"; mac=(Get-Text $adapter.MacAddress); linkSpeed=(Get-Text $adapter.LinkSpeed); ipv4=@($ips | Where-Object AddressFamily -eq 'IPv4' | Select-Object -ExpandProperty IPAddress); ipv6=@($ips | Where-Object AddressFamily -eq 'IPv6' | Select-Object -ExpandProperty IPAddress); gateway=(Get-Text $gatewayByIndex[$adapter.ifIndex]) }
    }
} @())

$security = [ordered]@{
    secureBoot = Get-Safely 'Security.SecureBoot' { if (Confirm-SecureBootUEFI -ErrorAction Stop) { 'Enabled' } else { 'Disabled' } } 'N/A'
    tpm = Get-Safely 'Security.TPM' { $t = Get-Tpm -ErrorAction Stop; if ($t.TpmPresent -and $t.TpmReady) { 'Ready' } elseif ($t.TpmPresent) { 'Present, not ready' } else { 'Not present' } } 'N/A'
    bitLocker = Get-Safely 'Security.BitLocker' { $v = Get-BitLockerVolume -MountPoint $env:SystemDrive -ErrorAction Stop; if ($v.ProtectionStatus -eq 1) { 'Protection enabled' } else { 'Protection disabled' } } 'N/A'
    defender = Get-Safely 'Security.Defender' { $d = Get-MpComputerStatus -ErrorAction Stop; if ($d.RealTimeProtectionEnabled) { 'Real-time protection enabled' } else { 'Real-time protection disabled' } } 'N/A'
    firewall = Get-Safely 'Security.Firewall' { $profiles = Get-NetFirewallProfile -ErrorAction Stop; if (($profiles | Where-Object Enabled -eq $false).Count) { 'One or more profiles disabled' } else { 'Enabled' } } 'N/A'
    lastUpdate = Get-Safely 'Security.WindowsUpdate' { $u = Get-HotFix -ErrorAction Stop | Sort-Object InstalledOn -Descending | Select-Object -First 1; if ($u) { "$($u.HotFixID) installed $($u.InstalledOn.ToString('yyyy-MM-dd'))" } else { 'N/A' } } 'N/A'
}

$gpus = @(Get-Safely 'GPU' {
    Get-CimInstance Win32_VideoController -ErrorAction Stop | ForEach-Object {
        $driverDate = if ($_.DriverDate) { ([datetime]$_.DriverDate).ToString('yyyy-MM-dd') } else { 'N/A' }
        # AdapterRAM is uint32 and cannot represent values above 4 GiB.
        $adapterMemoryGiB = if ($null -eq $_.AdapterRAM -or [uint64]$_.AdapterRAM -eq [uint64][uint32]::MaxValue) { $null } else { To-GiB $_.AdapterRAM }
        [ordered]@{ name=(Get-Text $_.Name); adapterMemoryGiB=$adapterMemoryGiB; driverVersion=(Get-Text $_.DriverVersion); driverDate=$driverDate }
    }
} @())

$cpuPercent = if ($processors.Count) { [math]::Round((($processors | Measure-Object LoadPercentage -Average).Average), 1) } else { $null }
$cpuName = ($processors | ForEach-Object Name | Where-Object { $_ } | Sort-Object -Unique) -join '; '
$physicalCores = ($processors | Measure-Object NumberOfCores -Sum).Sum
$logicalProcessors = ($processors | Measure-Object NumberOfLogicalProcessors -Sum).Sum
$cpuStatus = Get-Status $cpuPercent
$storageStatus = if ($drives.status -contains 'Critical') { 'Critical' } elseif ($drives.status -contains 'Warning') { 'Warning' } elseif (-not $drives.Count -or $drives.status -contains 'N/A') { 'N/A' } else { 'Normal' }
$networkStatus = if ($errors.Contains('Network')) { 'N/A' } elseif ($adapters | Where-Object { $_.status -eq 'Up' -and $_.type -ne 'Virtual' }) { 'Normal' } else { 'Warning' }
$availableSecurityValues = @($security.Values | Where-Object { $_ -ne 'N/A' })
$securityStatus = if ($availableSecurityValues -match 'disabled|not ready|not present') { 'Warning' } elseif ($availableSecurityValues.Count -eq 0) { 'N/A' } else { 'Normal' }
$deductions = 0; foreach ($status in @($cpuStatus, (Get-Status $memoryPercent), $storageStatus, $networkStatus, $securityStatus)) { if ($status -eq 'Warning') { $deductions += 8 }; if ($status -eq 'Critical') { $deductions += 20 } }

$snapshot = [ordered]@{
    collectedAt = (Get-Date).ToUniversalTime().ToString('o')
    computer = [ordered]@{ name=(Get-Text $computer.Name); manufacturer=(Get-Text $computer.Manufacturer); model=(Get-Text $computer.Model); serialNumber=(Get-Text $bios.SerialNumber); interactiveUser=(Get-Text $computer.UserName); runningAccount=(Get-Text $runningAccount) }
    windows = [ordered]@{ edition=(Get-Text $os.Caption); version=(Get-Text $os.Version); displayVersion=(Get-Text $displayVersion); build=(Get-Text $os.BuildNumber); powerShellVersion=$PSVersionTable.PSVersion.ToString(); lastBootTime=$lastBootText; uptimeSeconds=$uptimeSeconds }
    cpu = [ordered]@{ name=(Get-Text $cpuName); physicalCores=$physicalCores; logicalProcessors=$logicalProcessors; usagePercent=$cpuPercent; currentClockMHz=(($processors | Measure-Object CurrentClockSpeed -Average).Average); maxClockMHz=(($processors | Measure-Object MaxClockSpeed -Maximum).Maximum); status=$cpuStatus }
    memory = [ordered]@{ totalGiB=$totalGiB; usedGiB=$usedGiB; availableGiB=$freeGiB; usagePercent=$memoryPercent; status=(Get-Status $memoryPercent) }
    storage = $drives; network = $adapters; security = $security; gpu = $gpus
    health = [ordered]@{ score=[math]::Max(0, 100 - $deductions); rules='Warnings deduct 8 points; critical states deduct 20. CPU, memory, and storage warn at 80% and are critical at 90%. Security N/A is neutral, while known disabled, not ready, or not present security states remain warnings.'; components=[ordered]@{ cpu=$cpuStatus; memory=(Get-Status $memoryPercent); storage=$storageStatus; network=$networkStatus; security=$securityStatus } }
    errors = $errors
}

$directory = Split-Path -Parent $OutputPath
New-Item -ItemType Directory -Force -Path $directory | Out-Null
$temporary = "$OutputPath.tmp"
$snapshot | ConvertTo-Json -Depth 7 | Set-Content -LiteralPath $temporary -Encoding utf8
Move-Item -LiteralPath $temporary -Destination $OutputPath -Force
