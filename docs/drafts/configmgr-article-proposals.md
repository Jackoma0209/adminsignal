# ConfigMgr source briefs

These research briefs became three documentation-reviewed articles on 10 September 2026. They remain as provenance for the evidence that would be required before any article could claim lab testing. No field experience, tenant test or screenshots are claimed.

- `/troubleshooting/comanagement-windows-update-workload-ownership`
- `/troubleshooting/configmgr-app-content-vs-detection-before-intune`
- `/tutorials/retain-configmgr-osd-alongside-autopilot`

## 1. Prove which service owns Windows Update on a co-managed pilot

Problem: Intune reports a ring assignment while a ConfigMgr client still scans the wrong source. Complement the existing WUfB diagnosis with a ConfigMgr-first worked investigation.

Outline: record the pilot collection and workload configuration; compare CoManagementHandler.log and WUAHandler.log with effective client settings and scan-source policy; separate workload transition from update deployment; validate a successful scan and rollback scope.

Evidence needed before publication: supported ConfigMgr version and lab topology; sanitised before/after client logs from a controlled workload transition; actual WSUS/Windows Update scan results; pilot membership and rollback results. Establish precisely which software update client setting changed, rather than asserting that moving a slider alone completes migration.

Primary starting points: [workloads](https://learn.microsoft.com/en-us/intune/configmgr/comanage/workloads), [switch workloads](https://learn.microsoft.com/en-us/intune/configmgr/comanage/how-to-switch-workloads).

## 2. Diagnose ConfigMgr application content versus detection failures before an Intune migration

Problem: an application works from one distribution point but fails on remote clients; repackaging it for Intune would hide the existing delivery or detection error.

Outline: correlate application/deployment identifiers; inspect location, download, enforcement and discovery logs; test boundary-group and content availability; compare detection with the Intune Win32 model; recover one pilot deployment.

Evidence needed: a lab application with licence/redistribution rights; sanitised AppDiscovery.log, AppEnforce.log, CAS.log and ContentTransferManager.log for known success and controlled failure; exact detection rule, deployment context and distribution-point topology; tested repair and rollback. Do not invent timings or success rates.

Primary starting point: [application deployment troubleshooting](https://learn.microsoft.com/en-us/troubleshoot/mem/configmgr/app-management/troubleshoot-application-deployment).

## 3. Decide when to retain task-sequence OSD alongside Autopilot

Problem: a team mistakes OS provisioning for a co-management workload and plans to replace bare-metal recovery by changing workload ownership.

Outline: separate bare-metal, existing-device reinstall, new-device provisioning and recovery requirements; map boot media, drivers, network access and device registration; compare operational dependencies; define exit criteria for retiring an OSD path.

Evidence needed: approved lab task sequence and recovery media; tested hardware/driver matrix; recorded existing-device workflow and separate new-device Autopilot flow; connectivity limitations, BitLocker recovery process and failed-deployment recovery. Cost examples must use explicit assumptions, not invented production bills.

Primary starting points: [Autopilot existing devices](https://learn.microsoft.com/en-us/autopilot/tutorial/existing-devices/existing-devices-workflow), [ConfigMgr operating system deployment](https://learn.microsoft.com/en-us/intune/configmgr/osd/understand/introduction-to-operating-system-deployment).
