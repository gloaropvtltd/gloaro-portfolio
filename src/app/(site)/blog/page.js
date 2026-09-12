import Link from "next/link";
import { ArrowUpRight, Newspaper } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import { getBlogPosts } from "@/utils/content";

const siteUrl = "https://www.gloaro.in";

const title = "Blog | GLOARO Pvt Ltd";
const description =
  "Insights on digital transformation, business networking, software development, and technology from the GLOARO team.";

export const metadata = {
  title,
  description,
  alternates: {
    canonical: "/blog",
  },
  openGraph: { title, description },
  twitter: { card: "summary_large_image", title, description },
};

function buildJsonLd(posts) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
    ],
  };

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "GLOARO Blog",
    url: `${siteUrl}/blog`,
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${siteUrl}/blog/${post.slug}`,
      datePublished: post.published_at,
    })),
  };

  return { breadcrumbJsonLd, blogJsonLd };
}

function formatDate(value) {
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "long" }).format(new Date(value));
}

export default async function BlogHubPage() {
  const posts = await getBlogPosts();
  const { breadcrumbJsonLd, blogJsonLd } = buildJsonLd(posts);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="bg-navy-950 py-24 sm:py-32">
        <Container size="narrow" className="text-center">
          <h1 className="font-heading text-h1 leading-[1.08] text-white">
            Insights &amp; Updates
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-body-lg text-navy-100/85">
            Articles on digital transformation, business networking, and technology from the
            GLOARO team.
          </p>
        </Container>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <Container>
          {posts.length === 0 ? (
            <div className="mt-4 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-surface-50 px-6 py-16 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-100 text-navy-700">
                <Newspaper className="h-6 w-6" aria-hidden="true" />
              </span>
              <p className="font-heading text-h4 text-foreground">New articles coming soon</p>
              <p className="max-w-md text-body text-ink-500">
                We&apos;re working on our first set of posts. Check back soon.
              </p>
            </div>
          ) : (
            <>
              <SectionTitle
                eyebrow="Blog"
                title="Latest Articles"
                description="Insights from the GLOARO team on software, networking, and growth."
              />

              <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                    <Card className="flex h-full flex-col gap-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">
                        {formatDate(post.published_at)}
                      </p>
                      <h2 className="font-heading text-h3 text-foreground">{post.title}</h2>
                      <p className="text-body-lg text-muted">{post.excerpt}</p>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-navy-700 transition-colors group-hover:text-gold-600">
                        Read Article<span className="sr-only"> — {post.title}</span>
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-base ease-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </Card>
                  </Link>
                ))}
              </div>
            </>
          )}
        </Container>
      </section>
    </>
  );
}
