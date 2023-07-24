import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Header from "./Header";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import useCartStore from "../store";

const ItemScreen = () => {
  const [count, setCount] = useState(1);
  const navigate = useNavigate();
  const { id } = useParams();

  const addToCart = useCartStore((state: any) => state.addToCart);

  const addCount = () => {
    setCount((prev) => prev + 1);
  };

  const minusCount = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  };

  function addOrder() {
    if (localStorage.getItem("token")) {
      addToCart({...data, quantity: count});
      return;
    }
    localStorage.setItem("link", id!);
    navigate(`/login`);
  }

  type product = {
    _id: number;
    id: number;
    title: string;
    price: string;
    description: string;
    category: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  };
  async function get_product(product_id: any) {
    const res = await axios.get(`http://localhost:5050/product/${product_id}`);
    const data: product = await res.data;
    return data;
  }
  const { isLoading, data } = useQuery({
    queryKey: ["product", id],
    queryFn: () => get_product(id),
  });
  return (
    <>
      <Header />
      <main className="w-full">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 ">
            <div className="flex justify-center items-center lg:flex-row flex-col gap-16">
              {/* <!-- Description Div --> */}

              <div className="  w-full sm:w-96 md:w-8/12 lg:w-6/12 items-center">
                <p className=" focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-600">
                  {`Home / ${data?.category}`}
                </p>
                <h2 className="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 mt-4">
                  {data?.title}
                </h2>

                <div className=" flex flex-row justify-between  mt-5">
                  <div className=" flex flex-row space-x-3">
                    <p className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-700 hover:underline hover:text-gray-800 duration-100 cursor-pointer">
                      {data?.rating.rate} Ratings
                    </p>
                  </div>
                  <p className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-700 hover:underline hover:text-gray-800 duration-100 cursor-pointer">
                    {data?.rating.count} Reviews
                  </p>
                </div>

                <p className=" font-normal text-base leading-6 text-gray-600 mt-7">
                  {data?.description}
                </p>
                <p className=" font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 mt-6 ">
                  $ {data?.price}
                </p>

                <div className="flex flex-row justify-between mt-10">
                  <p className=" font-medium text-base leading-4 text-gray-600">
                    Select quantity
                  </p>
                  <div className="flex">
                    <span
                      onClick={minusCount}
                      className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer border border-gray-300 border-r-0 w-7 h-7 flex items-center justify-center pb-1"
                    >
                      -
                    </span>
                    <input
                      id="counter"
                      aria-label="input"
                      className="border border-gray-300 h-full text-center w-14 pb-1"
                      type="text"
                      value={count}
                      onChange={(e) => e.target.value}
                    />
                    <span
                      onClick={addCount}
                      className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer border border-gray-300 border-l-0 w-7 h-7 flex items-center justify-center pb-1 "
                    >
                      +
                    </span>
                  </div>
                </div>

                <button
                  onClick={addOrder}
                  className="btn btn-primary font-medium text-base leading-4 text-white w-full mt-10"
                >
                  Add to shopping bag
                </button>
              </div>

              {/* <!-- Preview Images Div For larger Screen--> */}

              <div className=" w-full sm:w-96 md:w-8/12  lg:w-6/12 flex justify-center lg:flex-row flex-col lg:gap-8 sm:gap-6 gap-4">
                <div className=" w-full lg:w-8/12 bg-gray-100 flex justify-center items-center">
                  <img src={data?.image} alt={data?.title} />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default ItemScreen;
