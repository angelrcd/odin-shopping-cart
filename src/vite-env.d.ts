/// <reference types="vite/client" />

export interface Product {
  id: number;
  name: string;
  description: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  image: string;
  rating: Rating;
}

export function isProduct(obj: unknown): obj is Product {
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

export interface Rating {
  rate: number;
  count: number;
}

export type Category = string;
