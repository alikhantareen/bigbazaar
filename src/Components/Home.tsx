import { useQuery } from "@tanstack/react-query";
import Header from "./Header";
import axios from "axios";
import { useState } from "react";

const Home = () => {
  type elem = {
    id: number;
    title: string;
    price: string;
    description: string;
    category: string;
    image: string;
  };
  const [page, setPage] = useState(1);
  const [previousDisable, setPreviousDisable] = useState(true);
  const [nextDisable, setNextDisable] = useState(false);
  const { isLoading, isError, data } = useQuery({
    queryKey: ["products", page],
    queryFn: () => getProducts(page),
  });
  async function getProducts(page = 1) {
    const res = await axios.get(`http://localhost:5050/products?page=${page}`);
    const data = await res.data;
    return data;
  }
  function nextPage() {
    setPreviousDisable(false);
    setNextDisable(true);
    setPage((pre) => pre + 1);
  }
  function previousPage() {
    setNextDisable(false);
    setPreviousDisable(true);
    setPage((pre) => pre - 1);
  }
  return (
    <>
      <Header />
      <main className="p-4">
        {/* products */}
        <p className="text-4xl md:text-6xl underline font-bold w-full text-center mb-4">
          Our Products
        </p>
        <section className="flex flex-wrap justify-around p-4 gap-4">
          {isLoading ? (
            <p>Loading</p>
          ) : isError ? (
            <p>{JSON.stringify(isError)}</p>
          ) : (
            data.map((elem: elem, index: number) => {
              return (
                <div
                  key={index}
                  className="card w-96 bg-base-100 shadow-xl image-full"
                >
                  <figure className="">
                    <img src={elem.image} alt="Shoes" className="w-60 h-40" />
                  </figure>
                  <div className="card-body flex flex-col justify-end">
                    <h2 className="card-title">{elem.title}</h2>
                    <div className="card-actions justify-end">
                      <button className="btn btn-primary">Buy Now</button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </section>
        <section className="mt-10">
          <div className="w-full flex justify-center">
            <div className="join grid grid-cols-2 w-full md:w-1/4">
              <button
                onClick={previousPage}
                className="join-item btn btn-outline"
                disabled={previousDisable}
              >
                Previous page
              </button>
              <button
                onClick={nextPage}
                className="join-item btn btn-outline"
                disabled={nextDisable}
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

// onClick={() => setPage((pre) => pre - 1)}

export default Home;
