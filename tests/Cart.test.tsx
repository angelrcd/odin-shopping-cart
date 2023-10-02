import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
import { describe, it, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";
import {
  mockedProduct1,
  mockedProduct2,
  mockedProduct3,
} from "../src/utils/mockedProducts";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import * as hooks from "../src/App";
import Cart from "../src/routes/Cart";
import { type Product } from "../src/vite-env";
import { within } from "@testing-library/react";

function setup() {
  const router = createMemoryRouter(
    [
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
    {
      initialEntries: ["/cart"],
    }
  );

  render(<RouterProvider router={router} />);
}

it("Indicates cart is empty", () => {
  vi.spyOn(hooks, "useCart").mockImplementation(() => {
    return {
      cart: [],
      addProductToCart: vi.fn(),
      ammountInCart: vi.fn(),
      removeProductFromCart: vi.fn(),
    };
  });
  setup();
  expect(screen.getByText(/cart is empty/i)).toBeInTheDocument();
});

it("Shows items in table", () => {
  vi.spyOn(hooks, "useCart").mockImplementation(() => {
    return {
      cart: [mockedProduct1],
      addProductToCart: vi.fn(),
      ammountInCart: vi.fn(),
      removeProductFromCart: vi.fn(),
    };
  });
  setup();
  const productRow = screen.getAllByRole("row")[1];
  expect(within(productRow).getByText(/Product1/i)).toBeInTheDocument();
  expect(within(productRow).getByText("$110")).toBeInTheDocument();
});

afterEach(() => {
  vi.clearAllMocks();
});
