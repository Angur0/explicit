import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";
import { FloatingButtonWrapper } from "@/components/ui/floating-button-wrapper";

export const metadata: Metadata = {
  title: "Explorers - Communication & Information Technology",
  description:
    "Welcome to the official portal for Explorers in Communication and Information Technology.",
  icons: {
    icon: "/images/logo_explicit.webp",
    shortcut: "/images/logo_explicit.webp",
    apple: "/images/logo_explicit.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <div className="flex flex-col min-h-screen">
          <PublicHeader />
          <main className="flex-1">{children}</main>
          <PublicFooter />
        </div>
        <FloatingButtonWrapper />
        <Toaster />
      </body>
    </html>
  );
}
