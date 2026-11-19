"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { siteConfig } from "@/lib/config";
import { Menu, X, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ThemeToggle } from "./Header";

const adminNav = [
    { name: "Feedback", href: "/admin/feedback" },
    { name: "Download Stats", href: "/admin/stats" },
];

export default function AdminHeader() {
    const pathname = usePathname();
    const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

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

    const handleLogout = async () => {
        try {
            await fetch("/api/logout", { method: "POST" });
        } finally {
            router.refresh();
            window.location.reload();
        }
    };

    return (
        <div
            className={`fixed top-0 inset-x-0 w-full z-50 px-4 sm:px-6 pt-4 sm:pt-6 pointer-events-none transition-transform duration-300 ease-in-out ${isVisible ? "translate-y-0" : "-translate-y-[150%]"
                }`}
        >
            <header className="pointer-events-auto mx-auto w-full max-w-5xl bg-background/85 backdrop-blur-xl border border-border rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all relative">
                <div className="px-5 md:px-8 h-14 md:h-[68px] flex items-center justify-between">
                    <Link
                        href="/admin/feedback"
                        className="flex items-center gap-3 text-xl sm:text-[22px] font-bold tracking-tight text-foreground hover:opacity-85 transition-opacity outline-none focus:outline-none rounded-md"
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

                    <nav
                        className="hidden md:flex items-center gap-1"
                        onMouseLeave={() => setHoveredLink(null)}
                    >
                        {adminNav.map((link) => {
                            const isActive = pathname === link.href;
                            const isHovered = hoveredLink === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onMouseEnter={() => setHoveredLink(link.href)}
                                    className={`relative px-4 py-2 text-[15px] transition-colors rounded-full outline-none focus:outline-none ${isActive
                                            ? "font-semibold text-primary"
                                            : "font-medium text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    {isHovered && (
                                        <motion.div
                                            layoutId="admin-header-hover-pill"
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

                    <div className="flex items-center gap-2.5">
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full text-[13px] font-medium border border-border bg-muted hover:bg-card text-muted-foreground hover:text-foreground transition-colors outline-none cursor-pointer"
                            title="Log out"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Log out</span>
                        </button>

                        <div className="hidden md:flex w-9 h-9 items-center justify-center">
                            <ThemeToggle />
                        </div>

                        <button
                            type="button"
                            aria-label="Toggle admin navigation menu"
                            aria-expanded={mobileMenuOpen}
                            className="md:hidden p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors rounded-full outline-none focus:outline-none cursor-pointer"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            <span className="sr-only">Toggle Menu</span>
                        </button>
                    </div>
                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden absolute top-[calc(100%+0.5rem)] inset-x-0 bg-card/95 backdrop-blur-xl border border-border shadow-lg rounded-3xl px-6 py-6 flex flex-col gap-5 z-50 pointer-events-auto origin-top">
                        <nav className="flex flex-col gap-2">
                            {adminNav.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`text-lg transition-colors py-2 px-3 rounded-xl flex items-center justify-between ${isActive
                                                ? "font-semibold bg-muted text-foreground"
                                                : "font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                            }`}
                                    >
                                        <span>{link.name}</span>
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="pt-4 border-t border-border flex items-center justify-between">
                            <span className="text-sm font-medium text-muted-foreground">Theme</span>
                            <ThemeToggle />
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                setMobileMenuOpen(false);
                                handleLogout();
                            }}
                            className="w-full flex items-center justify-center gap-2 h-11 rounded-xl text-sm font-medium border border-border bg-muted hover:bg-card text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Log out</span>
                        </button>
                    </div>
                )}
            </header>
        </div>
    );
}