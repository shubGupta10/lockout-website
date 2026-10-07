import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import Features from "@/components/home/Features";
import PrivacyTeaser from "@/components/home/PrivacyTeaser";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Features />
      <PrivacyTeaser />
      <FAQSection />
      <CTASection />
    </>
  );
}
