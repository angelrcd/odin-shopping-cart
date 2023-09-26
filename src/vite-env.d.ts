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

export interface Rating {
  rate: number;
  count: number;
}

export type Category = string;
