import type { Metadata } from "next";
import localFont from "next/font/local";
import "../style/globals.css";
import { AppProviders } from "@/providers/AppProviders";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Auth App - Secure Login",
  description:
    "A secure and modern authentication application built with Next.js.",
  openGraph: {
    title: "AuthApp - Secure Login",
    description: "Experience secure and seamless authentication with AuthApp.",
    url: "https://auth-app-demo.com",
    siteName: "AuthApp",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "AuthApp Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
