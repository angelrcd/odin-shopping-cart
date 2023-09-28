import { render, screen, within } from "@testing-library/react";
import { expect } from "vitest";
import { it } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Nav from "../src/components/Nav";
import { Outlet } from "react-router-dom";

// Renders page and returns userEvent, you can optionally pass the number of items the cart contains
function setup(itemsInCart = 0) {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: (
          <>
            <Nav cartSize={itemsInCart}></Nav>
            <Outlet></Outlet>
          </>
        ),
        children: [
          { index: true, element: <h2>Home</h2> },
          { path: "/shop", element: <h2>Shop</h2> },
          { path: "/cart", element: <h2>Cart</h2> },
        ],
      },
    ],
    {
      initialEntries: ["/"],
    }
  );

  const user = userEvent.setup();
  render(<RouterProvider router={router} />);
  return user;
}

it("Start at home", () => {
  setup();

  expect(
    screen.getByRole("heading", {
      name: "Home",
    })
  ).toBeInTheDocument();

  expect(
    screen.queryByRole("heading", {
      name: "Shop",
    })
  ).not.toBeInTheDocument();
});

it("Move to shop", async () => {
  const user = setup();

  await user.click(
    screen.getByRole("link", {
      name: /shop/i,
    })
  );

  expect(
    screen.getByRole("heading", {
      name: "Shop",
    })
  ).toBeInTheDocument();
});

it("Move to cart", async () => {
  const user = setup();

  await user.click(
    screen.getByRole("link", {
      name: /cart/i,
    })
  );

  expect(
    screen.getByRole("heading", {
      name: "Cart",
    })
  ).toBeInTheDocument();
});

it("Return to home", async () => {
  const user = setup();

  await user.click(
    screen.getByRole("link", {
      name: /shop/i,
    })
  );

  expect(
    screen.queryByRole("heading", {
      name: "Home",
    })
  ).not.toBeInTheDocument();

  await user.click(
    screen.getByRole("link", {
      name: /home/i,
    })
  );

  expect(
    screen.getByRole("heading", {
      name: "Home",
    })
  ).toBeInTheDocument();
});

it("Cart shows it's empty", () => {
  setup();

  const cartLink = screen.getByRole("link", {
    name: /cart/i,
  });

  expect(within(cartLink).getByTestId("Items in cart")).toHaveTextContent("0");
});

it("Cart shows the nums of items it contains", () => {
  setup(52);

  const cartLink = screen.getByRole("link", {
    name: /cart/i,
  });

  expect(within(cartLink).getByTestId("Items in cart")).toHaveTextContent("52");
});
