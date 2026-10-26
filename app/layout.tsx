import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/config";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${siteConfig.name} | Open-Source App Blocker & Focus Timer for Android`,
  description: siteConfig.description,
  icons: {
    icon: "/icon.png",
  },
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: `${siteConfig.name} | Open-Source App Blocker & Focus Timer for Android`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: "/ogImage.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Open-Source App Blocker & Focus Timer`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Open-Source App Blocker & Focus Timer for Android`,
    description: siteConfig.description,
    images: ["/ogImage.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteConfig.name,
  operatingSystem: "Android 10+",
  applicationCategory: "ProductivityApplication",
  description: siteConfig.description,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  url: siteConfig.url,
  downloadUrl: siteConfig.release.githubReleaseUrl,
  license: "https://www.gnu.org/licenses/gpl-3.0.html",
  softwareVersion: siteConfig.release.version,
  author: {
    "@type": "Person",
    name: "Shubham Kumar Gupta",
    url: "https://github.com/shubGupta10",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1 flex flex-col">
            <Analytics />
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
