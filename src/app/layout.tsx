import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/app/providers";
import { ClerkProvider } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LoadingOverlayProvider } from "@/components/LoadingOverlay";
import Footer from "./Footer";
import ConditionalHeader from "./ConditionalHeader";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.velanoshop.store"),
  title: "Velano | Women's Intimates, Jewelry & Essentials",
  description:
    "Discover Velano – your destination for women's intimates, jewelry, and everyday essentials. Elegant, comfortable, and crafted to match modern lifestyles.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Velano | Women's Intimates, Jewelry & Essentials",
    description:
      "Shop Velano's curated collection of intimates, jewelry, and lifestyle essentials designed for women who value comfort and elegance.",
    url: "https://www.velanoshop.store",
    siteName: "Velano",
    images: [
      {
        url: "https://i.ibb.co/HsGB4VP/IMG-20250725-WA0125.jpg",
        width: 1200,
        height: 630,
        alt: "Velano - Women's Essentials",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Velano | Women's Intimates, Jewelry & Essentials",
    description:
      "Velano brings you women's intimates, jewelry, and lifestyle essentials — elegant and modern, crafted for everyday comfort.",
    images: ["https://i.ibb.co/HsGB4VP/IMG-20250725-WA0125.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      {/* ✅ Next handles <html> and <body> */}
      <html lang="en">
        <head>
          {/* ✅ put <link> and <meta> inside <head> */}
          <link
            href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&family=Jost:ital,wght@0,100..900;1,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
            precedence="default"
            rel="stylesheet"
          />
          <meta
            name="google-site-verification"
            content="hxnZjoFR8b1M5i1TXWUEILUTuGQbSOhj4oId4vusrWs"
          />
        </head>
        <body
          className={`${montserrat.variable} antialiased min-h-screen transition-colors duration-500 bg-white`}
        >
          <Providers>
            <ConditionalHeader />

            <SmoothScrollProvider>
              <LoadingOverlayProvider>
                {children}
              </LoadingOverlayProvider>
            </SmoothScrollProvider>

            <SpeedInsights />
            <Footer />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
