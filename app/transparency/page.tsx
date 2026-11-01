import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Permissions & Transparency | Lockout",
  description: "A plain-English explanation of why Lockout requires deep Android system access and exactly what it is used for.",
  alternates: {
    canonical: "/transparency",
  },
};

const permissions = [
  {
    name: "Usage Access",
    systemName: "PACKAGE_USAGE_STATS",
    why: "To detect when you open a blocked app.",
    usage: "Lockout checks the name of the app currently on your screen. If it's on your blocklist during an active session, the block screen appears.",
    notUsedFor: "We never record or upload your app usage history anywhere. We only check if the active app is on your blocklist.",
    privacy: "Evaluated locally · Never saved",
  },
  {
    name: "Display Over Apps",
    systemName: "SYSTEM_ALERT_WINDOW",
    why: "To show the full-screen block screen.",
    usage: "When you open a blocked app, Lockout displays the shield screen on top of it so you can return to focusing.",
    notUsedFor: "We never display ads, and we never show hidden overlays to intercept your touches.",
    privacy: "Local UI rendering only",
  },
  {
    name: "Foreground Service & Special Use",
    systemName: "FOREGROUND_SERVICE",
    why: "To keep blocking active while your timer runs.",
    usage: "Android closes background apps to free up memory. This service ensures your focus session isn't stopped in the middle of your work.",
    notUsedFor: "This service only runs during an active session or routine—never when you aren't using Lockout.",
    privacy: "Tied to a visible notification",
  },
  {
    name: "Exact Alarms & Boot Completed",
    systemName: "SCHEDULE_EXACT_ALARM / RECEIVE_BOOT_COMPLETED",
    why: "To start your scheduled routines on time.",
    usage: "Starts your focus routines at the exact time you scheduled, even if your phone was restarted.",
    notUsedFor: "We never run background tasks or wake your device outside of the schedules you create.",
    privacy: "Local scheduling",
  },
  {
    name: "Notifications",
    systemName: "POST_NOTIFICATIONS",
    why: "To give you a reminder before a session starts.",
    usage: "Sends a notification a few minutes before a scheduled routine begins, giving you time to wrap up what you're doing.",
    notUsedFor: "We never send promotional alerts, marketing push notifications, or spam.",
    privacy: "Local alerts only",
  },
  {
    name: "Query All Packages",
    systemName: "QUERY_ALL_PACKAGES",
    why: "To let you choose which apps to block.",
    usage: "Shows you a list of apps installed on your phone so you can add them to your blocklist.",
    notUsedFor: "Your list of installed apps stays strictly on your device. We never upload or share it.",
    privacy: "Rendered locally in Settings",
  },
  {
    name: "Ignore Battery Optimizations",
    systemName: "REQUEST_IGNORE_BATTERY_OPTIMIZATIONS",
    why: "To stop your phone from pausing Lockout.",
    usage: "Certain phone brands (like Samsung, Xiaomi, and OnePlus) aggressively close apps in the background. This setting keeps your blocker running until your timer ends.",
    notUsedFor: "Lockout is lightweight and won't drain your battery in the background.",
    privacy: "System power setting",
  },
];

export default function TransparencyPage() {
  return (
    <div className="w-full min-h-screen bg-background">
      {/* Matches the Hero top padding exactly */}
      <div className="w-full max-w-5xl mx-auto px-6 md:px-12 pt-28 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-24">

        {/* Centered like the Hero section */}
        <div className="flex flex-col items-center text-center pb-12 sm:pb-16 border-b border-border">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-semibold tracking-[-0.03em] text-foreground w-full max-w-4xl leading-[1.14] mb-4 md:mb-5 text-balance">
            Permissions & Transparency
          </h1>
          <p className="text-[15px] sm:text-[16px] md:text-[17px] font-normal text-muted-foreground max-w-[580px] leading-[1.65]">
            To block apps and run automated schedules, Lockout needs a few Android system permissions. Here is a clear breakdown of what we use, why we need it, and what we never do.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-10 md:gap-12 text-left">
          {permissions.map((perm, index) => (
            <div key={perm.systemName} className="bg-card p-8 sm:p-10 border border-border rounded-2xl flex flex-col md:flex-row gap-8 md:gap-12">

              <div className="md:w-1/3 shrink-0">
                <h2 className="text-xl font-semibold text-foreground">{index + 1}. {perm.name}</h2>
                <code className="text-[11px] text-muted-foreground font-mono mt-2 block break-all">{perm.systemName}</code>
              </div>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Why we need it</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{perm.why}</p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">What we use it for</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{perm.usage}</p>
                </div>
                <div className="sm:col-span-2">
                  <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">What we DO NOT use it for</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{perm.notUsedFor}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
