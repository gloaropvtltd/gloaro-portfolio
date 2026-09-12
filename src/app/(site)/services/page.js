import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import { servicePages } from "@/data/servicePages";

const siteUrl = "https://www.gloaro.in";

const title = "Software & Digital Solutions Services | GLOARO Pvt Ltd";
const description =
  "Explore GLOARO's software development, web & mobile app development, and CRM automation services for growing businesses.";

export const metadata = {
  title,
  description,
  alternates: {
    canonical: "/services",
  },
  openGraph: { title, description },
  twitter: { card: "summary_large_image", title, description },
};

function buildBreadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
    ],
  };
}

export default function ServicesHubPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="bg-navy-950 py-24 sm:py-32">
        <Container size="narrow" className="text-center">
          <h1 className="font-heading text-h1 leading-[1.08] text-white">
            Software &amp; Digital Solutions for Growing Businesses
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-body-lg text-navy-100/85">
            Custom software, web and mobile app development, and CRM automation — built around
            your exact workflows, not off-the-shelf templates.
          </p>
        </Container>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <Container>
          <SectionTitle
            eyebrow="Our Services"
            title="Explore What We Build"
            description="Each service below follows the same structured process, from requirement analysis to ongoing support."
          />

          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {Object.entries(servicePages).map(([slug, service]) => (
              <Link key={slug} href={`/services/${slug}`} className="group">
                <Card className="flex h-full flex-col gap-3">
                  <h2 className="font-heading text-h3 text-foreground">{service.title}</h2>
                  <p className="text-body-lg text-muted">{service.metaDescription}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-navy-700 transition-colors group-hover:text-gold-600">
                    Learn More<span className="sr-only"> about {service.title}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-base ease-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
