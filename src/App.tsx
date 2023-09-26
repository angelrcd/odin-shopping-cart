import { SetStateAction, useState } from "react";
import Nav from "./components/Nav";
import { Outlet, useOutletContext } from "react-router-dom";
import { Product, Category } from "./vite-env";

export async function categoryLoader() {
  const response = await fetch("https://fakestoreapi.com/products/categories");
  const categoryData = (await response.json()) as Category[];
  return categoryData;
}

export default function App() {
  const [cart, setCart] = useState<Product[]>([]);
  return (
    <>
      <Nav cartSize={cart.length} />
      <Outlet context={{ cart, setCart }} />
    </>
  );
}

export function useCart() {
  return useOutletContext<{
    cart: Product[];
    setCart: SetStateAction<Product[]>;
  }>();
}
