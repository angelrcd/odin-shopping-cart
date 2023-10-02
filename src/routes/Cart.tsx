import { useCart } from "../App";
import { useMemo } from "react";
import * as _ from "lodash";
import {
  Button,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart } = useCart();
  const [totalPrice, cartGrouped] = useMemo(() => {
    return [
      cart.reduce((acc, current) => acc + current.price, 0),
      _.groupBy(cart, "id"),
    ];
  }, [cart]);

  const rows = Object.values(cartGrouped).map((productGroup) => {
    return {
      key: productGroup[0].id.toString(),
      name: (
        <Link className="underline" to={`/shop/${productGroup[0].id}`}>
          {productGroup[0].title}
        </Link>
      ),
      amount: productGroup.length.toString(),
      price: "$" + productGroup[0].price,
    };
  });

  // Add last row for total price if the cart is not empty
  rows.length > 0 &&
    rows.push({
      key: "total",
      name: <></>,
      amount: "",
      price: "$" + totalPrice,
    });

  const columns = [
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "amount",
      label: "AMOUNT",
    },
    {
      key: "price",
      label: "PRICE",
    },
  ];

  return (
    <main className="mx-auto max-w-[1024px] px-6">
      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"Cart is empty."} items={rows}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell
                  className={
                    item.key === "total" && columnKey === "price"
                      ? "rounded-lg bg-default-100"
                      : ""
                  }>
                  {getKeyValue(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-end">
        <Button
          size="lg"
          radius="full"
          className="mt-2 w-fit bg-gradient-to-tr from-primary-200 to-primary-600  font-semibold uppercase text-white shadow-lg hover:scale-110">
          checkout
        </Button>
      </div>
    </main>
  );
}
