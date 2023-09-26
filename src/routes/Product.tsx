import { useLoaderData, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Product() {
  const navigate = useNavigate();
  const product = useLoaderData();
  const { id } = useParams();
  console.log(id);

  return (
    <>
      <a tabIndex={0} className="cursor-pointer" onClick={() => navigate(-1)}>
        Go back
      </a>
      <p>{JSON.stringify(product)}</p>
    </>
  );
}
