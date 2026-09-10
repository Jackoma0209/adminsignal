# AdminSignal review — 10 September 2026

This is a documentation and static-code review, with executed website checks. No article commands were run against a tenant or endpoint. Syntax parsing is not operational testing. The work does not predict AdSense approval.

## Verified project

- GitHub: Jackoma0209/adminsignal (repository 1198334544), confirmed through the Vercel connection before checkout.
- Vercel: adminsignal, team `jackhadcroft-5882's projects` (`jackhadcroft-5882s-projects`). Both adminsignal.com and www.adminsignal.com map to this project.
- Production: main, fd9e989fa183dbdaf70f7b4b78207c363eee3c1c; latest inspected production deployment dpl_DjtKy2Y8gvWokTQhD4QVHAJionLF was READY. Build logs show Next.js 16.2.3; Node 24.x, npm run build. No production configuration, domain or environment changes made.
- Local checkout: `C:/Users/admin-hadcroft/Documents/Codex/2026-09-10/github-plugin-github-openai-curated-remote-4/work/adminsignal`. The remote matches the verified repository. Clean main was cloned; work is on `codex/adminsignal-site-fixes-20260910`.
- Search Console: `sc-domain:adminsignal.com`; access verified with GSC Wizard. All GSC operations were read-only.

## Search evidence and priorities

The latest complete window was 12 August–8 September 2026, compared with 15 July–11 August; 9 September was incomplete.

| Metric | Latest 28 days | Previous 28 days |
|---|---:|---:|
| Clicks | 194 | 98 |
| Impressions | 13,272 | 9,293 |
| CTR | 1.46% | 1.05% |
| Average position | 10.97 | 14.76 |

The Windows 25H2/26H1 comparison led with 95 clicks and 5,393 impressions (previous 58/4,724). August patch priorities had 30/2,119; remediation 21/1,400 (12/758); hardware-hash diagnosis 20/863 (3/596); Autopilot comparison 18/881 (13/502). These existing pages received priority review. Settings Catalog lost three clicks despite impressions rising 146 to 315; no traffic-based deletion was justified.

Hub declines warranted navigation work: Intune impressions 930 to 190, PowerShell 87 to 46, patch management 230 to 85; homepage 178 to 65. This is an observation, not proof of cause. ConfigMgr inspection reported discovered/currently not indexed, with no crawl; Group Policy was unknown to Google. The high-traffic Windows comparison was indexed (last crawl 29 August). Templates inspection showed an older indexed copy (30 August), conflicting with the current production noindex directive. Making the complete template page consistently indexable resolves that configuration conflict, but does not guarantee indexing.

## Baseline and changes

The historical 59-entry sitemap was still valid: every listed URL returned 200. All four comparison articles were already present. `/scripts` and `/reviews` already returned 404 and were absent from main navigation; the robots blocks remained. Two relevant consolidations already existed: the RSoP tutorial to the GPO diagnosis and Defender comparison to the MDE rollout tutorial. These were preserved, not recreated.

The new sitemap has 60 URLs, adding the complete `/templates` page. It derives article eligibility from published registries/content, excludes drafts/retired/redirected/noindex routes, and uses meaningful source dates. Retired `/scripts` and `/reviews` remain 404 and now crawlable; `/search` and `/api/` robots rules remain. Filtered archive variants are noindex with base-page canonicals. No new consolidation, unrelated homepage redirect, URL rename or useful-page removal was introduced.

ConfigMgr and Group Policy remain distinct curated hubs, with accurate unique counts, explicit scope and problem-oriented reading paths. Promotional gaps and duplicate summaries were removed. ConfigMgr's meta description now concerns entitlement, provisioning, workloads and decision guidance. Three unpublished ConfigMgr research briefs are in `docs/drafts/configmgr-article-proposals.md`; each lists evidence needed before publication. They create no public article routes.

The About biography uses only the supplied facts about Jack Hadcroft; professional links and representative guides remain. Editorial labels distinguish documentation review, supported execution evidence and illustrative examples. Generated HTML illustrations are labelled honestly; genuine screenshots are retained, empty placeholders removed. Heading-only clarifications do not automatically advance article review dates; substantive corrections are recorded on affected pages.

## Technical sources supporting corrections

- [Configuration Manager licensing FAQ](https://learn.microsoft.com/en-us/intune/configmgr/core/understand/product-and-licensing-faq): applicable full Intune subscriptions include ConfigMgr entitlement, with specific exclusions and SQL restrictions; infrastructure and operations still cost money.
- [Co-management workloads](https://learn.microsoft.com/en-us/intune/configmgr/comanage/workloads): seven workloads; provisioning/OSD is a separate architecture decision.
- [Emergency access accounts](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/security-emergency-access): strong independent MFA, active emergency roles and regular validation.
- [Graph BitLocker key listing](https://learn.microsoft.com/en-us/graph/api/bitlocker-list-recoverykeys?view=graph-rest-1.0) and [BackupToAAD-BitLockerKeyProtector](https://learn.microsoft.com/en-us/powershell/module/bitlocker/backuptoaad-bitlockerkeyprotector?view=windowsserver2025-ps): distinguish metadata, secrets, local backup invocation and verified escrow.
- [Custom compliance scripts](https://learn.microsoft.com/en-us/intune/device-security/compliance/create-custom-script) and [Remediations](https://learn.microsoft.com/en-us/intune/device-management/tools/deploy-remediations): JSON discovery versus detection exit conventions.
- [Graph paging](https://learn.microsoft.com/en-us/graph/paging): collection results must follow nextLink; increasing top is not complete enumeration.
- [Win32_Product side effects](https://learn.microsoft.com/en-us/troubleshoot/windows-server/admin-development/windows-installer-reconfigured-all-applications): registry inventory avoids triggering Windows Installer consistency checks.
- [Windows release information](https://learn.microsoft.com/en-us/windows/release-health/windows11-release-information): support dates and release/build families, including the special 26H1 hardware scope.

Claim-specific official references remain adjacent to the corrected text. News stays anchored to its publication period rather than silently replacing historical patch advice with current-month claims.

## Published-article ledger

Every one of the 37 currently published MDX articles was included in the content review. The table identifies its disposition; it is not a certificate that every possible environment or command was tested.

| Article | Review disposition |
|---|---|
| [/tutorials/azuread-msonline-to-microsoft-graph-powershell-migration](https://www.adminsignal.com/tutorials/azuread-msonline-to-microsoft-graph-powershell-migration) | Retained Graph migration guidance; clarified the documentation-review basis without claiming execution. |
| [/tutorials/conditional-access-m365-policy-map](https://www.adminsignal.com/tutorials/conditional-access-m365-policy-map) | Corrected compliance/app-protection distinctions, risk licensing and workload-identity scope. |
| [/tutorials/deploy-windows-laps-intune](https://www.adminsignal.com/tutorials/deploy-windows-laps-intune) | Reworked LAPS around supported join/back-up choices, permissions, event IDs and recovery checks. |
| [/tutorials/entra-break-glass-emergency-access-accounts](https://www.adminsignal.com/tutorials/entra-break-glass-emergency-access-accounts) | Corrected strong emergency MFA, permanently active emergency roles and both-account validation. |
| [/tutorials/exchange-online-smtp-auth-basic-auth-2026-migration](https://www.adminsignal.com/tutorials/exchange-online-smtp-auth-basic-auth-2026-migration) | Retained the revised SMTP AUTH retirement timeline; clarified verification basis. |
| [/tutorials/hardening-windows-11-cis-benchmark](https://www.adminsignal.com/tutorials/hardening-windows-11-cis-benchmark) | Corrected benchmark tooling, configuration conflicts, Credential Guard/HVCI interpretation and UEFI rollback; supported-release prerequisite. |
| [/tutorials/intune-admin-templates-to-settings-catalog-migration](https://www.adminsignal.com/tutorials/intune-admin-templates-to-settings-catalog-migration) | Removed unsupported execution language and added paging to collection helpers. |
| [/tutorials/intune-windows-update-rings-wufb](https://www.adminsignal.com/tutorials/intune-windows-update-rings-wufb) | Retained separate quality/feature update controls, pilot validation and rollback guidance. |
| [/tutorials/microsoft-365-admin-centre-mfa-readiness](https://www.adminsignal.com/tutorials/microsoft-365-admin-centre-mfa-readiness) | Corrected expired postponement wording and added paginated role/eligibility collection reads. |
| [/tutorials/microsoft-defender-for-endpoint-intune-rollout](https://www.adminsignal.com/tutorials/microsoft-defender-for-endpoint-intune-rollout) | Retained onboarding/licensing and validation guidance; clarified verification basis. |
| [/tutorials/patch-tuesday-intune-wufb-operations](https://www.adminsignal.com/tutorials/patch-tuesday-intune-wufb-operations) | Retained the separate recurring Patch Tuesday operating procedure; monthly news does not replace this workflow. |
| [/tutorials/powershell-software-inventory-system](https://www.adminsignal.com/tutorials/powershell-software-inventory-system) | Replaced the unsafe/incomplete inventory approach with registry-based, remotely executed collection and explicit partial-failure handling; no Win32_Product query. |
| [/tutorials/secure-boot-ca-2023-rollout-enterprise-readiness](https://www.adminsignal.com/tutorials/secure-boot-ca-2023-rollout-enterprise-readiness) | Reviewed certificate readiness, update events and lifecycle references; changed recovery checks to protector IDs without printing passwords. |
| [/troubleshooting/autopilot-device-not-importing-hardware-hash](https://www.adminsignal.com/troubleshooting/autopilot-device-not-importing-hardware-hash) | Retained CSV/import diagnosis and clarified illustrative verification status. |
| [/troubleshooting/autopilot-enrollment-status-page-stuck](https://www.adminsignal.com/troubleshooting/autopilot-enrollment-status-page-stuck) | Reworked classic ESP diagnosis by phase; distinguished device preparation; removed invented reset shortcuts. |
| [/troubleshooting/bitlocker-recovery-key-not-backed-up-entra](https://www.adminsignal.com/troubleshooting/bitlocker-recovery-key-not-backed-up-entra) | Reworked escrow diagnosis around matching device/protector IDs, read-only metadata, authorised backup and cloud verification. |
| [/troubleshooting/entra-dynamic-group-not-updating](https://www.adminsignal.com/troubleshooting/entra-dynamic-group-not-updating) | Corrected assignment-exclusion semantics; retained membership and processing diagnosis. |
| [/troubleshooting/group-policy-not-applying-diagnosis](https://www.adminsignal.com/troubleshooting/group-policy-not-applying-diagnosis) | Corrected DNS SRV checks, event interpretation, refresh timing, slow-link interpretation and recovery commands. |
| [/troubleshooting/intune-company-portal-enrollment-stuck](https://www.adminsignal.com/troubleshooting/intune-company-portal-enrollment-stuck) | Retained the distinct Company Portal/enrollment failure path and ordered evidence-preserving retries. |
| [/troubleshooting/intune-compliance-policy-not-evaluating](https://www.adminsignal.com/troubleshooting/intune-compliance-policy-not-evaluating) | Corrected custom-compliance JSON discovery versus exit status; clarified event meaning, aggregate reporting and exact-device selection. |
| [/troubleshooting/intune-device-not-syncing](https://www.adminsignal.com/troubleshooting/intune-device-not-syncing) | Renamed unsupported tested-environment heading; corrected MDM URL interpretation and added paging to device lookup. |
| [/troubleshooting/intune-remediation-script-not-running](https://www.adminsignal.com/troubleshooting/intune-remediation-script-not-running) | Separated missing-state detection from read errors; corrected remediation exit handling and single-device action selection. |
| [/troubleshooting/intune-win32-app-install-stuck-waiting](https://www.adminsignal.com/troubleshooting/intune-win32-app-install-stuck-waiting) | Corrected PowerShell path escaping and exact managed-device selection; retained detection/return-code diagnosis. |
| [/troubleshooting/wufb-deferral-not-respected](https://www.adminsignal.com/troubleshooting/wufb-deferral-not-respected) | Retained scan-source, policy-owner and effective deferral investigation; clarified illustrative checks. |
| [/comparisons/autopilot-v1-vs-v2-2026](https://www.adminsignal.com/comparisons/autopilot-v1-vs-v2-2026) | Reviewed classic Autopilot versus device preparation boundaries; clarified verification wording. |
| [/comparisons/entra-id-p1-vs-p2](https://www.adminsignal.com/comparisons/entra-id-p1-vs-p2) | Corrected P1/P2 risk and Governance licensing/beneficiary distinctions. |
| [/comparisons/intune-vs-sccm-mecm-2025](https://www.adminsignal.com/comparisons/intune-vs-sccm-mecm-2025) | Corrected seven co-management workloads, separate provisioning architecture, ConfigMgr entitlement and infrastructure costs. |
| [/comparisons/windows-11-25h2-vs-26h1-2026](https://www.adminsignal.com/comparisons/windows-11-25h2-vs-26h1-2026) | Retained the hardware-specific 26H1 versus broad-fleet 25H2 decision; checked Microsoft release/support information. |
| [/news/august-2026-patch-tuesday-admin-priorities](https://www.adminsignal.com/news/august-2026-patch-tuesday-admin-priorities) | Retained August-specific KB/build priorities; checked release information and the MSRC WinSock EoP record. |
| [/news/october-2026-windows-servicing-deadlines](https://www.adminsignal.com/news/october-2026-windows-servicing-deadlines) | Corrected build-family wording, support versus ESU terminology, certificate interpretation and OS-version inventory. |
| [/news/june-2026-patch-tuesday-admin-priorities](https://www.adminsignal.com/news/june-2026-patch-tuesday-admin-priorities) | Retained the historical June patch briefing and explicit validation priorities; release KB/build references reviewed. |
| [/news/intune-security-best-practices-2026](https://www.adminsignal.com/news/intune-security-best-practices-2026) | Corrected emergency roles/MFA, PIM versus direct RBAC and current multi-admin approval workflow. |
| [/news/may-2026-patch-tuesday-readiness](https://www.adminsignal.com/news/may-2026-patch-tuesday-readiness) | Removed contradictory blanket known-issue reassurance; kept this as a historical May briefing. |
| [/news/windows-app-rd-client-deprecation-2026](https://www.adminsignal.com/news/windows-app-rd-client-deprecation-2026) | Corrected platform/client retirement scope, RDS client alternatives and unsupported installer/rollback instructions. |
| [/news/intune-frontline-mobile-migration](https://www.adminsignal.com/news/intune-frontline-mobile-migration) | Corrected single-MDM enrollment sequencing and certificate dependencies; labelled pilot numbers illustrative. |
| [/news/windows-driver-cross-signed-trust-removal](https://www.adminsignal.com/news/windows-driver-cross-signed-trust-removal) | Corrected automatic audit-to-enforcement timing, reset behaviour, allowlist and inventory limitations. |
| [/news/intune-opt-in-mdm-enrollment-preview](https://www.adminsignal.com/news/intune-opt-in-mdm-enrollment-preview) | Corrected app-sign-in versus Windows Settings enrollment scope and tenant-level change/pilot assumptions. |

## Resources, advertising and checks

Both advertised CSV starter templates are real downloadable files; placeholders are intentionally documented. Dependencies, permissions, replacement values, expected use, validation and recovery are explained. Byte-for-byte download checks supplement browser download events. Retired scripts are not advertised as complete executable tools. Existing attribution and terms remain.

Existing AdSense ownership verification is preserved. The existing nonessential Google-tag hold remains active, with no new service or publisher ID. Ads remain suppressed on error, navigation, legal and resource-library screens. The cookie control's `/cookies` fallback works. A live consent message and its Google-certified CMP/account publication settings cannot be certified from the repository; the owner must verify these in their account before enabling nonessential advertising tags. No consent or ad configuration was changed in the account.

Executed checks: production build; TypeScript; lint (zero errors, one pre-existing ScreenshotSlot img warning); static AdSense configuration and content/indexation checks; rendered audit (60 sitemap entries, 17 excluded routes, 15 discovery pages, 22 RSS items, 64 internal targets); desktop 1440px and mobile 390px browser navigation, category filter, code clipboard, images, page width, both downloads, error recovery and cookie fallback. PowerShell's parser accepted all 267 fenced examples; none were executed. The PR records final CI and deployed-preview results separately.

The static quality score is a structural heuristic, not Google evaluation or evidence of accuracy. External-reference checks found no confirmed missing article reference in the checked set; protected support pages and illustrative Graph API URLs could not be verified as ordinary public pages. No generated logs or screenshots are presented as workplace evidence.

## Before reapplying

1. Review and approve the PR, including substantive security/licensing corrections. Deployment to production requires separate approval.
2. Supply real, sanitised lab/tenant records before upgrading any example to a tested label or publishing the ConfigMgr briefs.
3. After an approved production deployment, verify canonical/indexing/removal responses and cookie behaviour again; allow Search Console time to reflect recrawls.
4. Confirm the intended Funding Choices/CMP message and regional privacy configuration in the advertising account before enabling ads.
5. Recheck [Google's site-readiness guidance](https://support.google.com/adsense/answer/7299563) and [publisher inventory-value policy](https://support.google.com/publisherpolicies/answer/11112688). Apply only when the actual site and account are ready; these changes cannot promise approval.
