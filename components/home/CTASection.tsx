import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Highlight } from "@/components/ui/Highlight";

export default function CTASection() {
  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="w-full bg-muted py-24 md:py-32 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center">

          {/* Heading */}
          <h2
            id="cta-heading"
            className="text-4xl sm:text-5xl lg:text-[48px] font-semibold tracking-tight text-foreground leading-[1.15] text-balance"
          >
            Take back your <Highlight>attention</Highlight>
          </h2>

          {/* Supporting Copy */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mt-5 leading-relaxed text-balance">
            Download Lockout for Android and start your next Focus Session.
          </p>

          {/* Primary Action */}
          <div className="mt-8 sm:mt-10 w-full sm:w-auto">
            <Link
              href="/download"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 h-12 px-8 rounded-lg bg-primary text-primary-foreground text-[15px] font-medium shadow-xs hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <span>Download Lockout</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Discreet Trust & Compatibility Note */}
          <p className="text-xs sm:text-sm text-muted-foreground mt-5 select-none text-center">
            Free & open source · No account required
          </p>

        </div>
      </div>
    </section>
  );
}
