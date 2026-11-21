import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { disclaimer, site } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for using ${site.name}.`,
  alternates: { canonical: "/terms" },
};

export default function Terms() {
  const n = site.name;
  return (
    <LegalPage title="Terms of Service" updated={site.legalLastUpdated}>
      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the {n} website and services. By using the site or
        submitting a request, you agree to these Terms.
      </p>

      <h2>1. What we are (and aren&apos;t)</h2>
      <p>{disclaimer}</p>
      <p>
        {n} is not a contractor, does not employ the contractors in our network, and is not a party to any agreement between
        you and a contractor. Any quote, contract, payment, warranty, or dispute is solely between you and the contractor you
        choose.
      </p>

      <h2>2. The {site.maxQuotes}-Quote Guarantee</h2>
      <p>
        When you submit a request, we will share it with no more than {site.maxQuotes} independent contractors. We cannot guarantee
        that any contractor will be available, will respond within a specific time, or will provide a quote at a particular
        price.
      </p>

      <h2>3. Free for homeowners</h2>
      <p>
        Our service is free for homeowners. You are never obligated to hire any contractor we match you with. Contractors pay
        us a membership fee to participate in our network.
      </p>

      <h2>4. Contractor vetting</h2>
      <p>
        We take reasonable steps to review partner contractors, such as checking for locally required licensing or
        registration and general liability insurance at the time they join. However, credentials can change, and{" "}
        <strong>we do not guarantee, endorse, or warrant any contractor or their work</strong>. You are responsible for
        independently verifying a contractor&apos;s licensing, insurance, references, and suitability before hiring, and for
        reviewing any contract carefully.
      </p>

      <h2>5. Your responsibilities</h2>
      <ul>
        <li>Provide accurate information and submit requests only for property you own or are authorized to represent.</li>
        <li>Not use the site for spam, fraudulent requests, or any unlawful purpose.</li>
        <li>Not attempt to interfere with, scrape, or disrupt the site.</li>
      </ul>

      <h2>6. Communications consent</h2>
      <p>
        By submitting a request and checking the consent box, you agree to be contacted by up to {site.maxQuotes} independent
        contractors by phone, text message, or email about your project, as described in our{" "}
        <a href="/privacy">Privacy Policy</a>. Consent is not required to make a purchase.
      </p>

      <h2>7. Disclaimer of warranties</h2>
      <p>
        The site and services are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, express or
        implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement.
      </p>

      <h2>8. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {n} and its owners shall not be liable for any indirect, incidental,
        consequential, or punitive damages, or for any loss or damage arising from work performed (or not performed) by any
        contractor, or from your dealings with any contractor. Our total liability for any claim relating to the service shall
        not exceed $100.
      </p>

      <h2>9. Indemnification</h2>
      <p>
        You agree to indemnify and hold {n} harmless from claims arising out of your use of the site, your violation of these
        Terms, or your dealings with any contractor.
      </p>

      <h2>10. Governing law</h2>
      <p>
        These Terms are governed by the laws of the State of Missouri. Any dispute shall be resolved in the state or federal
        courts located in Greene County, Missouri.
      </p>

      <h2>11. Changes</h2>
      <p>We may update these Terms at any time. Continued use of the site after changes means you accept the updated Terms.</p>

      <h2>12. Contact</h2>
      <p>Questions? Email <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
    </LegalPage>
  );
}
