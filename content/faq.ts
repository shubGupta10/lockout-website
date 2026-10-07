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
    answer: "No. Lockout uses native Android features like Usage Access and Display Over Apps to block apps. Apple does not allow these features on iOS.",
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
    answer: "All your data, like your session history and block lists, stays strictly on your device. We don't use accounts or cloud sync.",
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
    answer: "Yes. Lockout is designed to add enough friction to break your impulsive habits. It is not a permanent device lock, so you can always uninstall it if needed.",
  },
  {
    question: "Is Lockout open source?",
    answer: "Yes. The source code is fully public on GitHub. You can check how the app works or build it yourself from the source.",
    link: {
      text: "Inspect source code on GitHub",
      href: siteConfig.links.github,
      isExternal: true,
    },
  },
  {
    question: "How do I install and update the app?",
    answer: "You can download the APK from our download page or GitHub Releases. The page includes simple instructions to help you install it.",
    link: {
      text: "Go to Download Hub",
      href: "/download",
    },
  },
];
