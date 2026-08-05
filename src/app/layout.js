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

const siteUrl = "https://www.gloaro.in";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GLOARO PVT LTD | Innovative Digital Future & Digital Network",
    template: "%s | GLOARO PVT LTD",
  },
  description:
    "GLOARO PVT LTD is a technology-driven business networking and digital solutions company empowering entrepreneurs, startups, SMEs, and enterprises through innovation, collaboration, and digital transformation.",
  keywords: [
    "GLOARO",
    "business networking platform",
    "digital solutions company",
    "e-commerce solutions",
    "software development company",
    "web development",
    "mobile app development",
    "digital marketing",
    "CRM solutions",
    "IT consulting",
    "Tamil Nadu business networking company",
  ],
  authors: [{ name: "GLOARO PVT LTD", url: siteUrl }],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "GLOARO PVT LTD",
    title: "GLOARO PVT LTD | Innovative Digital Future & Digital Network",
    description:
      "Business networking, e-commerce, software, digital marketing, CRM, and IT consulting — an integrated ecosystem for business growth.",
  },
  twitter: {
    card: "summary_large_image",
    title: "GLOARO PVT LTD | Innovative Digital Future & Digital Network",
    description:
      "Business networking, e-commerce, software, digital marketing, CRM, and IT consulting — an integrated ecosystem for business growth.",
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

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
