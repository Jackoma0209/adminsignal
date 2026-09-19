# Detect-AdminSignalLabProbe.ps1
# Intune Remediation detect script for a harmless lab marker.
# Exit 0 = healthy. Exit 1 = remediate. No other security control is changed.

$ErrorActionPreference = 'Stop'
$path = 'HKLM:\SOFTWARE\AdminSignalLab'
try {
    if (-not (Test-Path -LiteralPath $path)) { exit 1 }
    $value = (Get-ItemProperty -LiteralPath $path -Name Probe -ErrorAction Stop).Probe
    if ($value -eq 'healthy') { exit 0 }
    exit 1
} catch {
    exit 1
}
