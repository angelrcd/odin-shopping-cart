import { Category } from "../vite-env";

export async function categoryLoader() {
  const response = await fetch("https://dummyjson.com/products/categories");
  const categoryData = (await response.json()) as Category[];
  return categoryData;
}
