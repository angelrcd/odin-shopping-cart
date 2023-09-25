import { useState } from "react";
import Nav from "./components/Nav";
import { Outlet } from "react-router-dom";

export default function App() {
  const [cart, setCart] = useState([]);
  return (
    <>
      <Nav cartSize={cart.length} />
      <Outlet />
    </>
  );
}
