import { siteConfig } from "@/lib/config";
import { ArrowRight, Download } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Metadata } from "next";
import Link from "next/link";
import { fetchReleaseData, fetchAllRelease } from "@/lib/github";

export const metadata: Metadata = {
  title: `Download ${siteConfig.name} for Android | Official APK`,
  description: "Download the latest verified APK release of Lockout. Offline-first, open-source focus app for Android.",
  alternates: {
    canonical: "/download",
  },
};

const ESSENTIAL_INFO = [
  {
    title: "Open source & transparent",
    description: "Lockout is distributed under the MIT License. Inspect every line of code, verify build checksums, or compile the APK yourself.",
    link: {
      href: siteConfig.links.github,
      label: "Browse source",
      isExternal: true,
    },
  },
  {
    title: "System permissions",
    description: "Lockout requires Android Usage Access and Display Over Apps permissions to physically block apps. No personal data is ever collected or transmitted.",
    link: {
      href: "/transparency",
      label: "Read Transparency Report",
      isExternal: false,
    },
  },
  {
    title: "Installation guide",
    description: "Requires Android 10 or newer. Download the direct APK file and ensure \"Install Unknown Apps\" is enabled in your Android settings.",
  },
];

export default async function DownloadPage() {
  const [release, releases] = await Promise.all([
    fetchReleaseData(),
    fetchAllRelease()
  ]);

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12 pt-28 sm:pt-32 md:pt-40 pb-16 sm:pb-24">
        
        <header className="pb-16">
          <h1 className="text-4xl sm:text-[44px] md:text-5xl font-semibold text-foreground tracking-tight leading-[1.15]">
            Download Lockout
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Latest release: <span className="font-semibold text-foreground">{release.version}</span> &middot; {release.date}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:items-center">
            <a 
              href={release.downloadUrl} 
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg bg-primary text-primary-foreground text-[15px] font-medium whitespace-nowrap hover:opacity-90 transition-opacity shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <Download className="w-4 h-4 shrink-0" />
              <span>Download APK</span>
            </a>
            <a 
              href={siteConfig.release.githubReleaseUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center gap-2.5 h-12 px-8 rounded-lg text-foreground text-[15px] font-medium border border-border hover:bg-muted transition-colors shadow-sm"
            >
              <FontAwesomeIcon icon={faGithub} className="w-4 h-4 text-muted-foreground shrink-0" />
              <span>View Source</span>
            </a>
          </div>
        </header>

        <section className="w-full border-t border-border py-16">
          <h2 className="text-xl font-semibold text-foreground mb-8 tracking-tight">Version History</h2>

          <div className="w-full">
            <div className="hidden md:flex items-center w-full pb-4 border-b border-border text-xs font-bold tracking-widest text-muted-foreground uppercase">
              <div className="w-32">Version</div>
              <div className="flex-1">Date</div>
              <div className="w-40 text-right">Download</div>
            </div>

            {releases?.map((releaseItem: any, index: number) => {
              const apkAsset = releaseItem.assets?.find((asset: any) => asset.name.endsWith(".apk"));
              const downloadUrl = apkAsset?.browser_download_url ?? releaseItem.html_url;
              const formattedDate = releaseItem.published_at 
                ? new Date(releaseItem.published_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                : "Unknown date";
              const isLatest = index === 0;

              return (
                <div 
                  key={releaseItem.id} 
                  className="flex flex-col md:flex-row md:items-center py-5 border-b border-border group hover:bg-muted transition-colors -mx-4 px-4 rounded-lg"
                >
                  <div className="w-32 flex items-center gap-3 mb-2 md:mb-0">
                    <span className="text-[15px] font-semibold text-foreground">{releaseItem.tag_name}</span>
                    {isLatest && (
                      <span className="md:hidden px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-primary text-primary-foreground">Latest</span>
                    )}
                  </div>
                  <div className="flex-1 flex items-center gap-3 mb-4 md:mb-0">
                    <span className="text-[15px] text-muted-foreground">{formattedDate}</span>
                    {isLatest && (
                      <span className="hidden md:inline-flex px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-primary text-primary-foreground">Latest</span>
                    )}
                  </div>
                  <div className="w-40 md:text-right">
                    <a 
                      href={downloadUrl} 
                      className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary hover:opacity-90 transition-opacity"
                    >
                      <Download className="w-4 h-4" />
                      Download APK
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="w-full border-t border-border pt-16 flex flex-col md:flex-row gap-12 md:gap-16 lg:gap-20">
          {ESSENTIAL_INFO.map((info) => (
            <div key={info.title} className="flex-1 flex flex-col">
              <h3 className="text-[17px] font-semibold text-foreground mb-3 tracking-tight">{info.title}</h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed mb-4">
                {info.description}
              </p>
              {info.link && (
                info.link.isExternal ? (
                  <a 
                    href={info.link.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 text-[15px] font-medium text-primary hover:opacity-90 transition-opacity group w-fit"
                  >
                    {info.link.label} <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </a>
                ) : (
                  <Link 
                    href={info.link.href} 
                    className="inline-flex items-center gap-1.5 text-[15px] font-medium text-primary hover:opacity-90 transition-opacity group w-fit"
                  >
                    {info.link.label} <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                )
              )}
            </div>
          ))}
        </section>

      </div>
    </div>
  );
}
