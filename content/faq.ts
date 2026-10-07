import { siteConfig } from "@/lib/config";

export interface FAQItem {
  question: string;
  answer: string;
  link?: {
    text: string;
    href: string;
    isExternal?: boolean;
  };
}

export const homeFaqs: FAQItem[] = [
  {
    question: "Does Lockout work on iOS?",
    answer: "No. Lockout relies on native Android system APIs—specifically Usage Access and Display Over Apps—to enforce blocks at the operating system level. These capabilities are not permitted on iOS.",
  },
  {
    question: "Why does Lockout need system permissions?",
    answer: "Lockout requires Usage Access to detect when you launch a blocked app, and Display Over Apps to draw the blocking overlay over it. All evaluation is performed locally in device memory.",
    link: {
      text: "Read our full permissions breakdown",
      href: "/transparency",
    },
  },
  {
    question: "Where is my Focus Session data stored?",
    answer: "All your data—including Focus Session history, custom Routines, and Global Block lists—is stored locally in an SQLite database on your device. We do not use accounts or cloud sync.",
    link: {
      text: "Read our Privacy Policy",
      href: "/privacy",
    },
  },
  {
    question: "Does Lockout track what websites or apps I use?",
    answer: "No. Lockout only checks the package name of active applications against your blocklist. We do not inspect URLs, track your web browsing history, or monitor what you do inside other apps.",
  },
  {
    question: "Can I uninstall Lockout to bypass an active block?",
    answer: "Yes. Lockout is designed as an intentional discipline tool that introduces high friction to disrupt impulsive habits, rather than an irreversible device lock.",
  },
  {
    question: "Is Lockout open source?",
    answer: "Yes. The complete source code is public and auditable on GitHub. You can inspect how our blocking engine works or compile the APK directly from source.",
    link: {
      text: "Inspect source code on GitHub",
      href: siteConfig.links.github,
      isExternal: true,
    },
  },
  {
    question: "How do I install and update the app?",
    answer: "You can download the APK directly from our download page or GitHub Releases. We provide straightforward sideloading instructions to guide you through installation.",
    link: {
      text: "Go to Download Hub",
      href: "/download",
    },
  },
];
