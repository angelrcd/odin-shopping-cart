import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { Card } from "@nextui-org/react";
import GithubIcon from "../components/GithubIcon";

export default function Home() {
  const navigate = useNavigate();
  return (
    <main className="mx-auto max-w-[1024px] px-6">
      <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2">
        <div className="shrink-0 md:w-1/2">
          <h2 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 dark:text-white lg:text-4xl lg:leading-tight xl:text-5xl xl:leading-tight">
            Unleash Your Shopping Desires, Explore Endless Possibilities!
          </h2>
          <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl">
            Welcome to our one-stop destination for all your shopping needs!
            ssFrom cutting-edge electronics to the latest fashion trends, we
            have it all.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button onPress={() => navigate("/shop")} size="lg" color="primary">
              See products
            </Button>
            <Button startContent={<GithubIcon />} size="lg">
              <a href="">View on Github</a>
            </Button>
          </div>
        </div>
        <img
          className="shrink-0 px-0  xs:px-0 sm:px-32 md:w-1/2 md:px-0"
          src="/hero.png"
          alt=""
        />
      </div>
    </main>
  );
}
