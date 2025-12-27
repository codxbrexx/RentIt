import type { Metadata } from "next"; // Trigger HMR
import { Inter, Manrope } from "next/font/google"; // Using Manrope as seen in reference Auth.tsx "font-[Manrope]"
import { Suspense } from "react";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "./providers";

const inter = Inter({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "RentIt - Find Your Perfect Home",
  description: "Discover verified properties with transparent pricing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body
        className={`${inter.className} min-h-screen text-slate-600 antialiased selection:bg-[#1F4FD8] selection:text-white`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={<div className="h-20 bg-white/80" />}>
            <Header />
          </Suspense>
          <main className="pt-20 min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
