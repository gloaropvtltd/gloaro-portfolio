import Link from "next/link";
import { ArrowUpRight, Newspaper } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

function formatDate(value) {
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "long" }).format(new Date(value));
}

export default function Blog({ posts = [] }) {
  return (
    <section id="blog" className="bg-surface-50 py-24 sm:py-32">
      <Container size="narrow">
        <SectionTitle
          eyebrow="Blog"
          title="Insights & Updates"
          description="Articles on digital transformation, business networking, and technology."
        />

        {posts.length === 0 ? (
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
        ) : (
          <>
            <div className="mt-16 grid gap-6 sm:grid-cols-3">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                  <Card className="flex h-full flex-col gap-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">
                      {formatDate(post.published_at)}
                    </p>
                    <h3 className="font-heading text-h4 text-foreground">{post.title}</h3>
                    <p className="text-body text-muted">{post.excerpt}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-navy-700 transition-colors group-hover:text-gold-600">
                      Read Article<span className="sr-only"> — {post.title}</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-base ease-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <Button as="a" href="/blog" variant="outline" size="lg">
                View All Articles
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
