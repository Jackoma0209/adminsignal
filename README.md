# AdminSignal

AdminSignal is a Next.js App Router site for authorised enterprise IT administration content: Microsoft Intune, Windows endpoints, Microsoft 365, PowerShell, troubleshooting, scripts, reviews, comparisons, and security-hardening guidance.

## Development

```bash
npm run dev
npm run lint
npm run check:adsense
npm run build
```

Open [http://localhost:3000](http://localhost:3000) during local development.

## AdSense Readiness Notes

- `https://www.adminsignal.com/ads.txt` is served by `src/app/ads.txt/route.ts`.
- The live AdSense seller Publisher ID for `ads.txt` is `pub-5563142788194204`.
- The exact seller line emitted by `/ads.txt` is:

```text
google.com, pub-5563142788194204, DIRECT, f08c47fec0942fa0
```

- AdSense ad code uses the client value `ca-pub-5563142788194204`.
- Do not use the AdSense Customer ID in `ads.txt`.
- Do not replace these IDs with placeholder or fake publisher IDs.
- The AdSense loader is route-gated so it stays off legal pages, search/noindex pages, topic/listing pages, and script library pages while those remain implementation guides.
- Incomplete archives (`/scripts`, `/reviews`, `/best-tools`, `/search`) are noindex and disallowed in `robots.ts` until they meet publication standard.
- Sitewide metadata must not claim unverifiable years of experience; author claims stay aligned with `/about`.
- Keep the inactive newsletter form hidden until MailerLite credentials are configured.
- Before re-applying to AdSense: run `npm run check:release`, confirm legal pages load, and browse the site as a first-time visitor for thin or unfinished pages.

## CMP And Consent Status

This repo does not currently include a Google-certified CMP package. Non-essential Google Analytics and AdSense scripts are gated behind:

```env
NEXT_PUBLIC_GOOGLE_CERTIFIED_CMP_ENABLED=true
```

Keep that flag `false` until a Google-certified CMP integrated with IAB Europe's TCF is configured and verified for UK, EEA, and Switzerland traffic. After CMP setup, verify that users can accept, reject, customise, and withdraw consent, and that Google Consent Mode updates are sent before analytics or advertising storage is granted.

## Script Library Status

The `/scripts` pages currently provide implementation notes: prerequisites, permissions, example fragments, validation steps, safety notes, and expected output. They are not a downloadable script catalogue. Complete `.ps1` source files are not in this repo, so every script page states that it is notes rather than a script release:

```text
This page is an implementation note with example fragments, not a complete script release.
```

Add real GitHub or source-file links only after the complete script source exists and has been reviewed.

## Newsletter Status

The homepage newsletter form posts to `/api/newsletter`, which only returns success after MailerLite accepts the subscription. If `MAILERLITE_API_TOKEN` and `MAILERLITE_GROUP_ID` are missing, the homepage shows a contact/RSS call-to-action instead of a disabled form, and the API returns `503 not_configured`.

## Legal And Disclosure Pages

Sitewide footer links include Privacy Policy, Cookie Policy, Terms, Editorial Policy, Affiliate Disclosure, Contact, About, and Advertise. Update these pages whenever analytics, advertising, affiliate relationships, sponsorship options, or editorial standards change.
