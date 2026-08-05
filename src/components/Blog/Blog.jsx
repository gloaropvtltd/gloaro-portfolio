import { Newspaper } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

export default function Blog() {
  return (
    <section id="blog" className="bg-surface-50 py-24 sm:py-32">
      <Container size="narrow">
        <SectionTitle
          eyebrow="Blog"
          title="Insights & Updates"
          description="Articles on digital transformation, business networking, and technology — coming soon."
        />

        <div className="mt-16 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-white px-6 py-16 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-100 text-navy-700">
            <Newspaper className="h-6 w-6" aria-hidden="true" />
          </span>
          <p className="font-heading text-h4 text-foreground">New articles coming soon</p>
          <p className="max-w-md text-body text-ink-500">
            We&apos;re working on our first set of posts. Check back soon for insights from the
            GLOARO team.
          </p>
        </div>
      </Container>
    </section>
  );
}
