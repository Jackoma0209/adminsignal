# Lab-tested article briefs

Status as of 19 September 2026: each brief now has a **Home lab notebook** on the live article, plus `scripts/lab` for local collection. Pages stay **Reviewed against documentation** until `labTested` and `labScope` are set after a real personal-tenant run.

Do not publish a Tested-in-a-lab label until the notebook has been run in a **personal Microsoft 365 developer tenant or home Hyper-V lab**, with redacted screenshots and a named OS/build.

Do not use NHS, EEC, or any employer tenant. Do not invent portal screenshots, tenant IDs, or success rates.

Existing documentation-reviewed articles stay live. These briefs replace the "no tenant execution is claimed" pattern on topics you can actually prove at home.

Lab assumptions, unless a brief says otherwise:

- Microsoft 365 developer tenant you own
- One Windows 11 VM (Hyper-V or similar), Entra joined or Autopilot-registered
- Intune licence on the test user
- BitLocker capable virtual TPM or a physical spare PC
- No production users, no real hardware hashes from work devices

Verification label to use on the published page: **Tested in a lab: date, OS build, Intune service-release, what was in scope.**

---

## 1. Windows LAPS on one Entra-joined lab device

**Why:** `/tutorials/deploy-windows-laps-intune` is documentation-reviewed only. A lab run is the fastest way to turn it into original evidence.

**Problem:** prove a LAPS policy actually escrows a password and that a second account can retrieve it.

**Run:**

1. Enable the Windows LAPS tenant setting.
2. Assign a Windows LAPS policy to a one-device group.
3. Sync the lab VM and capture LAPS operational events (10029 / 10005 as they actually appear).
4. Retrieve the password with a delegated role, then confirm rotation after use.

**Evidence required:** tenant setting screenshot, policy assignment, event log snippet, retrieval timestamp (no plaintext password), post-auth rotation result.

**When not to publish:** if you only clicked through the portal and never saw a backup timestamp.

**Related live page:** `/tutorials/deploy-windows-laps-intune`

---

## 2. BitLocker recovery key escrow to Entra on the lab VM

**Why:** `/troubleshooting/bitlocker-recovery-key-not-backed-up-entra` needs at least one real escrow success and one controlled miss.

**Problem:** encryption is on, but Entra does not show a key until the backup path actually works.

**Run:**

1. Enable BitLocker on the lab VM with TPM (or TPM+PIN if that is what you can boot).
2. Confirm the key in Entra device properties.
3. Force a known failure (suspend backup policy, or encrypt before join) and capture the device-side event.

**Evidence required:** `manage-bde -status` output, Entra key ID (not the key), the event that proved backup, the recovery path you would use.

**When not to publish:** if you cannot recover the VM without the key.

**Related live page:** `/troubleshooting/bitlocker-recovery-key-not-backed-up-entra`

---

## 3. Win32 app install of a licensed freeware package

**Why:** `/troubleshooting/intune-win32-app-install-stuck-waiting` is long but untested here. One working app and one failed detection rule is enough.

**Problem:** IME shows Waiting/Failed until detection matches the installed product.

**Run:**

1. Package 7-Zip or Notepad++ (licence allows redistribution) as Win32.
2. Assign to the lab device as required.
3. Capture a successful install from IME logs.
4. Break detection on purpose, capture Failed, then restore the rule.

**Evidence required:** app assignment, `AppWorkload.log` / IME snippet, detection rule, before/after device install status. No third-party paid software.

**Related live page:** `/troubleshooting/intune-win32-app-install-stuck-waiting`

---

## 4. Intune remediation that actually detects and remediates

**Why:** `/troubleshooting/intune-remediation-script-not-running` needs one script you wrote and ran.

**Problem:** detect exits 0 when healthy, 1 when not; remediate flips a safe lab setting.

**Run:**

1. Detect a harmless setting (for example a lab-only registry value or timezone).
2. Run on a schedule against the one device.
3. Capture detect-unhealthy, remediate, detect-healthy, and the Intune report delay.

**Evidence required:** script text, exit codes, IME log lines, Intune device status timestamps.

**When not to publish:** if the script changes a security control you cannot roll back.

**Related live page:** `/troubleshooting/intune-remediation-script-not-running`

---

## 5. Company Portal enrollment of the lab VM

**Why:** `/troubleshooting/intune-company-portal-enrollment-stuck` is a diagnosis tree with no enrollment you performed.

**Problem:** Entra join succeeds, MDM enrollment does not, or Company Portal hangs.

**Run:**

1. Entra-join the VM as the test user.
2. Enroll through Company Portal or automatic MDM.
3. If it works first time, record the success path, then create one controlled failure (licence removed, or automatic enrollment off) and recover.

**Evidence required:** `dsregcmd /status` (redacted), Company Portal status, Intune device record, the failure you induced and the fix.

**Related live page:** `/troubleshooting/intune-company-portal-enrollment-stuck`

---

## 6. Windows Update for Business ring on one device

**Why:** `/tutorials/intune-windows-update-rings-wufb` and the Patch Tuesday operating model still have no ring you operated.

**Problem:** a quality-update policy either installs the expected build or it does not; guesswork is the current gap.

**Run:**

1. Put the lab VM in a Ring 0 group.
2. Assign a quality update deferral of 0 days and a deadline you can wait for.
3. Record OS build before and after, restart behaviour, and Intune update report.

**Evidence required:** policy settings, `winver` / `Get-ComputerInfo` build, Intune update status, whether Autopatch was in play (it should not be, in a home tenant).

**Related live page:** `/tutorials/intune-windows-update-rings-wufb`

---

## 7. One Settings Catalog setting versus a leftover Administrative Template

**Why:** `/tutorials/intune-admin-templates-to-settings-catalog-migration` is the right article, but it has no conflict you created.

**Problem:** the same setting exists in both sources; the device shows the unexpected value.

**Run:**

1. Pick one well-documented setting (for example a Windows Update or Defender CSCP setting).
2. Assign Admin Template and Settings Catalog with different values to the same device.
3. Record per-setting status and the effective registry/policy value.
4. Remove one source and confirm the result.

**Evidence required:** both profiles, conflict screenshot, effective value, which source you kept.

**Related live page:** `/tutorials/intune-admin-templates-to-settings-catalog-migration`

---

## 8. Emergency access accounts in the developer tenant

**Why:** `/tutorials/entra-break-glass-emergency-access-accounts` can be tested without touching production.

**Problem:** two cloud-only accounts exist, are excluded correctly, and a sign-in alert fires when used.

**Run:**

1. Create two cloud-only emergency accounts.
2. Exclude them from the lab Conditional Access policies you actually use.
3. Store credentials offline (password manager you own, not a screenshot).
4. Sign in once, confirm the monitoring alert, sign out.

**Evidence required:** account properties (no secrets), CA exclusions, the alert that fired, the 90-day test note.

**When not to publish:** if the only MFA on those accounts is SMS and you present that as the finished design.

**Related live page:** `/tutorials/entra-break-glass-emergency-access-accounts`

---

## 9. Read-only Microsoft Graph inventory from app-only auth

**Why:** `/tutorials/azuread-msonline-to-microsoft-graph-powershell-migration` is already strong. A short lab appendix with an app registration you created would make the original-evidence case.

**Problem:** a lab app with Device.Read.All (or User.Read.All) can list lab objects without a delegated admin prompt.

**Run:**

1. Register an app, grant the least permission, admin-consent in the lab tenant.
2. Connect with a certificate or client secret you rotate after the article.
3. Pull a one-page device or user count. Do not dump the directory.

**Evidence required:** app permission screenshot, `Connect-MgGraph` context, a redacted count, the secret/certificate disposal step.

**Related live page:** `/tutorials/azuread-msonline-to-microsoft-graph-powershell-migration`

---

## 10. Autopilot hardware-hash import of the lab VM

**Why:** `/troubleshooting/autopilot-device-not-importing-hardware-hash` is a flagship diagnosis page with no hash you collected.

**Problem:** `Get-WindowsAutopilotInfo` output from the VM either imports or the portal rejects the CSV for a reason you can name.

**Run:**

1. Collect the hash on the lab VM.
2. Import the one-row CSV from `/templates/autopilot-hardware-hash.csv` with real values, not REPLACE- placeholders.
3. Assign a profile, record success or the exact rejection.
4. Delete the lab device from Autopilot when finished.

**Evidence required:** serial (can be lab-labelled), import result, profile assignment, the CSV mistake if you induced one. Never publish a work-device hash.

**Related live page:** `/troubleshooting/autopilot-device-not-importing-hardware-hash`

---

## Publishing order

Do these first. They reuse devices you already need for AdSense evidence, and they thicken pages a reviewer is likely to open:

1. LAPS (1)
2. BitLocker escrow (2)
3. Autopilot hash (10)
4. Win32 app (3)
5. Company Portal enrollment (5)

Then 4, 6, 7, 8, 9.

Do not resubmit AdSense until at least five of these are live as **Tested in a lab** updates on existing URLs, or as new articles if the existing page cannot carry the evidence honestly.

## Out of scope for a home lab

- ConfigMgr co-management workload sliders
- Bare-metal OSD task sequences
- Forest/SYSVOL Group Policy design
- CrowdStrike or other paid EDR reviews
- Anything that needs an NHS or customer tenant
