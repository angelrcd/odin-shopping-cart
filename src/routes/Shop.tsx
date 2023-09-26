import { useLoaderData } from "react-router-dom";
import { Category } from "../vite-env";
import { Select, SelectItem } from "@nextui-org/react";
import { useProducts } from "../utils/useProducts";
import { Spinner } from "@nextui-org/react";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categories = useLoaderData() as Category[];
  const categoryFilter = searchParams.get("category");
  const sortBySelection = searchParams.get("sort");
  const { products, error, loading } = useProducts(categoryFilter);

  if (error) {
    return <p>Unexpected error</p>;
  }

  return (
    <main className="mx-auto max-w-[1024px] px-6">
      <h2>Shop</h2>
      <div className="mb-6 flex flex-wrap gap-4">
        <Select
          selectedKeys={categoryFilter ? [categoryFilter] : undefined}
          showScrollIndicators={true}
          label="Filter by category"
          className="max-w-xs"
          onChange={(e) => {
            console.log(e.target.value);

            if (e.target.value) {
              searchParams.set("category", e.target.value);
              setSearchParams(searchParams);
            } else {
              searchParams.delete("category");
              setSearchParams(searchParams);
            }
          }}>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category[0].toLocaleUpperCase() + category.slice(1)}
            </SelectItem>
          ))}
        </Select>

        <Select
          selectedKeys={sortBySelection ? [sortBySelection] : undefined}
          label="Sort by"
          className="max-w-xs"
          onChange={(e) => {
            console.log(e.target.value);

            if (e.target.value) {
              searchParams.set("sort", e.target.value);
              setSearchParams(searchParams);
            } else {
              searchParams.delete("sort");
              setSearchParams(searchParams);
            }
          }}>
          <SelectItem key="price" value="price">
            Price
          </SelectItem>
          <SelectItem key="discountPercentage" value="discountPercentage">
            Discount
          </SelectItem>
          <SelectItem key="rating" value="rating">
            Rating
          </SelectItem>
        </Select>

        {loading && <Spinner className="ml-4" />}
      </div>
      <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3">
        {products.length > 0 &&
          products
            .sort((a, b) => {
              if (sortBySelection === "") return 0;
              return a[sortBySelection] - b[sortBySelection];
            })
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </main>
  );
}
