import { Product } from "../vite-env";

const cache: Record<string, Product> = {};

export async function productLoader(id?: string) {
  if (id === undefined) return;

  if (cache[id]) return cache[id];

  const response = await fetch(`https://dummyjson.com/products/${id}`);
  const productData = (await response.json()) as Product;
  cache[id] = productData;
  return productData;
}
