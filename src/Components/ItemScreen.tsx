import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Header from "./Header";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import useCartStore from "../store";

const ItemScreen = () => {
  const [count, setCount] = useState(1);
  const [showAlert, setAlert] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const addToCart = useCartStore((state: any) => state.addToCart);
  const cart = useCartStore((state: any) => state.cart);

  const addCount = () => {
    setCount((prev) => prev + 1);
  };

  const minusCount = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  };

  function addOrder() {
    setAlert(false);
    if (localStorage.getItem("token")) {
      let flag = false;
      let item_to_insert = { ...data, quantity: count };
      cart.forEach((elem: any) => {
        if (elem.id === item_to_insert.id) {
          elem.quantity += item_to_insert.quantity;
          flag = true;
        }
      });
      if (flag) {
        setAlert(true);
        return;
      }
      addToCart(item_to_insert);
      setAlert(true);
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
        <div className="w-full flex justify-center">
          <div
            className={`${
              showAlert ? "block" : "hidden"
            } alert alert-success w-96`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Item has been added to the cart!</span>
          </div>
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 ">
            <div className="flex items-center text-gray-500 hover:text-gray-600 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-chevron-left"
                width={16}
                height={16}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <polyline points="15 6 9 12 15 18" />
              </svg>
              <Link to={"/"} className="text-sm pl-2 leading-none">
                Back
              </Link>
            </div>
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
