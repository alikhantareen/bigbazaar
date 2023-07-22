import { useQuery } from "@tanstack/react-query";
import Header from "./Header";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  type elem = {
    _id: number;
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
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1544441893-675973e31985?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-800 to-rose-500">BIGBAZAAR</span></h1>
            <p className="mb-5">
              "Discover Limitless Shopping Delights: Unleash Your E-commerce
              Adventure!"
            </p>
            <a href="#products">
              <button className="btn btn-primary">View Products</button>
            </a>
          </div>
        </div>
      </div>
      <div id="products" className="bg-gradient-to-r from-rose-800 to-rose-500 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold text-white mb-6">
              Explore Our Stunning Collection
            </h1>
            <p className="text-white text-lg">
              Discover the finest products curated just for you.
            </p>
          </div>
        </div>
      </div>
      <main className="p-4">
        {/* products */}
        <section className="flex flex-wrap justify-around p-4 gap-4">
          {isLoading ? (
            <p>Loading</p>
          ) : isError ? (
            <p>{JSON.stringify(isError)}</p>
          ) : (
            data.map((elem: elem, index: number) => {
              return (
                <div
                  key={elem.id}
                  className="card w-96 bg-base-100 shadow-xl image-full"
                >
                  <figure className="">
                    <img src={elem.image} alt="Shoes" className="w-60 h-40" />
                  </figure>
                  <div className="card-body flex flex-col justify-end">
                    <h2 className="card-title">{elem.title}</h2>
                    <Link
                      to={`/product/${elem._id}`}
                      className="card-actions justify-end"
                    >
                      <button className="btn btn-primary">Buy Now</button>
                    </Link>
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
