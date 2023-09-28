import { render, screen, waitFor } from "@testing-library/react";
import { expect } from "vitest";
import { describe, it } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import App from "../src/App";
import Home from "../src/routes/Home";
import Shop from "../src/routes/Shop";
import Cart from "../src/routes/Cart";

const mockCategories = ["smartphones, laptops"];

// Provide route where the app is at at render
function setup(initialRoute: `/${string}`) {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <App />,
        children: [
          { index: true, element: <Home /> },
          {
            path: "/shop",
            element: <Shop />,
            loader: () => Promise.resolve(mockCategories),
          },
          { path: "/cart", element: <Cart /> },
        ],
      },
    ],
    {
      initialEntries: [initialRoute],
    }
  );

  render(<RouterProvider router={router} />);
}

describe("Home route", () => {
  it("Renders hero text", () => {
    setup("/");

    expect(screen.getByText("This store is really cool!")).toBeInTheDocument();
  });

  it("Redirects you to shop route when clicking button", async () => {
    const user = userEvent.setup();
    setup("/");
    await user.click(screen.getByRole("button", { name: "See products" }));
    await screen.findByRole("heading", { name: /shop/i });
  });
});
