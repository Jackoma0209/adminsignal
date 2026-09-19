# AdminSignal home lab pack

Operator scripts for the one-device notebooks on the live articles. They are not a public script catalogue and they are not signed releases.

Run them only on a personal Microsoft 365 developer tenant and a home Windows 11 VM. Do not run them on NHS, EEC, NORFOLK, or customer endpoints.

## Order

1. `Collect-LabDeviceEvidence.ps1` on the lab VM (join state, build, BitLocker status, LAPS events).
2. LAPS notebook on `/tutorials/deploy-windows-laps-intune`
3. BitLocker escrow on `/troubleshooting/bitlocker-recovery-key-not-backed-up-entra`
4. Autopilot hash on `/troubleshooting/autopilot-device-not-importing-hardware-hash`
5. Win32 7-Zip (or Notepad++) using IntuneWinAppUtil
6. Company Portal enrollment
7. Remediations using `Detect-AdminSignalLabProbe.ps1` and `Remediate-AdminSignalLabProbe.ps1`
8. WUfB ring, Settings Catalog conflict, emergency access, Graph app-only

## After a real run

Redact tenant names, UPNs, object IDs, serials, and hashes. Then set on that article only:

```yaml
labTested: "19 September 2026"
labScope: "Windows 11 24H2 Hyper-V VM, Entra joined, personal developer tenant"
```

Until those fields exist, the page stays **Reviewed against documentation**.
