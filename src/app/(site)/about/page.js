import { MapPin, Target, Eye } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { contactInfo } from "@/data/contactInfo";

const siteUrl = "https://www.gloaro.in";

const title = "About GLOARO Pvt Ltd | Software & Digital Solutions Company";
const description =
  "Learn about GLOARO Pvt Ltd, a Kallakurichi, Tamil Nadu-based software and digital solutions company building custom technology for startups, SMEs, and enterprises.";

export const metadata = {
  title,
  description,
  alternates: {
    canonical: "/about",
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
      { "@type": "ListItem", position: 2, name: "About", item: `${siteUrl}/about` },
    ],
  };
}

export default function AboutPage() {
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
            About GLOARO Pvt Ltd
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-body-lg text-navy-100/85">
            A software and digital solutions company based in Kallakurichi, Tamil Nadu, building
            technology for startups, SMEs, and growing businesses.
          </p>
        </Container>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <Container size="narrow">
          <SectionTitle
            eyebrow="Who We Are"
            align="left"
            title="Software built around how your business actually works"
            description="We're a technology team that builds custom software, websites, mobile apps, and CRM tools — engineered around a client's real workflows rather than a generic template."
          />

          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            <Card className="h-full">
              <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-navy-100 text-navy-700">
                <Target className="h-5 w-5" />
              </span>
              <h2 className="font-heading text-h3 text-foreground">Our Mission</h2>
              <p className="mt-3 text-body-lg text-muted">
                To give growing businesses the same quality of custom software, digital
                infrastructure, and technical support that larger companies take for granted.
              </p>
            </Card>

            <Card className="h-full">
              <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                <Eye className="h-5 w-5" />
              </span>
              <h2 className="font-heading text-h3 text-foreground">Our Vision</h2>
              <p className="mt-3 text-body-lg text-muted">
                To be a technology partner businesses in Tamil Nadu and beyond return to as they
                grow — not a one-off vendor.
              </p>
            </Card>
          </div>

          <div className="mt-16">
            <h2 className="font-heading text-h2 text-foreground">How We Work</h2>
            <p className="mt-4 max-w-2xl text-body-lg text-muted">
              Every project — whether it&apos;s a website, a mobile app, or a custom CRM — moves
              through the same structured delivery process: requirement analysis, planning,
              UI/UX design, development, testing, deployment, and ongoing maintenance. You always
              know what stage your project is in.
            </p>
          </div>

          <div className="mt-16 flex flex-col items-start gap-3 rounded-2xl border border-border bg-surface-50 p-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-navy-700" />
              <div>
                <h2 className="font-heading text-h4 text-foreground">Where We&apos;re Based</h2>
                <p className="mt-1 text-body-lg text-muted">{contactInfo.address}</p>
              </div>
            </div>
            <Button as="a" href="/contact" variant="primary" size="md">
              Get in Touch
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
