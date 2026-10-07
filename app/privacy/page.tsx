import { siteConfig } from "@/lib/config";
import { Metadata } from "next";
import Link from "next/link";
import { Database, UserX, Ban, Activity, ShieldCheck, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Lockout",
  description: "Learn how Lockout handles your data. Offline-first, no user accounts, local SQLite storage, and anonymized crash reporting via Sentry.",
};

const keyPrinciples = [
  {
    icon: Database,
    title: "Offline-First Storage",
    description: "Core features require zero internet connectivity. Focus Session logs, Routines, and Global Block lists are stored entirely in a local SQLite database on your device.",
  },
  {
    icon: UserX,
    title: "No Accounts Required",
    description: "Lockout does not have user accounts, profile tracking, or cloud sync. You never submit an email address, password, or phone number.",
  },
  {
    icon: Ban,
    title: "Zero Ad or Analytics SDKs",
    description: "We do not embed third-party advertising SDKs or behavioral user tracking libraries (such as Google Analytics, Mixpanel, or Meta Pixel).",
  },
  {
    icon: Activity,
    title: "Technical Crash Reports Only",
    description: "To fix crashes, Lockout uses Sentry to collect strictly technical diagnostics (device model, Android OS version, and stack traces) when a crash occurs.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="w-full min-h-screen bg-background">
      <div className="w-full max-w-5xl mx-auto px-6 md:px-12 pt-28 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-24">

        {/* Centered Header matching Hero and Transparency */}
        <div className="flex flex-col items-center text-center pb-12 sm:pb-16 border-b border-border">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-semibold tracking-[-0.03em] text-foreground w-full max-w-4xl leading-[1.14] mb-4 md:mb-5 text-balance">
            Privacy Policy
          </h1>
          <p className="text-[15px] sm:text-[16px] md:text-[17px] font-normal text-muted-foreground max-w-[580px] leading-[1.65]">
            Lockout is designed to protect your focus without collecting your personal data. Below is a plain-English overview, followed by the complete policy.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3 text-[11px] font-mono text-muted-foreground uppercase tracking-wider font-medium">
            <span>Last Updated: October 2026</span>
            <span>·</span>
            <span className="text-accent font-semibold">Official Release</span>
          </div>
        </div>

        {/* Privacy at a Glance matching the exact 1px grid style */}
        <div className="mt-12 mb-16 md:mb-24">
          <div className="flex items-center justify-center md:justify-start gap-2.5 mb-8">
            <ShieldCheck className="w-5 h-5 text-accent" />
            <h2 className="text-2xl font-semibold text-foreground tracking-tight">
              Privacy at a glance
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border rounded-2xl overflow-hidden text-left">
            {keyPrinciples.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-card p-8 sm:p-10 flex flex-col gap-5">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-foreground shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Full Legal Policy - Clean Editorial Typography (No Box) */}
        <div className="max-w-4xl text-left">

          <div className="border-b border-border pb-6 mb-10">
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
              Complete Legal Policy
            </h2>
            <p className="text-[15px] text-muted-foreground mt-2">
              Governs all versions of the Lockout mobile application on Android.
            </p>
          </div>

          <div className="space-y-10 md:space-y-12">

            <section className="space-y-3">
              <h3 className="text-xl font-semibold text-foreground tracking-tight">
                1. Architecture & Core Principles
              </h3>
              <p className="text-[15px] text-muted-foreground leading-[1.75]">
                Lockout is an offline-first productivity and habit-building utility. We do not sync your personal data (including Focus Session history, Global Block lists, Routines, or unlocked rewards) to any remote servers. All core functionality operates strictly within the local environment of your Android device.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-semibold text-foreground tracking-tight">
                2. Data Stored Locally (SQLite)
              </h3>
              <p className="text-[15px] text-muted-foreground leading-[1.75]">
                The application utilizes an encrypted local SQLite database hosted exclusively within the app's sandboxed storage directory to manage:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[15px] text-muted-foreground pl-2 mt-2">
                <li>Focus Session logs (start time, duration, completion status)</li>
                <li>Global Block list (Android package identifiers you designate for blocking)</li>
                <li>Coin balance and unlocked cosmetic themes</li>
                <li>Scheduled recurring Routines</li>
              </ul>
              <p className="text-[15px] text-muted-foreground leading-[1.75] mt-4">
                This database never leaves your phone and is permanently deleted when you uninstall Lockout or clear the application data in Android Settings.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-semibold text-foreground tracking-tight">
                3. Technical Crash Diagnostics (Sentry)
              </h3>
              <p className="text-[15px] text-muted-foreground leading-[1.75]">
                To identify fatal exceptions and maintain reliability across thousands of Android OEM configurations, Lockout integrates Sentry for error tracking. Sentry collects strictly technical diagnostic metrics only when an application crash occurs:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[15px] text-muted-foreground pl-2 mt-2">
                <li>Device hardware model and manufacturer</li>
                <li>Android OS version and API level</li>
                <li>Stack trace indicating the exact source file and line where the exception occurred</li>
              </ul>
              <p className="text-[15px] text-muted-foreground leading-[1.75] mt-4">
                Sentry is explicitly configured to strip Personally Identifiable Information (PII). We never collect or transmit your IP address, device location, browsing data, or the names of your installed apps.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-semibold text-foreground tracking-tight">
                4. Android Permissions & Usage Evaluation
              </h3>
              <p className="text-[15px] text-muted-foreground leading-[1.75]">
                To physically intercept distracting applications, Lockout requests privileged Android capabilities, including <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs text-foreground">PACKAGE_USAGE_STATS</code> and <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs text-foreground">SYSTEM_ALERT_WINDOW</code>.
              </p>
              <p className="text-[15px] text-muted-foreground leading-[1.75]">
                <strong>We never transmit your application usage logs or list of installed apps externally.</strong> Usage access is evaluated in real-time memory strictly to determine if the active foreground package is on your Global Block list.
              </p>
              <div className="pt-2">
                <Link
                  href="/transparency"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:opacity-90 transition-opacity"
                >
                  <span>Review full permissions breakdown in our Transparency Report</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-semibold text-foreground tracking-tight">
                5. Third-Party Integrations
              </h3>
              <p className="text-[15px] text-muted-foreground leading-[1.75]">
                Sentry is our sole third-party SDK. Lockout contains zero advertising frameworks, tracking cookies, commercial data brokers, or behavioral analytics vendors.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-semibold text-foreground tracking-tight">
                6. Changes to this Policy
              </h3>
              <p className="text-[15px] text-muted-foreground leading-[1.75]">
                Any modifications to this privacy document will be published directly to this page with an updated timestamp. Because Lockout does not maintain user accounts or collect email addresses, we advise users to review this page periodically.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-semibold text-foreground tracking-tight">
                7. Verification & Open Source Audit
              </h3>
              <p className="text-[15px] text-muted-foreground leading-[1.75]">
                Lockout is fully open source under the MIT License. You can independently verify all network requests, database schemas, and permission usage by reviewing our source repository on GitHub.
              </p>
              <div className="pt-2">
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:opacity-90 transition-opacity"
                >
                  <span>Inspect source code on GitHub</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
}
