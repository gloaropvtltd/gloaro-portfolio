import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import FAQ from "@/components/FAQ/FAQ";

export default function ServicePageLayout({ service }) {
  const { title, intro, sections, techStack, relatedCaseStudy, faqs, cta } = service;

  return (
    <>
      <section className="bg-navy-950 py-24 sm:py-32">
        <Container size="narrow" className="text-center">
          <h1 className="font-heading text-h1 leading-[1.08] text-white">{title}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-body-lg text-navy-100/85">{intro}</p>
          <div className="mt-8 flex justify-center">
            <Button as="a" href={cta.href} variant="gold" size="lg">
              {cta.label}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <Container size="narrow">
          <div className="flex flex-col gap-14">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="font-heading text-h2 text-foreground">{section.heading}</h2>
                <p className="mt-4 text-body-lg text-muted">{section.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-surface-100 px-4 py-1.5 text-sm font-medium text-ink-600"
              >
                {tech}
              </span>
            ))}
          </div>

          {relatedCaseStudy && (
            <Card variant="dark" className="mt-14 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-navy-100/70">Related work</p>
                <p className="mt-1 font-heading text-h4 text-white">{relatedCaseStudy.title}</p>
              </div>
              <Link
                href={relatedCaseStudy.href}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300 hover:text-gold-200"
              >
                View
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Card>
          )}
        </Container>
      </section>

      <FAQ faqs={faqs} />
    </>
  );
}
