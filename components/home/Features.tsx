"use client";

import { Highlight } from "@/components/ui/Highlight";
import { DeviceMockup } from "@/components/ui/DeviceMockup";
import { DeviceLightbox } from "@/components/ui/DeviceLightbox";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Features() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  const imageFolder = isDark ? "heroDarkImages" : "heroWhiteImages";
  const imageSuffix = isDark ? "black" : "white";

  return (
    <section className="w-full bg-background border-b border-border py-24 sm:py-28 md:py-32 overflow-hidden relative">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-[28px] sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.2] md:leading-[1.15] text-balance">
            Built to break <Highlight>distraction habits</Highlight>
          </h2>
          <p className="text-[16px] sm:text-lg text-muted-foreground max-w-xl mx-auto mt-4 sm:mt-5 leading-relaxed text-balance">
            Hard-to-bypass blocking, focus timers, and automated schedules.
          </p>
        </div>

        {/* Unified Bento Grid */}
        <div className="rounded-[24px] md:rounded-[32px] bg-border border border-border overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-px">

            {/* Card 1: Instant app blocking */}
            <div className="lg:col-span-7 bg-muted pt-8 px-6 sm:pt-12 sm:px-12 lg:pt-14 lg:px-14 flex flex-col justify-between relative group overflow-hidden transition-colors duration-300 hover:bg-card">
              <motion.div
                className="flex flex-col justify-between h-full"
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="max-w-xl z-10">
                  <h3 className="text-[22px] sm:text-[28px] font-semibold text-foreground tracking-tight leading-snug">
                    Instant app blocking
                  </h3>
                  <p className="text-[16px] sm:text-lg text-muted-foreground leading-relaxed mt-3 sm:mt-4">
                    Lockout blocks distracting apps the moment you tap them. Everything runs directly on your phone, so it works reliably even without an internet connection.
                  </p>
                </div>
                <div className="w-full flex justify-center mt-10 sm:mt-12 lg:mt-16 -mb-px overflow-hidden">
                  <div className="w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[300px] h-[400px] sm:h-[460px] lg:h-[500px]">
                    <DeviceLightbox
                      src="/assets/ScreenShot_blocker.jpg"
                      alt="Lockout App Blocker Interception Screen"
                    >
                      <DeviceMockup
                        src="/assets/ScreenShot_blocker.jpg"
                        alt="Lockout App Blocker Interception Screen"
                        className="w-full h-full"
                        imageClassName="object-cover object-bottom"
                      />
                    </DeviceLightbox>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Card 2: Focus Sessions */}
            <div className="lg:col-span-5 bg-muted pt-8 px-6 sm:pt-12 sm:px-12 lg:pt-14 lg:px-14 flex flex-col justify-between relative group overflow-hidden transition-colors duration-300 hover:bg-card">
              <motion.div
                className="flex flex-col justify-between h-full"
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
              >
                <div className="max-w-xl z-10">
                  <h3 className="text-[22px] sm:text-[28px] font-semibold text-foreground tracking-tight leading-snug">
                    Focus Sessions
                  </h3>
                  <p className="text-[16px] sm:text-lg text-muted-foreground leading-relaxed mt-3 sm:mt-4">
                    Pick your focus duration and start. Strict mode prevents you from quitting early when you get the temptation to scroll.
                  </p>
                </div>
                <div className="w-full flex justify-center mt-10 sm:mt-12 lg:mt-16 -mb-px overflow-hidden">
                  <div className="w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[300px] h-[400px] sm:h-[460px] lg:h-[500px]">
                    <DeviceLightbox
                      src={`/assets/${imageFolder}/Screenshot_timer_running_${imageSuffix}.png`}
                      alt="Lockout Deep Focus Countdown Timer"
                    >
                      <DeviceMockup
                        src={`/assets/${imageFolder}/Screenshot_timer_running_${imageSuffix}.png`}
                        alt="Lockout Deep Focus Countdown Timer"
                        className="w-full h-full"
                      />
                    </DeviceLightbox>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Card 3: Focus Rewards */}
            <div className="lg:col-span-5 bg-muted pt-8 px-6 sm:pt-12 sm:px-12 lg:pt-14 lg:px-14 flex flex-col justify-between relative group overflow-hidden transition-colors duration-300 hover:bg-card">
              <motion.div
                className="flex flex-col justify-between h-full"
                initial={{ opacity: 0, x: -40, y: 40 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="max-w-xl z-10">
                  <h3 className="text-[22px] sm:text-[28px] font-semibold text-foreground tracking-tight leading-snug">
                    Focus Rewards
                  </h3>
                  <p className="text-[16px] sm:text-lg text-muted-foreground leading-relaxed mt-3 sm:mt-4">
                    Earn coins for every minute you stay focused. Spend them to unlock new visual themes and timer styles.
                  </p>
                </div>
                <div className="w-full flex justify-center mt-10 sm:mt-12 lg:mt-16 -mb-px overflow-hidden">
                  <div className="w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[300px] h-[400px] sm:h-[460px] lg:h-[500px]">
                    <DeviceLightbox
                      src={`/assets/${imageFolder}/Screenshot_shop_${imageSuffix}.png`}
                      alt="Lockout Coin Shop"
                    >
                      <DeviceMockup
                        src={`/assets/${imageFolder}/Screenshot_shop_${imageSuffix}.png`}
                        alt="Lockout Coin Shop"
                        className="w-full h-full"
                      />
                    </DeviceLightbox>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Card 4: Routines */}
            <div className="lg:col-span-7 bg-muted pt-8 px-6 sm:pt-12 sm:px-12 lg:pt-14 lg:px-14 flex flex-col justify-between relative group overflow-hidden transition-colors duration-300 hover:bg-card">
              <motion.div
                className="flex flex-col justify-between h-full"
                initial={{ opacity: 0, x: 40, y: 40 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
              >
                <div className="max-w-xl z-10">
                  <h3 className="text-[22px] sm:text-[28px] font-semibold text-foreground tracking-tight leading-snug">
                    Routines
                  </h3>
                  <p className="text-[16px] sm:text-lg text-muted-foreground leading-relaxed mt-3 sm:mt-4">
                    Set recurring schedules for work, study, or sleep. Lockout turns on your blocklist automatically and gives you a heads-up before sessions begin.
                  </p>
                </div>
                <div className="w-full flex justify-center mt-10 sm:mt-12 lg:mt-16 -mb-px overflow-hidden">
                  <div className="w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[300px] h-[400px] sm:h-[460px] lg:h-[500px]">
                    <DeviceLightbox
                      src={`/assets/${imageFolder}/Screenshot_routines_${imageSuffix}.png`}
                      alt="Lockout Home & Routines Hub"
                    >
                      <DeviceMockup
                        src={`/assets/${imageFolder}/Screenshot_routines_${imageSuffix}.png`}
                        alt="Lockout Home & Routines Hub"
                        className="w-full h-full"
                      />
                    </DeviceLightbox>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Card 5: Progress & Streaks */}
            <div className="lg:col-span-7 bg-muted pt-8 px-6 sm:pt-12 sm:px-12 lg:pt-14 lg:px-14 flex flex-col justify-between relative group overflow-hidden transition-colors duration-300 hover:bg-card">
              <motion.div
                className="flex flex-col justify-between h-full"
                initial={{ opacity: 0, x: -40, y: 40 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="max-w-xl z-10">
                  <h3 className="text-[22px] sm:text-[28px] font-semibold text-foreground tracking-tight leading-snug">
                    Progress & Streaks
                  </h3>
                  <p className="text-[16px] sm:text-lg text-muted-foreground leading-relaxed mt-3 sm:mt-4">
                    Check your daily focus time, weekly trends, and keep your streaks alive. All statistics stay private on your device.
                  </p>
                </div>
                <div className="w-full flex justify-center mt-10 sm:mt-12 lg:mt-16 -mb-px overflow-hidden">
                  <div className="w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[300px] h-[400px] sm:h-[460px] lg:h-[500px]">
                    <DeviceLightbox
                      src={`/assets/${imageFolder}/Screenshot_progress_${imageSuffix}.png`}
                      alt="Lockout Focus Progress & Streaks"
                    >
                      <DeviceMockup
                        src={`/assets/${imageFolder}/Screenshot_progress_${imageSuffix}.png`}
                        alt="Lockout Focus Progress & Streaks"
                        className="w-full h-full"
                      />
                    </DeviceLightbox>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Card 6: Custom Blocklists */}
            <div className="lg:col-span-5 bg-muted pt-8 px-6 sm:pt-12 sm:px-12 lg:pt-14 lg:px-14 flex flex-col justify-between relative group overflow-hidden transition-colors duration-300 hover:bg-card">
              <motion.div
                className="flex flex-col justify-between h-full"
                initial={{ opacity: 0, x: 40, y: 40 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
              >
                <div className="max-w-xl z-10">
                  <h3 className="text-[22px] sm:text-[28px] font-semibold text-foreground tracking-tight leading-snug">
                    Custom Blocklists
                  </h3>
                  <p className="text-[16px] sm:text-lg text-muted-foreground leading-relaxed mt-3 sm:mt-4">
                    Search and choose exactly which apps to restrict. Toggle them on or off anytime with simple, granular controls.
                  </p>
                </div>
                <div className="w-full flex justify-center mt-10 sm:mt-12 lg:mt-16 -mb-px overflow-hidden">
                  <div className="w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[300px] h-[400px] sm:h-[460px] lg:h-[500px]">
                    <DeviceLightbox
                      src={`/assets/${imageFolder}/Screenshot_apps_${imageSuffix}.png`}
                      alt="Lockout App Blocklist Selection"
                    >
                      <DeviceMockup
                        src={`/assets/${imageFolder}/Screenshot_apps_${imageSuffix}.png`}
                        alt="Lockout App Blocklist Selection"
                        className="w-full h-full"
                      />
                    </DeviceLightbox>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}