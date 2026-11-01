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
    answer: "No, Lockout is Android-only. Apple's iOS restrictions do not allow third-party apps to detect running apps or overlay block screens.",
  },
  {
    question: "Why does Lockout need system permissions?",
    answer: "Lockout needs Usage Access to know when you open a blocked app, and Display Over Apps to draw the block screen over it. Everything happens locally on your device.",
    link: {
      text: "Read our full permissions breakdown",
      href: "/transparency",
    },
  },
  {
    question: "Where is my Focus Session data stored?",
    answer: "Everything—including your session history, blocklists, and streak stats—is stored locally on your phone. There are no user accounts, no passwords, and no cloud servers.",
    link: {
      text: "Read our Privacy Policy",
      href: "/privacy",
    },
  },
  {
    question: "Does Lockout track what websites or apps I use?",
    answer: "No. Lockout only checks the name of the app you are currently using against your blocklist. It does not track your web browsing history or monitor what you do inside apps.",
  },
  {
    question: "Can I uninstall Lockout to bypass an active block?",
    answer: "Yes. Lockout creates enough pause to break impulsive scrolling, but it is not a permanent device lock. You stay in full control and can uninstall the app anytime.",
  },
  {
    question: "Is Lockout open source?",
    answer: "Yes. Lockout is 100% open source under the GNU GPL-3.0 license. You can inspect every line of code, verify security, or compile it yourself on GitHub.",
    link: {
      text: "Inspect source code on GitHub",
      href: siteConfig.links.github,
      isExternal: true,
    },
  },
  {
    question: "How do I install and update the app?",
    answer: "You can download the APK directly from our Download Hub or GitHub Releases. For automatic background updates on Android without Google Play, you can also install and track Lockout using Obtainium.",
    link: {
      text: "Go to Download Hub",
      href: "/download",
    },
  },
];
