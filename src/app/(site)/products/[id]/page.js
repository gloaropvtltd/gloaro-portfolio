import { notFound } from "next/navigation";
import ProductDetail from "@/components/Products/ProductDetail";
import { getProductById, getProducts } from "@/utils/content";

const siteUrl = "https://www.gloaro.in";

function buildCaseStudyJsonLd(product, id) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: product.title,
    description: product.description,
    image: product.image_url ? `${siteUrl}${product.image_url}` : undefined,
    url: `${siteUrl}/products/${id}`,
    creator: {
      "@type": "Organization",
      name: "GLOARO PVT LTD",
      url: siteUrl,
    },
  };
}

function buildBreadcrumbJsonLd(product, id) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Products", item: `${siteUrl}/#products` },
      {
        "@type": "ListItem",
        position: 3,
        name: product.title,
        item: `${siteUrl}/products/${id}`,
      },
    ],
  };
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ id: String(product.id) }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) return {};

  return {
    title: product.title,
    description: product.description,
    alternates: {
      canonical: `/products/${id}`,
    },
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.image_url ? [{ url: product.image_url }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  const caseStudyJsonLd = buildCaseStudyJsonLd(product, id);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(product, id);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProductDetail product={product} />
    </>
  );
}
