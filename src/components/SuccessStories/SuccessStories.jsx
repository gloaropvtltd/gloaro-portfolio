import { Trophy } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

export default function SuccessStories() {
  return (
    <section id="success-stories" className="bg-white py-24 sm:py-32">
      <Container size="narrow">
        <SectionTitle
          eyebrow="Success Stories"
          title="Client Success Stories"
          description="In-depth case studies on how we've helped businesses grow — coming soon."
        />

        <div className="mt-16 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-surface-50 px-6 py-16 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-100 text-gold-600">
            <Trophy className="h-6 w-6" aria-hidden="true" />
          </span>
          <p className="font-heading text-h4 text-foreground">Full case studies coming soon</p>
          <p className="max-w-md text-body text-ink-500">
            We&apos;re documenting detailed success stories from our clients. In the meantime, see
            what they say in our Testimonials section above.
          </p>
        </div>
      </Container>
    </section>
  );
}
