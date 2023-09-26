import { Product } from "../vite-env";

export async function productLoader(id?: string) {
  console.log(id);

  const response = await fetch(`https://dummyjson.com/products/${id}`);
  const productData = (await response.json()) as Product;
  return productData;
}
