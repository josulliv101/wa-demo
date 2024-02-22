import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CookiesProvider } from "./TabNavCookie";
import { StrictMode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "What's Awesome",
  description: "Find out what's awesome about people & places.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StrictMode>
      <html lang="en">
        <body className={inter.className}>
          <CookiesProvider defaultSetOptions={{ path: "/" }}>
            <Header />
            {children}
            <Footer />
          </CookiesProvider>
        </body>
      </html>
    </StrictMode>
  );
}
