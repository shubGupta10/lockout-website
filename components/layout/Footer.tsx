import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-background border-t border-border">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-12 sm:py-16 flex flex-col md:flex-row justify-between gap-12">

        <div className="flex flex-col gap-5 max-w-[320px]">
          <Link href="/" className="flex items-center gap-3 text-xl sm:text-[22px] font-bold tracking-tight text-foreground hover:opacity-85 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-md w-fit">
            <Image src="/icon.png" alt="Lockout Icon" width={24} height={24} className="rounded object-contain" />
            <span>{siteConfig.name}</span>
          </Link>
          <p className="text-[15px] text-muted-foreground leading-relaxed">
            {siteConfig.description}
          </p>
          <div className="flex items-center gap-4 mt-1">
            <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository" className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-sm">
              <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 sm:gap-16 lg:gap-24 pt-2 md:pt-0">
          <div className="flex flex-col gap-3.5">
            <h3 className="text-[11px] font-semibold text-foreground uppercase tracking-wider mb-2">Product</h3>
            <Link href="/" className="text-[15px] text-muted-foreground hover:text-foreground transition-colors w-fit focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-sm py-1.5 sm:py-0">Home</Link>
            <Link href="/download" className="text-[15px] text-muted-foreground hover:text-foreground transition-colors w-fit focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-sm py-1.5 sm:py-0">Download APK</Link>
          </div>
          <div className="flex flex-col gap-3.5">
            <h3 className="text-[11px] font-semibold text-foreground uppercase tracking-wider mb-2">Legal</h3>
            <Link href="/transparency" className="text-[15px] text-muted-foreground hover:text-foreground transition-colors w-fit focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-sm py-1.5 sm:py-0">Transparency</Link>
            <Link href="/privacy" className="text-[15px] text-muted-foreground hover:text-foreground transition-colors w-fit focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-sm py-1.5 sm:py-0">Privacy Policy</Link>
          </div>
          <div className="flex flex-col gap-3.5 col-span-2 sm:col-span-1">
            <h3 className="text-[11px] font-semibold text-foreground uppercase tracking-wider mb-2">Developer</h3>
            <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="text-[15px] text-muted-foreground hover:text-foreground transition-colors w-fit focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-sm py-1.5 sm:py-0">Source Code</a>
            <a href="https://shubhamgupta.online" target="_blank" rel="noopener noreferrer" className="text-[15px] text-muted-foreground hover:text-foreground transition-colors w-fit focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-sm py-1.5 sm:py-0">Contact Developer</a>
          </div>
        </div>

      </div>

      <div className="w-full border-t border-border">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-muted-foreground font-medium">
            &copy; {new Date().getFullYear()} Lockout App
          </p>
          <p className="text-[13px] text-muted-foreground">
            Open Source under MIT License
          </p>
        </div>
      </div>
    </footer>
  );
}
