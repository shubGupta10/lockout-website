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
    why: "To detect when you open a distracting app.",
    usage: "Lockout evaluates the current foreground app locally in memory. If it matches your Global Block list during an active Focus Session, the block screen is triggered.",
    notUsedFor: "We do not transmit your usage history. We do not evaluate usage outside of checking your Global Block list.",
    privacy: "Evaluated locally · Never saved",
  },
  {
    name: "Display Over Apps",
    systemName: "SYSTEM_ALERT_WINDOW",
    why: "To draw the full-screen block UI.",
    usage: "When a distracting app is detected, Lockout uses this permission to instantly overlay the 'Get back to work' screen.",
    notUsedFor: "We do not draw invisible overlays to hijack taps, nor do we display advertisements.",
    privacy: "Local UI rendering only",
  },
  {
    name: "Foreground Service & Special Use",
    systemName: "FOREGROUND_SERVICE",
    why: "To keep the blocker running reliably in the background.",
    usage: "Android aggressively kills background apps. This service ensures Lockout stays alive while your Focus Session is active.",
    notUsedFor: "We do not run this service when you don't have an active Focus Session or a scheduled Routine pending.",
    privacy: "Tied to a visible notification",
  },
  {
    name: "Exact Alarms & Boot Completed",
    systemName: "SCHEDULE_EXACT_ALARM / RECEIVE_BOOT_COMPLETED",
    why: "To trigger your scheduled Routines on time.",
    usage: "Ensures that your 'Workday Focus' or 'Sleep Mode' Routines activate precisely when they should, even if your phone restarts.",
    notUsedFor: "We do not wake your device for any reason other than your explicit schedules.",
    privacy: "Local scheduling",
  },
  {
    name: "Notifications",
    systemName: "POST_NOTIFICATIONS",
    why: "To provide ambient pre-session warnings.",
    usage: "Alerts you 5-10 minutes before a scheduled Routine begins, giving you time to finish your current task.",
    notUsedFor: "We do not send marketing notifications.",
    privacy: "Local alerts only",
  },
  {
    name: "Query All Packages",
    systemName: "QUERY_ALL_PACKAGES",
    why: "To allow you to select which apps to block.",
    usage: "Lockout reads the list of apps installed on your phone so you can build your Global Block list.",
    notUsedFor: "We do not transmit your installed app list.",
    privacy: "Rendered locally in Settings",
  },
  {
    name: "Ignore Battery Optimizations",
    systemName: "REQUEST_IGNORE_BATTERY_OPTIMIZATIONS",
    why: "To prevent Android from killing your active Focus Session.",
    usage: "Required on some OEM devices (like Samsung/Xiaomi) that force-close background apps.",
    notUsedFor: "We do not run excessive background tasks that drain battery.",
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
            To physically block apps and schedule Routines, Lockout requires deep Android system access. Here is exactly what we use, why we need it, and what we don't do.
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
