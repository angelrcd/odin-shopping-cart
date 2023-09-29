import { Button, ButtonGroup } from "@nextui-org/react";
import { Tooltip } from "@nextui-org/react";

interface Props {
  onProductAdd: () => void;
  onProductRemove: () => void;
  productAmount: number;
}

export default function ProductQuantifier({
  onProductAdd,
  onProductRemove,
  productAmount,
}: Props) {
  return (
    <ButtonGroup>
      <Tooltip content="Remove product from cart">
        <Button isDisabled={productAmount === 0} onPress={onProductRemove}>
          -
        </Button>
      </Tooltip>
      <div className="px-4">{productAmount}</div>
      <Tooltip content="Add product to cart">
        <Button onPress={onProductAdd}>+</Button>
      </Tooltip>
    </ButtonGroup>
  );
}
