import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <main className="absolute top-0 h-screen w-full bg-[url('/background.jpg')] bg-cover bg-right">
      <div className="mx-auto max-w-[1024px] px-6">
        <h2 className="mt-36 text-4xl font-extrabold text-default-50">
          This store is really cool!
        </h2>
        <Button
          onClick={() => navigate("/shop")}
          size="lg"
          radius="full"
          className="bg-gradient-to-tr from-primary-200 to-primary-600 font-semibold text-white shadow-lg">
          See products
        </Button>
      </div>
    </main>
  );
}
