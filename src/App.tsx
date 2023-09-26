import { useState } from "react";
import Nav from "./components/Nav";
import { Outlet, useOutletContext } from "react-router-dom";
import { Product } from "./vite-env";

export default function App() {
  const [cart, setCart] = useState<Product[]>([]);

  // Helper function to work with cart
  const addProductToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeProductFromCart = (product: Product) => {
    const i = cart.findIndex((p) => p.id === product.id);
    setCart([...cart.slice(0, i), ...cart.slice(i + 1)]);
  };

  const ammountInCart = (product: Product): number => {
    return cart.reduce((acc, current) => {
      if (current.id === product.id) acc++;
      return acc;
    }, 0);
  };

  return (
    <>
      <Nav cartSize={cart.length} />
      <Outlet
        context={{
          cart,
          addProductToCart,
          ammountInCart,
          removeProductFromCart,
        }}
      />
    </>
  );
}

export function useCart() {
  return useOutletContext<{
    cart: Product[];
    addProductToCart: (product: Product) => void;
    ammountInCart: (product: Product) => number;
    removeProductFromCart: (product: Product) => void;
  }>();
}
