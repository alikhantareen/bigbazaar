import React, { useState } from "react";
import { Link } from "react-router-dom";
import useCartStore from "../store";

function CartScreen() {
  const cartItems = useCartStore((state: any) => state.cart);
  const removeItem = useCartStore((state: any) => state.removeFromCart);
  function subTotal(): any {
    let total: number = 0;
    cartItems.forEach((element: product) => {
      total += (parseInt(element.price) * element.quantity);
    });
    return total;
  }
  type product = {
    _id: number;
    id: number;
    title: string;
    price: string;
    description: string;
    category: string;
    image: string;
    quantity: number,
    rating: {
      rate: number;
      count: number;
    };
  };
  return (
    <>
      <div>
        <div
          className="w-full h-full bg-black bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0"
          id="chec-div"
        >
          <div
            className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700"
            id="checkout"
          >
            <div className="flex md:flex-row flex-col justify-end" id="cart">
              <div
                className="lg:w-1/2 w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen"
                id="scroll"
              >
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
                <p className="text-5xl font-black leading-10 text-rose-600 pt-3">
                  Cart
                </p>
                {cartItems.map((elem: product) => {
                  return (
                    <div className="md:flex items-center mt-14 py-8 border-t border-gray-200">
                      <div className="w-1/4">
                        <img
                          src={elem.image}
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="md:pl-3 md:w-3/4">
                        <div className="flex items-center justify-between w-full pt-1">
                          <p className="text-base font-black leading-none text-gray-800">
                            {elem.title}
                          </p>
                          <select className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none">
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                          </select>
                        </div>
                        <p className="text-xs leading-3 text-gray-600 pt-2">
                          Category: {elem.category}
                        </p>
                        <p className="text-xs leading-3 text-gray-600 py-4">
                          Ratings: {elem.rating.rate}
                        </p>
                        <p className="w-96 text-xs leading-3 text-gray-600">
                        Qty: {elem.quantity}
                        </p>
                        <div className="flex items-center justify-between pt-5 pr-6">
                          <div className="flex itemms-center">
                            <p onClick={() => removeItem(elem.id)} className="text-xs leading-3 underline text-red-500 cursor-pointer">
                              Remove
                            </p>
                          </div>
                          <p className="text-base font-black leading-none text-gray-800">
                            ${parseInt(elem.price) * elem.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="xl:w-1/2 md:w-1/3 w-full bg-gray-100 h-full">
                <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
                  <div>
                    <p className="text-4xl font-black leading-9 text-rose-600">
                      Summary
                    </p>
                    <div className="flex items-center justify-between pt-16">
                      <p className="text-base leading-none text-gray-800">
                        Subtotal
                      </p>
                      <p className="text-base leading-none text-gray-800">
                        ${subTotal()}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-5">
                      <p className="text-base leading-none text-gray-800">
                        Shipping
                      </p>
                      <p className="text-base leading-none text-gray-800">
                        $30
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                      <p className="text-2xl leading-normal text-gray-800">
                        Total
                      </p>
                      <p className="text-2xl font-bold leading-normal text-right text-gray-800">
                        ${subTotal() + 30}
                      </p>
                    </div>
                    <button className="text-base leading-none w-full btn btn-primary text-white">
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {` /* width */
                #scroll::-webkit-scrollbar {
                    width: 1px;
                }

                /* Track */
                #scroll::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }

                /* Handle */
                #scroll::-webkit-scrollbar-thumb {
                    background: rgb(133, 132, 132);
                }
`}
      </style>
    </>
  );
}

export default CartScreen;
