import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./routes/Home";
import Shop from "./routes/Shop";
import Product from "./routes/Product";
import Cart from "./routes/Cart";
import "./index.css";
import { categoryLoader } from "./utils/categoryLoader";
import { productLoader } from "./utils/productLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "/shop", element: <Shop />, loader: categoryLoader },
      {
        path: "/shop/:id",
        element: <Product />,
        loader: ({ params }) => productLoader(params.id),
      },
      { path: "/cart", element: <Cart /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </React.StrictMode>
);
