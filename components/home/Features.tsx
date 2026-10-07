"use client";

import Image from "next/image";
import { Highlight } from "@/components/ui/Highlight";
import { DeviceMockup } from "@/components/ui/DeviceMockup";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function Features() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  const imageFolder = isDark ? "heroDarkImages" : "heroWhiteImages";
  const timerImageSuffix = isDark ? "black" : "white";
  const routinesImageSuffix = isDark ? "black" : "white";
  const shopImageName = isDark ? "ScreenShot_shop_black.png" : "Screenshot_shop_white.png";

  return (
    <section className="w-full bg-background border-b border-border py-24 sm:py-28 md:py-32 overflow-hidden relative">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-[28px] sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.2] md:leading-[1.15] text-balance">
            One place to stay <Highlight>focused</Highlight>
          </h2>
          <p className="text-[16px] sm:text-lg text-muted-foreground max-w-xl mx-auto mt-4 sm:mt-5 leading-relaxed text-balance">
            Native system-level blocking, strict focus sessions, and automated routines.
          </p>
        </div>

        {/* Unified Bento Grid */}
        <div className="rounded-[24px] md:rounded-[32px] bg-border border border-border overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-px">

            {/* Compartment 1: Native App Blocking (7 Columns) */}
            <div className="lg:col-span-7 bg-muted pt-8 px-6 sm:pt-12 sm:px-12 lg:pt-14 lg:px-14 flex flex-col justify-between relative group overflow-hidden transition-colors duration-300 hover:bg-card">

              {/* Content Tier */}
              <div className="max-w-xl z-10">
                <h3 className="text-[22px] sm:text-[28px] font-semibold text-foreground tracking-tight leading-snug">
                  Native app blocking
                </h3>
                <p className="text-[16px] sm:text-lg text-muted-foreground leading-relaxed mt-3 sm:mt-4">
                  Using Android's native system APIs, Lockout intercepts distracting apps the millisecond you open them. Evaluated 100% locally on your device with zero workarounds.
                </p>
              </div>

              {/* Centered Device Showcase */}
              <div className="w-full flex justify-center mt-10 sm:mt-12 lg:mt-16 -mb-px overflow-hidden">
                <DeviceMockup
                  src={`/assets/ScreenShot_blocker.jpg`}
                  alt="Lockout App Blocker Interception Screen"
                  className="w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[300px] h-[360px] sm:h-[420px] lg:h-[480px]"
                  imageClassName="object-cover object-bottom"
                  priority
                />
              </div>

            </div>

            {/* Compartment 2: Focus Sessions & Strict Mode (5 Columns) */}
            <div className="lg:col-span-5 bg-muted pt-8 px-6 sm:pt-12 sm:px-12 lg:pt-14 lg:px-14 flex flex-col justify-between relative group overflow-hidden transition-colors duration-300 hover:bg-card">

              {/* Content Tier */}
              <div className="max-w-xl z-10">
                <h3 className="text-[22px] sm:text-[28px] font-semibold text-foreground tracking-tight leading-snug">
                  Focus Sessions
                </h3>
                <p className="text-[16px] sm:text-lg text-muted-foreground leading-relaxed mt-3 sm:mt-4">
                  Start a Focus Session with the interactive orb. Strict mode prevents cancelling the session when the urge to check your phone strikes.
                </p>
              </div>

              {/* Centered Device Showcase */}
              <div className="w-full flex justify-center mt-10 sm:mt-12 lg:mt-16 -mb-px overflow-hidden">
                <DeviceMockup
                  src={`/assets/${imageFolder}/Screenshot_timer_running_${timerImageSuffix}.png`}
                  alt="Lockout Deep Focus Countdown Timer"
                  className="w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[300px] h-[360px] sm:h-[420px] lg:h-[480px]"
                />
              </div>

            </div>

            {/* Compartment 3: Gamification (5 Columns) */}
            <div className="lg:col-span-5 bg-muted pt-8 px-6 sm:pt-12 sm:px-12 lg:pt-14 lg:px-14 flex flex-col justify-between relative group overflow-hidden transition-colors duration-300">
              {/* Content Tier */}
              <div className="max-w-xl z-10">
                <h3 className="text-[22px] sm:text-[28px] font-semibold text-foreground tracking-tight leading-snug">
                  Earn Coins
                </h3>
                <p className="text-[16px] sm:text-lg text-muted-foreground leading-relaxed mt-3 sm:mt-4">
                  Turn your productivity into currency. Earn coins for every focused minute and spend them in the Coin Shop to unlock exclusive rewards.
                </p>
              </div>

              {/* Centered Device Showcase */}
              <div className="w-full flex justify-center mt-10 sm:mt-12 lg:mt-16 -mb-px overflow-hidden">
                <DeviceMockup
                  src={`/assets/${imageFolder}/${shopImageName}`}
                  alt="Lockout Coin Shop"
                  className="w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[300px] h-[360px] sm:h-[420px] lg:h-[480px]"
                />
              </div>
            </div>

            {/* Compartment 4: Routines (7 Columns) */}
            <div className="lg:col-span-7 bg-muted pt-8 px-6 sm:pt-12 sm:px-12 lg:pt-14 lg:px-14 flex flex-col justify-between relative group overflow-hidden transition-colors duration-300">
              {/* Content Tier */}
              <div className="max-w-xl z-10">
                <h3 className="text-[22px] sm:text-[28px] font-semibold text-foreground tracking-tight leading-snug">
                  Routines
                </h3>
                <p className="text-[16px] sm:text-lg text-muted-foreground leading-relaxed mt-3 sm:mt-4">
                  Schedule recurring Routines for workday deep work, study blocks, or bedtime. Lockout automatically engages your blocklists on time, complete with ambient pre-session warnings.
                </p>
              </div>

              {/* Centered Device Showcase */}
              <div className="w-full flex justify-center mt-10 sm:mt-12 lg:mt-16 -mb-px overflow-hidden">
                <DeviceMockup
                  src={`/assets/${imageFolder}/Screenshot_routines_${routinesImageSuffix}.png`}
                  alt="Lockout Home & Routines Hub"
                  className="w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[300px] h-[360px] sm:h-[420px] lg:h-[480px]"
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
