import { Product } from "../vite-env";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Chip,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const navigate = useNavigate();
  const { id, title, price, category, thumbnail, discountPercentage, rating } =
    product;
  return (
    <Card
      onPress={() => navigate(id.toString())}
      fullWidth={true}
      isPressable={true}
      className="py-4 hover:scale-105">
      <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
        <small className="text-default-500">
          {category[0].toLocaleUpperCase() + category.slice(1)}
        </small>
        <h4 className="text-large font-bold">{title}</h4>
      </CardHeader>
      <CardBody className="justify-center overflow-visible py-2">
        <Image
          alt="Card background"
          className="rounded-xl object-cover"
          src={thumbnail}
          width={270}
        />
        <Chip radius="sm" color="primary" className="relative bottom-7 z-50">
          -{discountPercentage}%
        </Chip>
      </CardBody>
      <CardFooter className="flex justify-between">
        <div className="flex items-center gap-4">
          <p className="text-lg font-semibold text-primary-500">${price}</p>
          <p className="text-default-500 line-through">
            ${(price * (1 + discountPercentage / 100)).toFixed(2)}
          </p>
        </div>
        <p>Rating: {rating.toFixed(2)}</p>
      </CardFooter>
    </Card>
  );
}
