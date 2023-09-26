import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
import { describe, it } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import App from "../src/App";
import Home from "../src/routes/Home";
import Shop from "../src/routes/Shop";
import Cart from "../src/routes/Cart";

// Provide route where the app is at at render
function setup(initialRoute: `/${string}`) {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <App />,
        children: [
          { index: true, element: <Home /> },
          { path: "/shop", element: <Shop /> },
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

describe("App", () => {
  it("renders hero text", () => {
    setup("/");

    expect(screen.getByText("This store is really cool!")).toBeInTheDocument();
  });
});
