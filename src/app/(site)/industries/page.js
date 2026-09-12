import { Check } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { industriesShowcase } from "@/data/industriesShowcase";
import { industryIconMap } from "@/components/Industries/icons";

const siteUrl = "https://www.gloaro.in";

const title = "Industries We Serve | GLOARO Pvt Ltd";
const description =
  "GLOARO builds digital solutions for retail, manufacturing, real estate, hospitality, and growing businesses.";

export const metadata = {
  title,
  description,
  alternates: {
    canonical: "/industries",
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
      { "@type": "ListItem", position: 2, name: "Industries", item: `${siteUrl}/industries` },
    ],
  };
}

export default function IndustriesPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="bg-navy-950 py-24 sm:py-32">
        <Container size="narrow" className="text-center">
          <h1 className="font-heading text-h1 leading-[1.08] text-white">Industries We Serve</h1>
          <p className="mx-auto mt-5 max-w-2xl text-body-lg text-navy-100/85">
            Digital solutions tailored to how each industry actually operates — not a one-size-fits-all
            platform.
          </p>
        </Container>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <Container>
          <SectionTitle
            eyebrow="Where We Work"
            title="Built For Your Industry"
            description="The services and technologies we bring to each industry we serve."
          />

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industriesShowcase.map((industry) => {
              const Icon = industryIconMap[industry.icon];
              return (
                <Card key={industry.id} className="flex h-full flex-col gap-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-(image:--gradient-brand) text-white">
                    {Icon && <Icon className="h-5 w-5" />}
                  </span>
                  <h2 className="font-heading text-h3 text-foreground">{industry.title}</h2>
                  <p className="text-body-lg text-muted">{industry.description}</p>
                  <ul className="mt-auto flex flex-col gap-1.5 pt-2">
                    {industry.keyServices.map((service) => (
                      <li key={service} className="flex items-center gap-2 text-sm text-ink-600">
                        <Check className="h-4 w-4 flex-none text-navy-700" aria-hidden="true" />
                        {service}
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>

          <div className="mt-16 flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface-50 p-10 text-center">
            <h2 className="font-heading text-h3 text-foreground">Don&apos;t see your industry?</h2>
            <p className="max-w-xl text-body-lg text-muted">
              We build custom software around your workflow, whatever industry you&apos;re in —
              get in touch and tell us what you need.
            </p>
            <Button as="a" href="/contact" variant="primary" size="lg">
              Discuss Your Industry Needs
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
