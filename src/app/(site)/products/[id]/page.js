import { notFound } from "next/navigation";
import ProductDetail from "@/components/Products/ProductDetail";
import { getProductById, getProducts } from "@/utils/content";

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

  return <ProductDetail product={product} />;
}
