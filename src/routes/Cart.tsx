import { useCart } from "../App";

export default function Cart() {
  const { cart } = useCart();
  return <div>{JSON.stringify(cart)}</div>;
}
