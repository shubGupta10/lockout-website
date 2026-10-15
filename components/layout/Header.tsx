"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/config";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const { resolvedTheme, setTheme } = useTheme();
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
        setMobileMenuOpen(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  const toggleTheme = (e: React.MouseEvent) => {
    const newTheme = isDark ? "light" : "dark";

    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      setTheme(newTheme);
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        { clipPath },
        {
          duration: 500,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <div
      className={`fixed top-0 inset-x-0 w-full z-50 px-4 sm:px-6 pt-4 sm:pt-6 pointer-events-none transition-transform duration-300 ease-in-out ${isVisible ? "translate-y-0" : "-translate-y-[150%]"
        }`}
    >
      <header className="pointer-events-auto mx-auto w-full max-w-5xl bg-background/85 backdrop-blur-xl border border-border rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all relative">
        <div className="px-5 md:px-8 h-14 md:h-[68px] flex items-center justify-between">

          {/* Brand Logo */}
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

          {/* Desktop Nav Links */}
          <nav
            className="hidden md:flex items-center gap-1"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {desktopNav.map((link) => {
              const isActive = pathname === link.href;
              const isHovered = hoveredLink === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  className={`relative px-4 py-2 text-[15px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-full ${isActive
                      ? "font-semibold text-primary"
                      : "font-medium text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {isHovered && (
                    <motion.div
                      layoutId="header-hover-pill"
                      className="absolute inset-0 bg-muted rounded-full -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Actions (Theme Toggle & Mobile Menu Button) */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex w-9 h-9 items-center justify-center">
              {mounted && (
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring cursor-pointer"
                  aria-label="Toggle Dark Mode"
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              )}
            </div>

            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              <span className="sr-only">Toggle Menu</span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="md:hidden absolute top-[calc(100%+0.5rem)] inset-x-0 bg-card/95 backdrop-blur-xl border border-border shadow-lg rounded-3xl px-6 py-6 flex flex-col gap-5 z-50 pointer-events-auto origin-top"
            >
              <nav className="flex flex-col gap-2">
                {desktopNav.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block py-3 px-4 rounded-xl text-[16px] transition-colors ${isActive
                          ? "font-semibold text-primary bg-muted"
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
                    type="button"
                    onClick={(e) => {
                      toggleTheme(e);
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 py-3 px-4 w-full rounded-xl text-[16px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                  >
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    {isDark ? "Light Mode" : "Dark Mode"}
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}