export const siteConfig = {
  name: "Lockout",
  description: "A free and open-source Android app that blocks distracting apps while you focus. It works offline, tracks your focus time, and keeps your data strictly private on your device.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://lockout.app",
  links: {
    github: "https://github.com/shubGupta10/focus-app",
    obtainium: "https://apps.obtainium.imranr.dev/redirect?r=obtainium://add/https://github.com/shubGupta10/focus-app",
  },
  release: {
    version: "1.4.2",
    date: "October 2026",
    requires: "Android 10+ (API level 29+)",
    apkUrl: "https://github.com/shubGupta10/focus-app/releases/latest/download/Lockout-v1.4.2.apk",
    githubReleaseUrl: "https://github.com/shubGupta10/focus-app/releases/latest",
  }
};

export const navLinks = [
  { name: "Home", href: "/" },
  { name: "Download", href: "/download" },
  { name: "Transparency", href: "/transparency" },
  { name: "Privacy", href: "/privacy" },
];
