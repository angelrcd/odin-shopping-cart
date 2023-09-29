import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { Card } from "@nextui-org/react";

export default function Home() {
  const navigate = useNavigate();
  return (
    <main className="absolute top-0 h-screen w-full bg-[url('/background.jpg')] bg-cover bg-right">
      <div className="mx-auto max-w-[1024px] px-6">
        <Card
          isBlurred
          className="mt-72 max-w-[610px] border-none bg-background/60 p-8 dark:bg-default-100/50">
          <h2 className=" text-4xl font-extrabold text-default-700">
            This store is really cool!
          </h2>
          <Button
            onClick={() => navigate("/shop")}
            size="lg"
            radius="full"
            className="mt-8 w-fit bg-gradient-to-tr from-primary-200 to-primary-600 font-semibold uppercase text-white shadow-lg hover:scale-110">
            See products
          </Button>
        </Card>
      </div>
    </main>
  );
}
