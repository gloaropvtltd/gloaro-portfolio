import { notFound } from "next/navigation";
import ProductDetail from "@/components/Products/ProductDetail";
import { getProductById } from "@/utils/content";

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  return <ProductDetail product={product} />;
}
