import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import Features from "@/components/home/Features";
import PrivacyTeaser from "@/components/home/PrivacyTeaser";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";
import { siteConfig } from "@/lib/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Hero />
      <TrustStrip />
      <Features />
      <PrivacyTeaser />
      <FAQSection />
      <CTASection />
    </>
  );
}
