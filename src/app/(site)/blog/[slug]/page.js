import { notFound } from "next/navigation";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { getBlogPostBySlug, getBlogPosts } from "@/utils/content";

const siteUrl = "https://www.gloaro.in";

function buildJsonLd(post) {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image_url ? `${siteUrl}${post.cover_image_url}` : undefined,
    author: { "@type": "Organization", name: post.author || "GLOARO Team" },
    publisher: {
      "@type": "Organization",
      name: "GLOARO PVT LTD",
      logo: { "@type": "ImageObject", url: `${siteUrl}/brand/logo-mark.png` },
    },
    datePublished: post.published_at,
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${siteUrl}/blog/${post.slug}` },
    ],
  };

  return { articleJsonLd, breadcrumbJsonLd };
}

function formatDate(value) {
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "long" }).format(new Date(value));
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.published_at,
      images: post.cover_image_url ? [{ url: post.cover_image_url }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) notFound();

  const { articleJsonLd, breadcrumbJsonLd } = buildJsonLd(post);
  const paragraphs = post.content.split(/\n\s*\n/).filter(Boolean);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="bg-white py-24 sm:py-32">
        <Container size="narrow">
          <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">
            {formatDate(post.published_at)} · {post.author}
          </p>
          <h1 className="mt-3 font-heading text-h1 leading-[1.1] text-foreground">
            {post.title}
          </h1>
          <p className="mt-5 text-body-lg text-muted">{post.excerpt}</p>

          {post.cover_image_url && (
            <div className="relative mt-10 h-64 w-full overflow-hidden rounded-2xl sm:h-96">
              <Image
                src={post.cover_image_url}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="mt-10 flex flex-col gap-5 text-body-lg leading-relaxed text-foreground">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </article>
    </>
  );
}
