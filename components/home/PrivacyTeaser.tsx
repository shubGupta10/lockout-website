import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { Highlight } from "@/components/ui/Highlight";

export default function PrivacyTeaser() {
  return (
    <section
      id="transparency"
      aria-labelledby="transparency-heading"
      className="w-full bg-muted border-b border-border py-24 md:py-32 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* LEFT COLUMN: Editorial Content & CTA */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <h2
              id="transparency-heading"
              className="text-3xl sm:text-4xl lg:text-[40px] font-semibold tracking-tight text-foreground leading-[1.15] text-balance"
            >
              Know what <Highlight>Lockout</Highlight> accesses
            </h2>
            <p className="text-lg text-muted-foreground mt-5 leading-relaxed max-w-xl text-balance">
              Full transparency on how Lockout operates 100% locally, and exactly why it requires permissions like Usage Access and Display Over Apps.
            </p>
            <div className="mt-10 w-full sm:w-auto">
              <Link
                href="/transparency"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg bg-primary text-primary-foreground text-[15px] font-medium shadow-sm hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <span>Explore transparency</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Editorial Trust Quote */}
          <div className="lg:col-span-6 w-full lg:pl-8">
            <div className="flex flex-col gap-6 pl-6 sm:pl-8 border-l-2 border-border">
              <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground shadow-sm shrink-0">
                <FileText className="w-4 h-4" />
              </div>

              <blockquote className="text-xl sm:text-2xl font-medium text-foreground leading-[1.4] tracking-tight">
                “Software that helps you focus should never compromise your trust. Every system capability is documented and open for inspection.”
              </blockquote>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
