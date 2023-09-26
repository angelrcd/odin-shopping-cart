import { useCart } from "../App";
import { useLoaderData } from "react-router-dom";
import { Category, Product } from "../vite-env";
import { Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useProducts } from "../utils/useProducts";
import { Spinner } from "@nextui-org/react";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categories = useLoaderData() as Category[];
  const categoryFilter = searchParams.get("category");
  const { products, error, loading } = useProducts(categoryFilter);
  const { cart, setCart } = useCart();

  return (
    <main className="mx-auto max-w-[1024px] px-6">
      <h2>Shop</h2>
      <Select
        selectedKeys={[categoryFilter!]}
        label="Filter by category"
        className="max-w-xs"
        onChange={(e) => {
          if (e.target.value) {
            setSearchParams({ category: e.target.value });
          } else {
            setSearchParams({});
          }
        }}>
        {categories.map((category) => (
          <SelectItem key={category} value={category}>
            {category[0].toLocaleUpperCase() + category.slice(1)}
          </SelectItem>
        ))}
      </Select>
      {loading && <Spinner className="ml-4" />}
      <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3">
        {products.length > 0 &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </main>
  );
}
