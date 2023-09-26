import { useState, useEffect } from "react";
import { Product } from "../vite-env";

function isProduct(obj: unknown): obj is Product {
  if (
    obj &&
    typeof obj === "object" &&
    "id" in obj &&
    typeof obj.id === "number" &&
    "title" in obj &&
    typeof obj.title === "string" &&
    "price" in obj &&
    typeof obj.price === "number" &&
    "description" in obj &&
    typeof obj.description === "string" &&
    "category" in obj &&
    typeof obj.category === "string" &&
    "image" in obj &&
    typeof obj.image === "string" &&
    "rating" in obj &&
    typeof obj.rating === "object"
  ) {
    const rating = obj.rating;
    if (
      "rate" in rating! &&
      typeof rating.rate === "number" &&
      "count" in rating &&
      typeof rating.count === "number"
    ) {
      return true;
    }
  }
  return false;
}

export const useProducts = (category: string | null) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const url = category
    ? `https://fakestoreapi.com/products/category/${category}`
    : "https://fakestoreapi.com/products";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data: unknown[]) => {
        if (data.every(isProduct)) {
          setProducts(data);
        } else {
          throw new Error("unexpected response");
        }
      })
      .catch((err: string) => setError(err))
      .finally(() => setLoading(false));

    return () => {
      setProducts([]);
      setError(null);
      setLoading(true);
    };
  }, [url]);

  return { products, error, loading };
};
