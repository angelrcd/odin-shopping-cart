import { useCart } from "../App";
import { useLoaderData } from "react-router-dom";
import { Category, Product } from "../vite-env";
import { Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import { useProducts } from "../utils/useProducts";

export default function Shop() {
  const categories = useLoaderData() as Category[];
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const { products, error, loading } = useProducts(categoryFilter);
  const { cart, setCart } = useCart();

  return (
    <main className="mx-auto max-w-[1024px] px-6">
      <h2>Shop</h2>
      <Select
        label="Filter by category"
        className="max-w-xs"
        onChange={(e) => setCategoryFilter(e.target.value)}>
        {categories.map((category) => (
          <SelectItem key={category} value={category}>
            {category[0].toLocaleUpperCase() + category.slice(1)}
          </SelectItem>
        ))}
      </Select>
      {loading && <p>Loading...</p>}
      {products.length > 0 && <p>{JSON.stringify(products)}</p>}
    </main>
  );
}
