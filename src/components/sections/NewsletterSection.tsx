import { Mail, Shield } from 'lucide-react'
import Script from 'next/script'
import Container from '@/components/layout/Container'

// ---------------------------------------------------------------------------
// MailerLite embed assets
// ---------------------------------------------------------------------------

const ML_FONT_CSS = `@import url("https://assets.mlcdn.com/fonts.css?version=1775464");`

const ML_BASE_CSS = `
/* LOADER */
.ml-form-embedSubmitLoad {
  display: inline-block;
  width: 20px;
  height: 20px;
}
.g-recaptcha {
  transform: scale(1);
  -webkit-transform: scale(1);
  transform-origin: 0 0;
  -webkit-transform-origin: 0 0;
  height: ;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  border: 0;
}
.ml-form-embedSubmitLoad:after {
  content: " ";
  display: block;
  width: 11px;
  height: 11px;
  margin: 1px;
  border-radius: 50%;
  border: 4px solid #fff;
  border-color: #ffffff #ffffff #ffffff transparent;
  animation: ml-form-embedSubmitLoad 1.2s linear infinite;
}
@keyframes ml-form-embedSubmitLoad {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
#mlb2-39669348.ml-form-embedContainer {
  box-sizing: border-box;
  display: table;
  margin: 0 auto;
  position: static;
  width: 100% !important;
}
#mlb2-39669348.ml-form-embedContainer h4,
#mlb2-39669348.ml-form-embedContainer p,
#mlb2-39669348.ml-form-embedContainer span,
#mlb2-39669348.ml-form-embedContainer button {
  text-transform: none !important;
  letter-spacing: normal !important;
}
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper {
  background-color: #f6f6f6;
  border-width: 0px;
  border-color: transparent;
  border-radius: 4px;
  border-style: solid;
  box-sizing: border-box;
  display: inline-block !important;
  margin: 0;
  padding: 0;
  position: relative;
}
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper.embedPopup,
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper.embedDefault { width: 400px; }
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper.embedForm { max-width: 400px; width: 100%; }
#mlb2-39669348.ml-form-embedContainer .ml-form-align-left   { text-align: left; }
#mlb2-39669348.ml-form-embedContainer .ml-form-align-center { text-align: center; }
#mlb2-39669348.ml-form-embedContainer .ml-form-align-default {
  display: table-cell !important;
  vertical-align: middle !important;
  text-align: center !important;
}
#mlb2-39669348.ml-form-embedContainer .ml-form-align-right { text-align: right; }
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedHeader img {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  height: auto;
  margin: 0 auto !important;
  max-width: 100%;
  width: undefinedpx;
}
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody,
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody {
  padding: 20px 20px 0 20px;
}
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody.ml-form-embedBodyHorizontal {
  padding-bottom: 0;
}
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent,
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent {
  text-align: left;
  margin: 0 0 20px 0;
}
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent h4,
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent h4 {
  color: #000000;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  font-size: 30px;
  font-weight: 400;
  margin: 0 0 10px 0;
  text-align: left;
  word-break: break-word;
}
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent p,
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent p {
  color: #000000;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  margin: 0 0 10px 0;
  text-align: left;
}
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent p:last-child,
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent p:last-child {
  margin: 0;
}
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody form {
  margin: 0;
  width: 100%;
}
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-formContent,
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow {
  margin: 0 0 20px 0;
  width: 100%;
}
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow {
  float: left;
}
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-formContent.horozintalForm {
  margin: 0;
  padding: 0 0 20px 0;
  width: 100%;
  height: auto;
  float: left;
}
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow {
  margin: 0 0 10px 0;
  width: 100%;
}
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow.ml-last-item {
  margin: 0;
}
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow.ml-formfieldHorizintal {
  margin: 0;
}
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input {
  background-color: #ffffff !important;
  color: #333333 !important;
  border-color: #cccccc;
  border-radius: 4px !important;
  border-style: solid !important;
  border-width: 1px !important;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  font-size: 14px !important;
  height: auto;
  line-height: 21px !important;
  margin-bottom: 0;
  margin-top: 0;
  margin-left: 0;
  margin-right: 0;
  padding: 10px 10px !important;
  width: 100% !important;
  box-sizing: border-box !important;
  max-width: 100% !important;
}
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input::-webkit-input-placeholder { color: #333333; }
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input::-moz-placeholder { color: #333333; }
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input:-ms-input-placeholder { color: #333333; }
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input:-moz-placeholder { color: #333333; }
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow input {
  background-color: #ffffff;
  color: #333333;
  border-color: #cccccc;
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 0;
  margin-top: 0;
  padding: 10px 10px;
  width: 100%;
  box-sizing: border-box;
  overflow-y: initial;
}
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow button {
  background-color: #000000 !important;
  border-color: #000000;
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
  box-shadow: none;
  color: #ffffff !important;
  cursor: pointer;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  font-size: 14px !important;
  font-weight: 700;
  line-height: 20px;
  margin: 0 !important;
  padding: 10px !important;
  width: 100%;
  height: auto;
}
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow button:hover {
  background-color: #333333 !important;
  border-color: #333333 !important;
}
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit {
  margin: 0 0 20px 0;
  float: left;
  width: 100%;
}
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit button {
  background-color: #000000 !important;
  border: none !important;
  border-radius: 4px !important;
  box-shadow: none !important;
  color: #ffffff !important;
  cursor: pointer;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif !important;
  font-size: 14px !important;
  font-weight: 700 !important;
  line-height: 21px !important;
  height: auto;
  padding: 10px !important;
  width: 100% !important;
  box-sizing: border-box !important;
}
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit button.loading {
  display: none;
}
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit button:hover {
  background-color: #333333 !important;
}
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-select,
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow .custom-select {
  background-color: #ffffff !important;
  color: #333333 !important;
  border-color: #cccccc;
  border-radius: 4px !important;
  border-style: solid !important;
  border-width: 1px !important;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  font-size: 14px !important;
  line-height: 20px !important;
  margin-bottom: 0;
  margin-top: 0;
  padding: 10px 28px 10px 12px !important;
  width: 100% !important;
  box-sizing: border-box !important;
  max-width: 100% !important;
  height: auto;
  display: inline-block;
  vertical-align: middle;
  background: url('https://assets.mlcdn.com/ml/images/default/dropdown.svg') no-repeat right .75rem center/8px 10px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow input[type="checkbox"] {
  box-sizing: border-box;
  padding: 0;
  position: absolute;
  z-index: -1;
  opacity: 0;
  margin-top: 5px;
  margin-left: -1.5rem;
  overflow: visible;
}
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow .label-description {
  color: #000000;
  display: block;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  font-size: 12px;
  text-align: left;
  margin-bottom: 0;
  position: relative;
  vertical-align: top;
}
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow label {
  font-weight: normal;
  margin: 0;
  padding: 0;
  position: relative;
  display: block;
  min-height: 24px;
  padding-left: 24px;
}
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow label a {
  color: #000000;
  text-decoration: underline;
}
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow label p {
  color: #000000 !important;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif !important;
  font-size: 12px !important;
  font-weight: normal !important;
  line-height: 18px !important;
  padding: 0 !important;
  margin: 0 5px 0 0 !important;
}
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow label p:last-child {
  margin: 0;
}
.ml-error input, .ml-error textarea, .ml-error select { border-color: red !important; }
.ml-error .custom-checkbox-radio-list { border: 1px solid red !important; border-radius: 4px; padding: 10px; }
.ml-error .label-description,
.ml-error .label-description p,
.ml-error .label-description p a,
.ml-error label:first-child { color: #ff0000 !important; }
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow.ml-error .label-description p,
#mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow.ml-error .label-description p:first-letter {
  color: #ff0000 !important;
}
@media only screen and (max-width: 400px) {
  .ml-form-embedWrapper.embedDefault, .ml-form-embedWrapper.embedPopup { width: 100% !important; }
  .ml-form-formContent.horozintalForm { float: left !important; }
  .ml-form-formContent.horozintalForm .ml-form-horizontalRow { height: auto !important; width: 100% !important; float: left !important; }
  .ml-form-formContent.horozintalForm .ml-form-horizontalRow .ml-input-horizontal { width: 100% !important; }
  .ml-form-formContent.horozintalForm .ml-form-horizontalRow .ml-input-horizontal > div { padding-right: 0px !important; padding-bottom: 10px; }
  .ml-form-formContent.horozintalForm .ml-button-horizontal { width: 100% !important; }
  .ml-form-formContent.horozintalForm .ml-button-horizontal.labelsOn { padding-top: 0px !important; }
}
`

// Dark overrides — applied after MailerLite base CSS so !important wins
const ML_DARK_CSS = `
  .dark-form-wrapper {
    width: 100%;
  }
  #mlb2-39669348.ml-form-embedContainer .ml-form-embedWrapper {
    background-color: #1a1a1a !important;
    border: 1px solid #333 !important;
    border-radius: 12px;
  }
  #mlb2-39669348.ml-form-embedContainer .ml-form-embedContent {
    display: none !important;
  }
  #mlb2-39669348.ml-form-embedContainer input,
  #mlb2-39669348.ml-form-embedContainer textarea,
  #mlb2-39669348.ml-form-embedContainer .custom-select {
    background-color: #111 !important;
    border-color: #444 !important;
    color: #fff !important;
  }
  #mlb2-39669348.ml-form-embedContainer input::placeholder {
    color: #6b7280 !important;
  }
  #mlb2-39669348.ml-form-embedContainer button.primary {
    background-color: #0ea5e9 !important;
    border-color: #0ea5e9 !important;
    border-radius: 6px !important;
    color: #fff !important;
  }
  #mlb2-39669348.ml-form-embedContainer button.primary:hover {
    background-color: #0284c7 !important;
    border-color: #0284c7 !important;
  }
  #mlb2-39669348.ml-form-embedContainer h4,
  #mlb2-39669348.ml-form-embedContainer p {
    color: #fff !important;
  }
  #mlb2-39669348.ml-form-embedContainer .ml-form-successBody {
    padding-bottom: 20px;
  }
`

// MailerLite form HTML (exact embed, with empty comment noise stripped)
const ML_FORM_HTML = `<div id="mlb2-39669348" class="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-39669348">
  <div class="ml-form-align-center">
    <div class="ml-form-embedWrapper embedForm">
      <div class="ml-form-embedBody ml-form-embedBodyDefault row-form">
        <div class="ml-form-embedContent" style="">
          <h4>Newsletter</h4>
          <p>Signup for news and special offers!</p>
        </div>
        <form class="ml-block-form" action="https://assets.mailerlite.com/jsonp/2253596/forms/184275345577347008/subscribe" data-code="" method="post" target="_blank">
          <div class="ml-form-formContent">
            <div class="ml-form-fieldRow ml-last-item">
              <div class="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                <input aria-label="email" aria-required="true" type="email" class="form-control" data-inputmask="" name="fields[email]" placeholder="Email" autocomplete="email">
              </div>
            </div>
          </div>
          <input type="hidden" name="ml-submit" value="1">
          <div class="ml-form-embedSubmit">
            <button type="submit" class="primary">Subscribe</button>
            <button disabled="disabled" style="display: none;" type="button" class="loading" aria-hidden="true">
              <div class="ml-form-embedSubmitLoad" aria-hidden="true"></div>
              <span class="sr-only">Loading...</span>
            </button>
          </div>
          <input type="hidden" name="anticsrf" value="true">
        </form>
      </div>
      <div class="ml-form-successBody row-success" style="display: none" aria-hidden="true" role="status" aria-live="polite" aria-atomic="true">
        <div class="ml-form-successContent">
          <h4>Thank you!</h4>
          <p>You have successfully joined our subscriber list.</p>
        </div>
      </div>
    </div>
  </div>
</div>`

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function NewsletterSection() {
  return (
    <section id="newsletter" className="relative overflow-hidden border-y border-border py-24 sm:py-32">
      {/* Background gradient accent */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-30"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(59,130,246,0.12), transparent)',
        }}
      />
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.018]"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft ring-1 ring-primary/25">
            <Mail className="h-6 w-6 text-primary" />
          </div>

          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
            AdminSignal Weekly
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            The signal, every Tuesday.
          </h2>
          <p className="mb-10 text-base leading-relaxed text-muted">
            A curated digest of the most important security alerts, new guides, and fresh
            PowerShell scripts — sent once a week. No filler, no vendor hype.
          </p>

          {/* MailerLite embed ─────────────────────────────────────────────── */}
          {/* Font import */}
          <style dangerouslySetInnerHTML={{ __html: ML_FONT_CSS }} />
          {/* MailerLite base CSS */}
          <style dangerouslySetInnerHTML={{ __html: ML_BASE_CSS }} />
          {/* Dark theme overrides */}
          <style dangerouslySetInnerHTML={{ __html: ML_DARK_CSS }} />

          <div
            className="dark-form-wrapper"
            dangerouslySetInnerHTML={{ __html: ML_FORM_HTML }}
          />
          {/* ──────────────────────────────────────────────────────────────── */}

          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted/60">
            <Shield className="h-3.5 w-3.5" />
            <span>No spam&nbsp;•&nbsp;Unsubscribe any time&nbsp;•&nbsp;We never share your email.</span>
          </div>
        </div>
      </Container>

      {/* MailerLite scripts — loaded after page interactive */}
      <Script id="ml-success-39669348" strategy="afterInteractive">{`
        function ml_webform_success_39669348() {
          var $ = ml_jQuery || jQuery;
          var $success = $('.ml-subscribe-form-39669348 .row-success');
          var $form = $('.ml-subscribe-form-39669348 .row-form');
          $form.hide();
          $form.attr('aria-hidden', 'true');
          $success.show();
          $success.removeAttr('aria-hidden');
        }
      `}</Script>
      <Script
        src="https://groot.mailerlite.com/js/w/webforms.min.js?v95037e5bac78f29ed026832ca21a7c7b"
        strategy="afterInteractive"
      />
      <Script id="ml-fetch-39669348" strategy="afterInteractive">{`
        fetch("https://assets.mailerlite.com/jsonp/2253596/forms/184275345577347008/takel")
      `}</Script>
    </section>
  )
}
