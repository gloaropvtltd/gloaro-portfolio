import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Layers } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import { getProducts } from "@/utils/content";

const siteUrl = "https://www.gloaro.in";

const title = "Products & Platforms | GLOARO Pvt Ltd";
const description =
  "Explore GLOARO's product case studies — AI-powered CRM, POS & billing system, and HR management platform.";

export const metadata = {
  title,
  description,
  alternates: {
    canonical: "/products",
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
      { "@type": "ListItem", position: 2, name: "Products", item: `${siteUrl}/products` },
    ],
  };
}

export default async function ProductsHubPage() {
  const products = await getProducts();
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
            Products Built by GLOARO
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-body-lg text-navy-100/85">
            Case studies from real engagements — CRM, point-of-sale, and HR systems built around
            one team&apos;s exact workflow.
          </p>
        </Container>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <Container>
          <SectionTitle
            eyebrow="Our Products"
            title="Explore What We've Built"
            description="Each product started as a custom engagement — see the full case study for the details."
          />

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} className="group">
                <Card className="flex h-full flex-col overflow-hidden p-0">
                  <div className="relative flex h-44 items-center justify-center overflow-hidden bg-(image:--gradient-mesh) bg-navy-950">
                    {product.image_url ? (
                      <Image
                        src={product.image_url}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-slow ease-brand group-hover:scale-110"
                      />
                    ) : (
                      <Layers className="h-12 w-12 text-white/25" strokeWidth={1.5} />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-6">
                    <h2 className="font-heading text-lg font-bold text-foreground">
                      {product.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-muted">{product.description}</p>
                    <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-semibold text-navy-700 transition-colors group-hover:text-gold-600">
                      View Case Study
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-base ease-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
