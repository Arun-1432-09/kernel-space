import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SupabaseNoticeBanner } from "@/components/layout/SupabaseNoticeBanner";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { SmoothPageEnter } from "@/components/animations/SmoothPageEnter";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getSiteSettings } from "@/lib/data/queries";

export const metadata: Metadata = {
  metadataBase: new URL("https://kernelspace.media"),
  title: {
    default: "Kernel Space — Think Deeper. Explore Further.",
    template: "%s | Kernel Space",
  },
  description:
    "An independent multi-format media and knowledge platform for curious minds: podcast conversations, explanatory videos, articles and visual deep-dives.",
  keywords: [
    "Kernel Space",
    "Podcasts",
    "Explanatory Videos",
    "Systems Thinking",
    "Technology and AI",
    "Business Case Studies",
    "Psychology",
    "Design and Creativity",
  ],
  authors: [{ name: "Kernel Space Media" }],
  creator: "Kernel Space",
  publisher: "Kernel Space",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Kernel Space — Think Deeper. Explore Further.",
    description:
      "We explore ideas, break down complex topics and have real conversations that help people understand the world a little better.",
    url: "https://kernelspace.media",
    siteName: "Kernel Space",
    images: [
      {
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Kernel Space Editorial Platform",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kernel Space — Think Deeper. Explore Further.",
    description:
      "We explore ideas, break down complex topics and have real conversations that help people understand the world a little better.",
  },
};

export const viewport: Viewport = {
  themeColor: "#F7F4EC",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const configured = isSupabaseConfigured();
  const settings = await getSiteSettings();

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#EFECE3] antialiased selection:bg-kernel-gold/20 selection:text-kernel-charcoal py-0 sm:py-3 relative overflow-x-hidden max-w-[100vw] w-full">
        {/* Subtle Reading Scroll Progress Beam */}
        <ScrollProgress />

        {/* Atmospheric ambient glass light orbs */}
        <div className="glass-ambient-gold w-[600px] h-[600px] -top-32 -left-32 opacity-25" aria-hidden="true" />
        <div className="glass-ambient-ivory w-[700px] h-[700px] top-1/3 -right-48 opacity-40" aria-hidden="true" />
        <div className="glass-ambient-gold w-[500px] h-[500px] bottom-1/4 left-1/3 opacity-20" aria-hidden="true" />

        {/* The Wellness-Retreat Shell: rounded floating canvas on desktop, full-bleed on mobile */}
        <SmoothPageEnter className="site-shell min-h-screen flex flex-col justify-between relative z-10">
          <div>
            <SupabaseNoticeBanner isConfigured={configured} />
            <Header />
            <main id="main-content" className="flex-grow">{children}</main>
          </div>
          <Footer settings={settings} />
        </SmoothPageEnter>
      </body>
    </html>
  );
}
