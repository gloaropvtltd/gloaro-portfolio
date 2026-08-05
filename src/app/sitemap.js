import { getProducts } from "@/utils/content";

const siteUrl = "https://www.gloaro.in";

export default async function sitemap() {
  const products = await getProducts();

  const productEntries = products.map((product) => ({
    url: `${siteUrl}/products/${product.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...productEntries,
  ];
}
