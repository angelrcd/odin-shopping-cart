import reducer from "../src/utils/cartReducer";
import { it, expect } from "vitest";
import { type Product } from "../src/vite-env";
import { mockedProduct1, mockedProduct2 } from "../src/utils/mockedProducts";

it("Should not mutate", () => {
  const cart: Product[] = [];
  reducer(cart, { type: "added_product", product: mockedProduct1 });
  expect(cart).toHaveLength(0);
});

it("Add product to cart", () => {
  let cart: Product[] = [];
  cart = reducer(cart, { type: "added_product", product: mockedProduct1 });
  expect(cart).toHaveLength(1);
  expect(cart[0].id).toBe(0);
});

it("Removes item from cart", () => {
  let cart = [mockedProduct1, mockedProduct1, mockedProduct2];
  cart = reducer(cart, { type: "removed_product", product: mockedProduct1 });
  expect(cart).toHaveLength(2);
});

it("Clears all products from type", () => {
  let cart = [mockedProduct1, mockedProduct1, mockedProduct2];
  cart = reducer(cart, { type: "cleared_product", product: mockedProduct1 });
  expect(cart).toHaveLength(1);
  expect(cart[0].id).toBe(mockedProduct2.id);
});

it("Throws error if action is invalid", () => {
  let cart: Product[] = [];
  expect(() => reducer(cart, { type: "invalid" } as any)).toThrowError(
    /invalid/
  );
});
