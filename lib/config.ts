export const siteConfig = {
  name: "Lockout",
  description: "An offline-first, open-source focus app for Android. Block distractions natively and build lasting habits.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  links: {
    github: "https://github.com/shubGupta10/focus-app",
  },
  release: {
    version: "1.1.2",
    date: "October 2026",
    requires: "Android (See release notes for exact version)",
    apkUrl: "https://github.com/shubGupta10/focus-app/releases/latest/download/lockout.apk",
    githubReleaseUrl: "https://github.com/shubGupta10/focus-app/releases/latest",
  }
};

export const navLinks = [
  { name: "Home", href: "/" },
  { name: "Download", href: "/download" },
  { name: "Transparency", href: "/transparency" },
  { name: "Privacy", href: "/privacy" },
];
