import { ShieldCheck, WifiOff, Code2, Smartphone } from "lucide-react";

const trusts = [
  { icon: WifiOff, text: "Offline-First" },
  { icon: Code2, text: "Open Source" },
  { icon: ShieldCheck, text: "No Accounts Required" },
  { icon: Smartphone, text: "Native Android" },
];

export default function TrustStrip() {
  return (
    <section className="w-full bg-secondary/20 border-b border-border py-8 md:py-10">
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:flex md:flex-row items-center justify-items-center md:justify-center gap-x-4 gap-y-6 md:gap-x-12 lg:gap-x-16">
          {trusts.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.text}
                className="inline-flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 text-foreground/85 text-center sm:text-left w-full md:w-auto"
              >
                <Icon className="w-5 h-5 md:w-[22px] md:h-[22px] text-primary shrink-0" />
                <span className="text-sm sm:text-base md:text-[17px] font-medium tracking-tight text-balance sm:whitespace-nowrap">
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