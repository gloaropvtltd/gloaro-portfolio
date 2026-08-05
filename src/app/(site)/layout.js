import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import WhatsappFloat from "@/components/ui/WhatsappFloat";
import CallFloat from "@/components/ui/CallFloat";
import { getSocialLinks } from "@/utils/content";

const siteUrl = "https://www.gloaro.in";

function buildOrganizationJsonLd(socialLinks) {
  const sameAs = socialLinks
    .map((link) => link.url)
    .filter((url) => {
      if (!url) return false;
      try {
        return new URL(url).pathname.length > 1;
      } catch {
        return false;
      }
    });

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GLOARO PVT LTD",
    alternateName: "GLOARO",
    url: siteUrl,
    logo: `${siteUrl}/brand/logo-mark.png`,
    description:
      "GLOARO PVT LTD is a technology-driven business networking and digital solutions company empowering entrepreneurs, startups, SMEs, and enterprises through innovation, collaboration, and digital transformation.",
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
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export default async function SiteLayout({ children }) {
  const socialLinks = await getSocialLinks();
  const organizationJsonLd = buildOrganizationJsonLd(socialLinks);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <ScrollProgressBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer socialLinks={socialLinks} />
      <WhatsappFloat />
      <CallFloat />
    </>
  );
}
