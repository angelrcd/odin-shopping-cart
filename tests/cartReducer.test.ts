import reducer from "../src/utils/cartReducer";
import { it, expect } from "vitest";
import { type Product } from "../src/vite-env";

const exampleProduct1: Product = {
  id: 0,
  title: "Product1",
  description: "",
  price: 0,
  discountPercentage: 0,
  rating: 0,
  stock: 0,
  brand: "",
  category: "",
  thumbnail: "",
  images: [""],
};

const exampleProduct2: Product = {
  id: 1,
  title: "Product2",
  description: "",
  price: 0,
  discountPercentage: 0,
  rating: 0,
  stock: 0,
  brand: "",
  category: "",
  thumbnail: "",
  images: [""],
};

it("Should not mutate", () => {
  const cart: Product[] = [];
  reducer(cart, { type: "added_product", product: exampleProduct1 });
  expect(cart).toHaveLength(0);
});

it("Add product to cart", () => {
  let cart: Product[] = [];
  cart = reducer(cart, { type: "added_product", product: exampleProduct1 });
  expect(cart).toHaveLength(1);
  expect(cart[0].id).toBe(0);
});

it("Removes item from cart", () => {
  let cart = [exampleProduct1, exampleProduct1, exampleProduct2];
  cart = reducer(cart, { type: "removed_product", product: exampleProduct1 });
  expect(cart).toHaveLength(2);
});

it("Clears all products from type", () => {
  let cart = [exampleProduct1, exampleProduct1, exampleProduct2];
  cart = reducer(cart, { type: "cleared_product", product: exampleProduct1 });
  expect(cart).toHaveLength(1);
  expect(cart[0].id).toBe(exampleProduct2.id);
});

it("Throws error if action is invalid", () => {
  let cart: Product[] = [];
  expect(() => reducer(cart, { type: "invalid" } as any)).toThrowError(
    /invalid/
  );
});
