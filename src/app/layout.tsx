import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { Providers } from "@/app/providers";
import {Inter} from "next/font/google";
import Footer from "@/components/Foorer";
import { ClerkProvider } from '@clerk/nextjs'

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const montserrat = Inter({
  subsets: ["latin"],
  variable: "--font-montserrat",
});


export const metadata: Metadata = {
  title: "Nexwear",
  description: "A clothing brand!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
      // className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-light dark:bg-dark transition-colors duration-500` 
  return (
      <ClerkProvider>
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased min-h-screen transition-colors duration-500` 
      }
      >
        <Providers>
        <Navigation />
          {children}
        <Footer />
          </Providers>
      </body>
    </html>
          </ClerkProvider>
  );
}
