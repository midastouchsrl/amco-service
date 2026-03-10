import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { SITE_META, COMPANY } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: SITE_META.title,
    template: `%s | ${SITE_META.title}`,
  },
  description: SITE_META.description,
  keywords: [
    "amministrazione condominiale",
    "amministratore di condominio",
    "Verona",
    "gestione condominio",
    "AMCO Service",
  ],
  authors: [{ name: COMPANY.name }],
  creator: COMPANY.name,
  metadataBase: new URL(SITE_META.url),
  openGraph: {
    type: "website",
    locale: SITE_META.locale,
    url: SITE_META.url,
    title: SITE_META.title,
    description: SITE_META.description,
    siteName: SITE_META.title,
    images: [
      {
        url: SITE_META.ogImage,
        width: 1200,
        height: 630,
        alt: `${COMPANY.name} - Amministrazione condominiale a Verona`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// JSON-LD Schema for LocalBusiness
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: COMPANY.name,
  description: "Studio di amministrazione condominiale a Verona",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Via Francesco Morosini 7",
    addressLocality: "Verona",
    postalCode: "37138",
    addressRegion: "VR",
    addressCountry: "IT",
  },
  telephone: "+39045560066",
  email: COMPANY.email,
  url: SITE_META.url,
  vatID: `IT${COMPANY.vatId}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={cn("font-sans min-h-screen flex flex-col", inter.variable)}>
        <Header />
        <main className="flex-1 pt-16 lg:pt-20">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
