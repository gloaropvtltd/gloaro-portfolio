import { notFound } from "next/navigation";
import ServicePageLayout from "@/components/Services/ServicePageLayout";
import { servicePages } from "@/data/servicePages";

const siteUrl = "https://www.gloaro.in";

function buildJsonLd(slug, service) {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.metaDescription,
    provider: {
      "@type": "Organization",
      name: "GLOARO PVT LTD",
      url: siteUrl,
    },
    areaServed: "IN",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `${siteUrl}/services/${slug}`,
      },
    ],
  };

  return { serviceJsonLd, breadcrumbJsonLd };
}

export async function generateStaticParams() {
  return Object.keys(servicePages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = servicePages[slug];
  if (!service) return {};

  return {
    title: service.seoTitle,
    description: service.metaDescription,
    alternates: {
      canonical: `/services/${slug}`,
    },
    openGraph: {
      title: service.seoTitle,
      description: service.metaDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: service.seoTitle,
      description: service.metaDescription,
    },
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = servicePages[slug];

  if (!service) notFound();

  const { serviceJsonLd, breadcrumbJsonLd } = buildJsonLd(slug, service);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ServicePageLayout service={service} />
    </>
  );
}
