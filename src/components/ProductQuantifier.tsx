import { Button, ButtonGroup } from "@nextui-org/react";

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
      <Button isDisabled={productAmount === 0} onPress={onProductRemove}>
        -
      </Button>
      <div className="px-4">Cart {productAmount}</div>
      <Button onPress={onProductAdd}>+</Button>
    </ButtonGroup>
  );
}
