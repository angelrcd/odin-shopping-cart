import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
import { it } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { useCart } from "../src/App";

import Shop from "../src/routes/Shop";

function setup(categories: string[]) {
  const router = createMemoryRouter(
    [
      {
        path: "/shop",
        element: <Shop />,
        loader: () => Promise.resolve(categories),
      },
    ],
    {
      initialEntries: ["/shop"],
    }
  );

  const user = userEvent.setup();
  render(<RouterProvider router={router} />);
  return user;
}

vi.mock("../src/App", () => {
  return {
    useCart: () => {
      return {
        cart: [],
        addProductToCart: vi.fn(),
        ammountInCart: vi.fn(),
        removeProductFromCart: vi.fn(),
      };
    },
  };
});

it("It renders /shop view", async () => {
  setup([]);

  await screen.findByRole("heading", {
    name: /shop/i,
  });
});

it("Selection input has categories", async () => {
  const user = setup(["laptops"]);

  useCart;

  const categorySelectionInput = await screen.findByRole("button", {
    name: /filter by category/i,
  });

  // Look up categories are not on screen before expanding selection
  expect(
    screen.queryByRole("option", {
      name: /laptops/i,
    })
  ).not.toBeInTheDocument();
  // expect(screen.queryByText(/smartphones/i)).not.toBeVisible();

  // Click selection input to expand it
  await user.click(categorySelectionInput);

  // Categories should now be on screen
  expect(
    screen.getByRole("option", {
      name: /laptops/i,
    })
  ).toBeInTheDocument();
});
