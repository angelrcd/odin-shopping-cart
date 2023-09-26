import { Category } from "../vite-env";

export async function categoryLoader() {
  const response = await fetch("https://fakestoreapi.com/products/categories");
  const categoryData = (await response.json()) as Category[];
  return categoryData;
}
