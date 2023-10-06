import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
import { it } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import * as exports from "../src/utils/useProducts";
import {
  mockedProduct1,
  mockedProduct2,
  mockedProduct3,
} from "../src/utils/mockedProducts";

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

const useProductsSpy = vi
  .spyOn(exports, "useProducts")
  .mockImplementation((category: string | null) => {
    return {
      products: category
        ? [mockedProduct1, mockedProduct2, mockedProduct3].filter(
            (p) => p.category === category
          )
        : [mockedProduct1, mockedProduct2, mockedProduct3],
      error: null,
      loading: false,
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

it("Show the products fetched", async () => {
  setup(["laptops", "smartphones"]);

  expect(
    await screen.findByRole("heading", {
      name: /Product1/i,
    })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("heading", {
      name: /Product2/i,
    })
  );

  expect(
    screen.getByRole("heading", {
      name: /Product3/i,
    })
  );

  // List of all products found on screen
  const allProducts = screen.getAllByRole("heading", {
    name: /product/i,
  });

  expect(allProducts).toHaveLength(3);
});

it("Filter products by category", async () => {
  const user = setup(["laptops", "smartphones"]);

  const categorySelectionInput = await screen.findByRole("button", {
    name: /filter by category/i,
  });

  // Filter by laptops category
  await user.click(categorySelectionInput);
  await user.click(
    screen.getByRole("option", {
      name: /laptops/i,
    })
  );

  let allProducts = await screen.findAllByRole("heading", {
    name: /product/i,
  });
  expect(allProducts).toHaveLength(2);
  expect(useProductsSpy).toHaveBeenLastCalledWith("laptops");

  // Filter by smarphotnes category
  await user.click(categorySelectionInput);
  await user.click(
    screen.getByRole("option", {
      name: /smartphones/i,
    })
  );

  allProducts = await screen.findAllByRole("heading", {
    name: /product/i,
  });
  expect(allProducts).toHaveLength(1);
  expect(useProductsSpy).toHaveBeenLastCalledWith("smartphones");

  // Remove filter
  await user.click(categorySelectionInput);
  await user.click(
    screen.getByRole("option", {
      name: /smartphones/i,
    })
  );

  allProducts = await screen.findAllByRole("heading", {
    name: /product/i,
  });
  expect(allProducts).toHaveLength(3);
  expect(useProductsSpy).toHaveBeenLastCalledWith(null);
});

it("Renders sort selector input", async () => {
  const user = setup([]);

  const sortSelectionInput = await screen.findByRole("button", {
    name: /sort by/i,
  });

  await user.click(sortSelectionInput);

  expect(
    screen.getByRole("option", {
      name: /price/i,
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("option", {
      name: /discount/i,
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("option", {
      name: /rating/i,
    })
  ).toBeInTheDocument();
});
