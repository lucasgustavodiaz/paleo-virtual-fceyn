import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Paleo Virtual FCEyN",
    template: "%s | Paleo Virtual FCEyN",
  },
  description:
    "Visualizador web para objetos 3D del repositorio paleontológico de la Facultad de Ciencias Exactas y Naturales.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Paleo Virtual FCEyN",
    description:
      "Colección web para explorar objetos paleontológicos digitalizados en 3D.",
    siteName: "Paleo Virtual FCEyN",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Paleo Virtual FCEyN - Repositorio institucional 3D",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paleo Virtual FCEyN",
    description:
      "Colección web para explorar objetos paleontológicos digitalizados en 3D.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground flex min-h-full flex-col overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SiteHeader />
          {children}
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
