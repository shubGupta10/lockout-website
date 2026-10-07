"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import GithubReleaseVersion from "@/components/GithubReleaseVersion";
import { Highlight } from "@/components/ui/Highlight";
import { DeviceMockup } from "@/components/ui/DeviceMockup";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";


export default function Hero() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const progress = Math.min(Math.max(scrollY / 500, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initialize on mount
    setMounted(true);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentRatio = 1.3 + (scrollProgress * 0.86);
  const scaleValue = 0.85 + (scrollProgress * 0.15);

  const mobileScale = 0.95 + (scrollProgress * 0.20);
  const mobileTranslateY = 10 - (scrollProgress * 100);

  const desktopCenterY = scrollProgress * 40;
  const desktopSideY = scrollProgress * 40;
  const desktopLeftX = -(scrollProgress * 120);
  const desktopRightX = scrollProgress * 120;

  // Prevent hydration mismatch by defaulting to light mode images before mount
  const isDark = mounted && resolvedTheme === "dark";
  const imageFolder = isDark ? "heroDarkImages" : "heroWhiteImages";
  const appsImageSuffix = isDark ? "black" : "white";
  const initialImageSuffix = isDark ? "black" : "white";
  const timerImageSuffix = isDark ? "black" : "white";

  return (
    <section className="w-full pt-28 sm:pt-32 md:pt-40 pb-0 border-b border-border bg-background overflow-hidden relative flex flex-col items-center">

      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col items-center text-center relative z-20">

        <motion.h1 className="text-[36px] sm:text-5xl md:text-[52px] lg:text-[56px] xl:text-[60px] font-semibold tracking-tight text-foreground w-full mb-4 sm:mb-5 leading-[1.1] sm:leading-tight text-balance"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Reclaim your time. <Highlight>Lock</Highlight> yourself in
        </motion.h1>

        <motion.p className="text-lg md:text-[19px] font-normal text-muted-foreground max-w-[640px] mb-8 md:mb-10 leading-relaxed text-balance mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        >
          An offline-first, open-source focus app for Android. Block distracting apps, run structured Focus Sessions, and build better habits.
        </motion.p>

        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-4 sm:mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          <Link
            href="/download"
            className="w-full sm:w-auto h-12 px-8 rounded-lg bg-primary text-primary-foreground text-[15px] font-medium flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Download Lockout  <GithubReleaseVersion />
          </Link>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto h-12 px-8 rounded-lg bg-background text-foreground text-[15px] font-medium flex items-center justify-center border border-border hover:bg-secondary transition-colors gap-2.5 shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <FontAwesomeIcon icon={faGithub} className="w-4 h-4 text-muted-foreground" />
            View on GitHub
          </a>
        </motion.div>
      </div>

      <div className="relative w-full flex justify-center items-end pb-0 mt-4 md:mt-8">

        <div className="absolute top-[40%] md:top-[45%] -translate-y-1/2 w-[120%] max-w-[1100px] h-[180px] md:h-[260px] lg:h-[320px] bg-primary/10 rounded-full sm:rounded-[5rem] -z-10" />

        <div className="hidden sm:flex relative justify-center items-end w-full max-w-6xl mx-auto -mb-12 md:-mb-16 lg:-mb-24">

          <motion.div
            className="absolute sm:relative left-1/2 sm:left-auto bottom-0 -translate-x-[115%] sm:translate-x-3 lg:translate-x-4 z-10"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          >
            <div
              className="origin-bottom transition-transform duration-75 ease-out"
              style={{ transform: `translate(${desktopLeftX}px, ${desktopSideY}px)` }}
            >
              <DeviceMockup
                src={`/assets/${imageFolder}/Screenshot_apps_${appsImageSuffix}.png`}
                alt="Lockout Global Block list"
                className="w-[160px] h-[320px] sm:w-[280px] sm:h-[560px] lg:w-[320px] lg:h-[640px]"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            className="relative z-30"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.35 }}
          >
            <div
              className="origin-bottom transition-transform duration-75 ease-out"
              style={{ transform: `translateY(${desktopCenterY}px)` }}
            >
              <DeviceMockup
                src={`/assets/${imageFolder}/Screenshot_initial_${initialImageSuffix}.png`}
                alt="Lockout New Focus Session"
                className="w-[200px] h-[400px] sm:w-[320px] sm:h-[640px] lg:w-[380px] lg:h-[760px]"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            className="absolute sm:relative right-1/2 sm:right-auto bottom-0 translate-x-[115%] sm:-translate-x-3 lg:-translate-x-4 z-10"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          >
            <div
              className="origin-bottom transition-transform duration-75 ease-out"
              style={{ transform: `translate(${desktopRightX}px, ${desktopSideY}px)` }}
            >
              <DeviceMockup
                src={`/assets/${imageFolder}/Screenshot_timer_running_${timerImageSuffix}.png`}
                alt="Lockout Active Focus Session"
                className="w-[160px] h-[320px] sm:w-[280px] sm:h-[560px] lg:w-[320px] lg:h-[640px]"
                priority
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="sm:hidden w-full px-4 flex justify-center pb-12 relative z-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <div
            className="relative w-full max-w-[320px] origin-top transition-transform duration-75 ease-out"
            style={{ transform: `translateY(${mobileTranslateY}px) scale(${mobileScale})` }}
          >
            <DeviceMockup
              src={`/assets/${imageFolder}/Screenshot_initial_${initialImageSuffix}.png`}
              alt="Lockout App UI"
              className="w-full aspect-[1/2.16]"
              showBottomEdge={true}
              priority
            />
          </div>
        </motion.div>

      </div>

      {/* Bottom Gradient Fade for Desktop */}
      <div className="hidden sm:block absolute bottom-0 inset-x-0 h-32 md:h-48 bg-gradient-to-t from-background to-transparent z-40 pointer-events-none" />
    </section>
  );
}
