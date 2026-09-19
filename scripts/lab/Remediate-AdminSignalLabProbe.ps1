# Remediate-AdminSignalLabProbe.ps1
# Creates HKLM:\SOFTWARE\AdminSignalLab Probe=healthy. Lab-only. Roll back by deleting the key.

$ErrorActionPreference = 'Stop'
$path = 'HKLM:\SOFTWARE\AdminSignalLab'
if (-not (Test-Path -LiteralPath $path)) {
    New-Item -ItemType Directory -Path $path | Out-Null
}
New-ItemProperty -LiteralPath $path -Name Probe -Value 'healthy' -PropertyType String -Force | Out-Null
exit 0
