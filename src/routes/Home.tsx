import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <main>
      <h2>This store is really cool!</h2>
      <Button onClick={() => navigate("/shop")} color="primary">
        See products
      </Button>
    </main>
  );
}
