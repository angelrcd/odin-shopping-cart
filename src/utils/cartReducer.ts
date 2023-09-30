import { type Product } from "../vite-env";

interface ACTIONTYPE {
  type: "added_product" | "removed_product" | "cleared_product";
  product: Product;
}

export default function reducer(state: Product[], action: ACTIONTYPE) {
  switch (action.type) {
    case "added_product":
      return [...state, action.product];
    case "removed_product": {
      const i = state.findIndex((p) => p.id === action.product.id);
      return [...state.slice(0, i), ...state.slice(i + 1)];
    }
    case "cleared_product":
      return state.filter((p) => p.id !== action.product.id);
    default: {
      throw new Error(action.type);
    }
  }
}
