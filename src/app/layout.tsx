import type { Metadata, Viewport } from "next";
import { Chakra_Petch, Open_Sans } from "next/font/google";
import { SITE_CONFIG } from "@/config/site";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MotionProvider } from "@/components/layout/motion-provider";
import { SmoothScrollProvider } from "@/components/layout/smooth-scroll-provider";
import { ServiceWorkerRegister } from "@/components/layout/service-worker-register";
import { Preloader } from "@/components/ui/preloader";
import "./globals.css";

// Heading font — Chakra Petch (editorial, strong character)
const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-heading",
});

// Body / description font — Open Sans (legible, clean)
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-body",
});

export const viewport: Viewport = {
  themeColor: "#F6F7F3",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  applicationName: SITE_CONFIG.name,
  authors: [{ name: SITE_CONFIG.legalName }],
  generator: "Next.js",
  keywords: [
    "PT. Jamparing Masagi",
    "ICT Solution",
    "Konsultan TIK",
    "Infrastruktur Jaringan",
    "Pembangunan Aplikasi",
    "Integrasi Sistem",
    "Keamanan TIK",
    "Bandung",
    "Cimahi",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: [
      {
        url: "/images/brands/logo.webp",
        width: 286,
        height: 84,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: SITE_CONFIG.name,
  },
  icons: {
    icon: [
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/icons/favicon-32x32.png",
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Safe JSON-LD Organization schema according to Rule 03 A1
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.legalName,
    alternateName: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/images/brands/logo.webp`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE_CONFIG.phone,
      contactType: "customer service",
      areaServed: "ID",
      availableLanguage: "Indonesian",
    },
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: `${SITE_CONFIG.offices[0].line1}, ${SITE_CONFIG.offices[0].line2}`,
        addressLocality: SITE_CONFIG.offices[0].cityPostal,
        addressCountry: "ID",
      },
      {
        "@type": "PostalAddress",
        streetAddress: `${SITE_CONFIG.offices[1].line1}, ${SITE_CONFIG.offices[1].line2}`,
        addressLocality: SITE_CONFIG.offices[1].cityPostal,
        addressCountry: "ID",
      },
    ],
  };

  const safeJsonLdString = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLdString }}
        />
      </head>
      <body className={`${chakraPetch.variable} ${openSans.variable} font-body min-h-dvh flex flex-col bg-[#F6F7F3] text-slate-900 antialiased`}>
        <Preloader />
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:outline-hidden"
        >
          Lewati ke konten utama
        </a>

        <MotionProvider>
          <SmoothScrollProvider>
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
            <ServiceWorkerRegister />
          </SmoothScrollProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
