/// <reference types="vite/client" />

export interface Product {
  id: number;
  name: string;
  description: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface Rating {
  rate: number;
  count: number;
}

export type Category = string;
