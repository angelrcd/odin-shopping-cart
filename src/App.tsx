import { SetStateAction, useState } from "react";
import Nav from "./components/Nav";
import { Outlet, useOutletContext } from "react-router-dom";
import { Product } from "./vite-env";

export default function App() {
  const [cart, setCart] = useState<Product[]>([]);
  return (
    <>
      <Nav cartSize={cart.length} />
      <Outlet context={{ cart, setCart }} />
    </>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  return useOutletContext<{
    cart: Product[];
    setCart: SetStateAction<Product[]>;
  }>();
}
