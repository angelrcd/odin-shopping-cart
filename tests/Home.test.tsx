import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
import { it } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Home from "../src/routes/Home";

function setup() {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <h2>Shop</h2>,
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

it("Home display lema text", () => {
  setup();
  expect(
    screen.getByText(
      "Unleash Your Shopping Desires, Explore Endless Possibilities!"
    )
  ).toBeInTheDocument();
});

it("Action button redirects you to /shop", async () => {
  const user = setup();
  await user.click(
    screen.getByRole("button", {
      name: /see products/i,
    })
  );

  expect(
    screen.getByRole("heading", {
      name: "Shop",
    })
  ).toBeInTheDocument();
});
