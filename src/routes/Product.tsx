import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../App";
import { Product } from "../vite-env";
import { Image, Chip } from "@nextui-org/react";
import ProductQuantifier from "../components/ProductQuantifier";
import { useState } from "react";

export default function Product() {
  const [imgageInView, setImageInView] = useState(0);
  const { addProductToCart, removeProductFromCart, ammountInCart } = useCart();
  const navigate = useNavigate();
  const product = useLoaderData() as Product;
  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    brand,
    category,
    images,
  } = product;

  const amountOfProductInCard = ammountInCart(product);

  return (
    <main className="mx-auto max-w-[1024px] px-6">
      <button
        tabIndex={0}
        className="mb-4 cursor-pointer text-default-500 underline transition-transform before:content-['<<'] hover:translate-x-2"
        onClick={() => navigate(-1)}>
        Go back
      </button>
      <div className="flex flex-wrap gap-4">
        <div className="flex gap-1 md:flex-col">
          {images.map((image, index) => (
            <button onClick={() => setImageInView(index)}>
              <Image
                radius="none"
                className={
                  index === imgageInView ? "border-1 border-black p-1" : ""
                }
                width={100}
                alt="NextUI hero Image"
                src={image}
              />
            </button>
          ))}
        </div>
        <div>
          <Chip color="default" className="relative left-5 top-10 z-50">
            {imgageInView + 1} / {images.length}
          </Chip>
          <Image
            isZoomed
            width={300}
            alt="NextUI hero Image"
            src={images[imgageInView]}
          />
        </div>
      </div>
      <small className="text-default-500">{category}</small>
      <h2 className="text-2xl font-bold">
        {brand} - {title}
      </h2>
      <p>{description}</p>
      <p>Rating: {rating}</p>
      <div className="mb-4 flex items-center gap-4">
        <p className="text-xl font-semibold text-primary-500">${price}</p>
        <p className="text-default-500 line-through">
          ${(price * (1 + discountPercentage / 100)).toFixed(2)}
        </p>
        <p className="text-primary-500">-{discountPercentage}%</p>
      </div>
      <ProductQuantifier
        onProductAdd={() => addProductToCart(product)}
        onProductRemove={() => removeProductFromCart(product)}
        productAmount={amountOfProductInCard}
      />
    </main>
  );
}
