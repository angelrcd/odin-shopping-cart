import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../App";
import { Product } from "../vite-env";
import ProductQuantifier from "../components/ProductQuantifier";

export default function Product() {
  const { addProductToCart, removeProductFromCart, ammountInCart } = useCart();
  const navigate = useNavigate();
  const product = useLoaderData() as Product;

  const amountOfProductInCard = ammountInCart(product);

  return (
    <>
      <a tabIndex={0} className="cursor-pointer" onClick={() => navigate(-1)}>
        Go back
      </a>
      <p>{JSON.stringify(product)}</p>
      <ProductQuantifier
        onProductAdd={() => addProductToCart(product)}
        onProductRemove={() => removeProductFromCart(product)}
        productAmount={amountOfProductInCard}
      />
    </>
  );
}
