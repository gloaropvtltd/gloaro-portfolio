import { Geist, Geist_Mono, Sora } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const siteUrl = "https://www.gloaro.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GLOARO PVT LTD | Innovative Digital Future & Digital Network",
    template: "%s | GLOARO PVT LTD",
  },
  description:
    "GLOARO PVT LTD builds premium, enterprise-grade software, connecting businesses through innovative digital solutions.",
  keywords: [
    "GLOARO",
    "software development company",
    "web development",
    "mobile app development",
    "SaaS development",
    "UI/UX design",
    "cloud solutions",
    "AI solutions",
    "Tamil Nadu software company",
  ],
  authors: [{ name: "GLOARO PVT LTD", url: siteUrl }],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "GLOARO PVT LTD",
    title: "GLOARO PVT LTD | Innovative Digital Future & Digital Network",
    description:
      "Premium software development — web, mobile, SaaS, UI/UX, cloud, and AI solutions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "GLOARO PVT LTD | Innovative Digital Future & Digital Network",
    description:
      "Premium software development — web, mobile, SaaS, UI/UX, cloud, and AI solutions.",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a1030",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GLOARO PVT LTD",
  url: siteUrl,
  logo: `${siteUrl}/brand/logo-mark.png`,
  description:
    "GLOARO PVT LTD builds premium, enterprise-grade software, connecting businesses through innovative digital solutions.",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "SF No.101/2B, Esai Towers, Salem Main Road, Near Bypass, Emapper",
    addressLocality: "Kallakurichi",
    postalCode: "606202",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-7200073704",
    contactType: "customer service",
    email: "info@gloaro.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
