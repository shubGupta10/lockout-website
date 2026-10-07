"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/config";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

const desktopNav = [
  { name: "Download", href: "/download" },
  { name: "Transparency", href: "/transparency" },
  { name: "Privacy", href: "/privacy" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide if scrolling down and past 100px. Show if scrolling up.
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setMobileMenuOpen(false); // Close mobile menu when hiding header
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 inset-x-0 w-full z-50 px-4 sm:px-6 pt-4 sm:pt-6 pointer-events-none transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-[150%]'}`}>
    <header className="pointer-events-auto mx-auto w-full max-w-5xl bg-background backdrop-blur-xl border border-border rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all relative">
      <div className="px-5 md:px-8 h-14 md:h-[68px] flex items-center justify-between">

        <Link
          href="/"
          className="flex items-center gap-3 text-xl sm:text-[22px] font-bold tracking-tight text-foreground hover:opacity-85 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-md"
        >
          <Image
            src="/icon.png"
            alt="Lockout Icon"
            width={34}
            height={34}
            className="rounded-lg object-contain"
            priority
          />
          <span>{siteConfig.name}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {desktopNav.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[15px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-md py-1 px-1.5 ${isActive
                  ? "font-semibold text-primary"
                  : "font-medium text-muted-foreground hover:text-foreground"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}

        </nav>

        <div className="flex items-center gap-2">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hidden md:flex p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              aria-label="Toggle Dark Mode"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          )}

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          className="md:hidden p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          <span className="sr-only">Toggle Menu</span>
        </button>
      </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[calc(100%+0.5rem)] inset-x-0 bg-card backdrop-blur-xl border border-border shadow-lg rounded-3xl px-6 py-6 flex flex-col gap-5 z-50 pointer-events-auto origin-top animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col gap-2">
            {desktopNav.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded-xl text-[16px] transition-colors ${isActive
                    ? "font-semibold text-foreground bg-muted"
                    : "font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-3 px-4 rounded-xl text-[16px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              GitHub
            </a>
          </nav>
          
          {mounted && (
            <div className="pt-4 border-t border-border mt-2">
              <button
                onClick={() => {
                  setTheme(theme === "dark" ? "light" : "dark");
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 py-3 px-4 w-full rounded-xl text-[16px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  </div>
  );
}
