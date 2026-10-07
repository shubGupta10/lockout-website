import { ShieldCheck, WifiOff, Code2, Smartphone } from "lucide-react";

export default function TrustStrip() {
  const trusts = [
    { icon: WifiOff, text: "Offline-First" },
    { icon: Code2, text: "Open Source" },
    { icon: ShieldCheck, text: "No Accounts Required" },
    { icon: Smartphone, text: "Android Only" },
  ];

  return (
    <section className="w-full bg-background border-y border-border py-8 md:py-10">
      <div className="w-full max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:flex md:flex-row items-center justify-items-center md:justify-center gap-x-2 gap-y-6 md:gap-x-14">
          {trusts.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-muted-foreground hover:text-foreground transition-colors text-center sm:text-left w-full justify-center"
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="text-[12px] md:text-[15px] font-medium tracking-wide uppercase text-balance sm:whitespace-nowrap">
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
