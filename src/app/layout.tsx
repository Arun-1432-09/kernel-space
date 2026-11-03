import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SupabaseNoticeBanner } from "@/components/layout/SupabaseNoticeBanner";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getSiteSettings } from "@/lib/data/queries";

export const metadata: Metadata = {
  metadataBase: new URL("https://kernelspace.media"),
  title: {
    default: "Kernel Space — Think Deeper. Explore Further.",
    template: "%s | Kernel Space",
  },
  description:
    "An independent media platform for curiosity, learning, and meaningful conversation. Exploring ideas across technology, business, psychology, and design.",
  keywords: [
    "Kernel Space",
    "Podcasts",
    "Explanatory Journalism",
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
      "A space for curious minds to question ideas, explore perspectives and understand the world beyond the surface.",
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
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kernel Space — Think Deeper. Explore Further.",
    description:
      "A space for curious minds to question ideas, explore perspectives and understand the world beyond the surface.",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
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
      <body className="min-h-screen flex flex-col font-sans bg-white text-kernel-charcoal antialiased selection:bg-kernel-gold/20 selection:text-kernel-charcoal">
        <SupabaseNoticeBanner isConfigured={configured} />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
