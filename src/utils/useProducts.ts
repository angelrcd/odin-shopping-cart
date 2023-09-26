import { useState, useEffect } from "react";
import { Product } from "../vite-env";

function isProduct(obj: unknown): obj is Product {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "id" in obj &&
    "title" in obj &&
    typeof obj.title === "string" &&
    "description" in obj &&
    typeof obj.description === "string" &&
    "price" in obj &&
    typeof obj.price === "number" &&
    "discountPercentage" in obj &&
    typeof obj.discountPercentage === "number" &&
    "rating" in obj &&
    typeof obj.rating === "number" &&
    "stock" in obj &&
    typeof obj.stock === "number" &&
    "brand" in obj &&
    typeof obj.brand === "string" &&
    "category" in obj &&
    typeof obj.category === "string" &&
    "thumbnail" in obj &&
    typeof obj.thumbnail === "string" &&
    "images" in obj &&
    Array.isArray(obj.images) &&
    obj.images.every((image: unknown) => typeof image === "string")
  );
}

export const useProducts = (category: string | null) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const url = category
    ? `https://dummyjson.com/products/category/${category}`
    : "https://dummyjson.com/products?limit=0";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data: { products: unknown[] }) => {
        const products = data.products;

        if (products.every(isProduct)) {
          setProducts(products);
        } else {
          throw new Error("unexpected response");
        }
      })
      .catch((err: string) => {
        console.log(err);
        setError(err);
      })
      .finally(() => setLoading(false));

    return () => {
      setProducts([]);
      setError(null);
      setLoading(true);
    };
  }, [url]);

  return { products, error, loading };
};
