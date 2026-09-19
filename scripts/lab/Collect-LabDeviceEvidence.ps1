# Collect-LabDeviceEvidence.ps1
# Read-only snapshot for AdminSignal home-lab notebooks.
# Does not print BitLocker recovery passwords or LAPS secrets.

[CmdletBinding()]
param(
    [string]$OutputDirectory,
    [switch]$AllowWorkDevice
)

$ErrorActionPreference = 'Stop'

$workDomain = $env:USERDOMAIN
if ($workDomain -match 'NORFOLK|NCHC|NHS|EEC' -and -not $AllowWorkDevice) {
    throw "Refusing to collect Autopilot or BitLocker evidence from work domain '$workDomain'. Use a personal lab VM."
}

if (-not $OutputDirectory) {
    $OutputDirectory = Join-Path $PSScriptRoot 'evidence'
}
if (-not (Test-Path -LiteralPath $OutputDirectory)) {
    New-Item -ItemType Directory -Path $OutputDirectory | Out-Null
}

$os = Get-CimInstance -ClassName Win32_OperatingSystem
$join = @{
    AzureAdJoined = $null
    DomainJoined  = $null
    DeviceId      = $null
    TenantId      = $null
}
$dsreg = & dsregcmd.exe /status 2>$null
if ($dsreg) {
    foreach ($line in $dsreg) {
        if ($line -match 'AzureAdJoined\s*:\s*(.+)$') { $join.AzureAdJoined = $Matches[1].Trim() }
        if ($line -match 'DomainJoined\s*:\s*(.+)$') { $join.DomainJoined = $Matches[1].Trim() }
        if ($line -match 'DeviceId\s*:\s*(.+)$') { $join.DeviceId = $Matches[1].Trim() }
        if ($line -match 'TenantId\s*:\s*(.+)$') { $join.TenantId = $Matches[1].Trim() }
    }
}

$bitlocker = $null
try {
    $volume = Get-BitLockerVolume -MountPoint $env:SystemDrive -ErrorAction Stop
    $bitlocker = [pscustomobject]@{
        MountPoint           = $volume.MountPoint
        VolumeStatus         = [string]$volume.VolumeStatus
        ProtectionStatus     = [string]$volume.ProtectionStatus
        EncryptionPercentage = $volume.EncryptionPercentage
        ProtectorTypes       = @($volume.KeyProtector | ForEach-Object { [string]$_.KeyProtectorType })
        ProtectorIds         = @($volume.KeyProtector | ForEach-Object { [string]$_.KeyProtectorId })
    }
} catch {
    $bitlocker = [pscustomobject]@{ Error = $_.Exception.Message }
}

$lapsEvents = @()
try {
    $lapsEvents = @(
        Get-WinEvent -FilterHashtable @{
            LogName   = 'Microsoft-Windows-LAPS/Operational'
            StartTime = (Get-Date).AddDays(-7)
        } -ErrorAction Stop |
            Select-Object -First 20 TimeCreated, Id, LevelDisplayName
    )
} catch {
    $lapsEvents = @([pscustomobject]@{ Error = $_.Exception.Message })
}

$snapshot = [pscustomobject]@{
    collectedAt     = (Get-Date).ToString('o')
    computerName    = $env:COMPUTERNAME
    userDomain      = $workDomain
    osCaption       = $os.Caption
    osBuild         = $os.BuildNumber
    osVersion       = $os.Version
    join            = $join
    bitlocker       = $bitlocker
    lapsEvents      = $lapsEvents
    note            = 'Redact DeviceId, TenantId, computer name, and protector IDs before attaching to a public article.'
}

$outFile = Join-Path $OutputDirectory ("device-snapshot-{0:yyyyMMdd-HHmmss}.json" -f (Get-Date))
$snapshot | ConvertTo-Json -Depth 6 | Set-Content -Path $outFile -Encoding UTF8
Write-Output $outFile
