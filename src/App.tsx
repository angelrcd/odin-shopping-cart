import { useReducer } from "react";
import reducer from "./utils/cartReducer";
import Nav from "./components/Nav";
import { Outlet, useOutletContext } from "react-router-dom";
import { Product } from "./vite-env";

export default function App() {
  const [cart, dispatch] = useReducer(reducer, []);

  // Helper functions to handle cart
  const addProductToCart = (product: Product) => {
    dispatch({ type: "added_product", product: product });
  };

  const removeProductFromCart = (product: Product) => {
    dispatch({ type: "removed_product", product: product });
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
