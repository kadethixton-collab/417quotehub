import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects your information.`,
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  const n = site.name;
  return (
    <LegalPage title="Privacy Policy" updated={site.legalLastUpdated}>
      <p>
        This Privacy Policy explains how {n} (&ldquo;we,&rdquo; &ldquo;us&rdquo;) collects, uses, and shares information when you use
        our website. {n} is a free referral and quote-matching service that connects homeowners in Southwest Missouri with
        independent, third-party contractors. We do not perform construction or trade work.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li><strong>Information you provide:</strong> name, phone number, email address, city, ZIP code, project type, timeline, and any project notes or photos you submit through our quote form.</li>
        <li><strong>Project photos:</strong> photos you choose to upload are resized in your browser, which also removes embedded metadata such as GPS location, before they are stored. They are kept at unlisted web addresses and shared only with your matched contractors.</li>
        <li><strong>Contractor applications:</strong> company name, contact details, trade, service areas, and related business information.</li>
        <li><strong>Automatically collected information:</strong> basic technical data such as browser type, device type, pages visited, referring URL, and which steps of the quote form were completed. This is collected through server logs and analytics tools (such as Vercel Web Analytics and, if enabled, Google Analytics, which may use cookies). We never send your name, phone number, or email to analytics tools.</li>
      </ul>

      <h2>How we use your information</h2>
      <ul>
        <li>To match your project request with <strong>no more than {site.maxQuotes}</strong> independent local contractors.</li>
        <li>To share your request details with those matched contractors so they can contact you by phone, text, or email with a quote.</li>
        <li>To follow up about your request, respond to questions, and improve our service.</li>
        <li>To prevent fraud, spam, and abuse, and to comply with legal obligations.</li>
      </ul>

      <h2>How we share your information</h2>
      <p>
        <strong>We do not sell your personal information</strong>, and we do not share your request with more than {site.maxQuotes} contractors.
        We share information only:
      </p>
      <ul>
        <li>With up to {site.maxQuotes} independent contractors matched to your project, who may contact you about it;</li>
        <li>With service providers who help us operate the website (for example hosting, form processing, and CRM tools), under confidentiality obligations;</li>
        <li>When required by law, or to protect the rights, safety, and property of our users or others.</li>
      </ul>
      <p>
        Once a contractor receives your information, their use of it is governed by their own privacy practices. We require
        our partner contractors to use your information only to respond to your project request.
      </p>

      <h2>Calls, texts &amp; your consent</h2>
      <p>
        By submitting a quote request and checking the consent box, you agree that up to {site.maxQuotes} independent contractors may
        contact you at the number and email you provide, including by text message. Consent is not a condition of purchase.
        Message and data rates may apply. You can reply STOP to any text message to opt out of further texts from that sender,
        or contact us to withdraw consent.
      </p>

      <h2>Data retention &amp; security</h2>
      <p>
        We keep request information only as long as reasonably needed to provide our service, resolve disputes, and meet legal
        requirements. We use reasonable administrative and technical safeguards, but no method of transmission or storage is
        100% secure.
      </p>

      <h2>Your choices</h2>
      <p>
        You may ask us to access, correct, or delete the personal information we hold about you by emailing{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>. We will respond within a reasonable time.
      </p>

      <h2>Children</h2>
      <p>Our service is intended for adults 18 and older. We do not knowingly collect information from children.</p>

      <h2>Changes to this policy</h2>
      <p>We may update this policy from time to time. The &ldquo;Last updated&rdquo; date above shows when it was last revised.</p>

      <h2>Contact</h2>
      <p>Questions? Email <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
    </LegalPage>
  );
}
