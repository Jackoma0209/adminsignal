import Script from 'next/script'
import { fundingChoicesEnabled, FUNDING_CHOICES_SCRIPT_SRC } from '@/lib/consent'

/**
 * Google Funding Choices / Privacy & messaging loader.
 *
 * This is the Google-certified CMP (IAB TCF). It is not an ads tag and must not
 * load pagead2.googlesyndication.com or adsbygoogle Auto ads. Advertising stays
 * in AdSenseScript, which remains flag-gated and off.
 *
 * The European regulations banner still has to be published in AdSense →
 * Privacy & messaging. Until that message is live, this script may load without
 * showing a prompt.
 *
 * @see https://developers.google.com/funding-choices/fc-api-docs
 */
export default function FundingChoicesScript() {
  if (!fundingChoicesEnabled) return null

  return (
    <>
      <Script id="funding-choices" src={FUNDING_CHOICES_SCRIPT_SRC} strategy="afterInteractive" />
      <Script id="googlefc-present" strategy="afterInteractive">{`
        (function () {
          function signalGooglefcPresent() {
            if (!window.frames['googlefcPresent']) {
              if (document.body) {
                const iframe = document.createElement('iframe');
                iframe.style.cssText = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px; display: none;';
                iframe.name = 'googlefcPresent';
                document.body.appendChild(iframe);
              } else {
                setTimeout(signalGooglefcPresent, 0);
              }
            }
          }
          signalGooglefcPresent();
        })();
      `}</Script>
    </>
  )
}
