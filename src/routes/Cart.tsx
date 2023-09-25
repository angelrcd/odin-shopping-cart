import { useCart } from "../App";

export default function Cart() {
  const { cart, setCart } = useCart();
  return <div>{JSON.stringify(cart)}</div>;
}
