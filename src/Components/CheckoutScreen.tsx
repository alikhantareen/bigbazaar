import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCartStore from "../store";
import axios from "axios";

const CheckoutScreen = () => {
  const navigate = useNavigate();
  const cartItems = useCartStore((state: any) => state.cart);
  const payment_method = ["Pay through card", "Cash on delivery"];
  const [menu, setMenu] = useState(false);
  const [showCardInfo, setShowCardInfo] = useState(true);
  const [method, setMethod] = useState("Cash on delivery");
  const [error, setError] = useState("");

  const changeText = (e: any) => {
    setMenu(false);
    setMethod(e.target.textContent);
    if (method === "Pay through card") {
      setShowCardInfo(true);
    } else {
      setShowCardInfo(false);
    }
  };

  function build_data() {
    let name = (document.getElementById("name") as HTMLInputElement).value;
    let mobile_number = (
      document.getElementById("mobile_number") as HTMLInputElement
    ).value;
    let address = (document.getElementById("address") as HTMLInputElement)
      .value;

    if (!name || !mobile_number || !address) {
      return false;
    }
    let order_arrays: any = [];

    cartItems.forEach((elem: any) => {
      let obj = {
        ...elem
      }
      delete obj._id;
      delete obj.id;
      order_arrays.push({
        ...obj,
        name: (document.getElementById("name") as HTMLInputElement).value,
        mobile_number: (
          document.getElementById("mobile_number") as HTMLInputElement
        ).value,
        address: (document.getElementById("address") as HTMLInputElement).value,
        pending: true,
        payment_method: method,
        user: localStorage.getItem("user_id"),
      });
    });
    

    return order_arrays;
  }

  async function placeOrder() {
    let orders = build_data();
    if (!orders) return setError("Please fill all the fields.");
    const res = await axios.post(`http://localhost:5050/placeOrder`, orders);    
    const data = await res.data;
    if (data) {
      navigate(`/thankyou`);
    }
  }

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex justify-center items-center p-8 -mt-14">
      <div className="py-16 px-4 md:px-6 2xl:px-0 flex justify-center items-center 2xl:mx-auto 2xl:container">
        <div className="flex flex-col justify-start items-start w-full space-y-9">
          <div className="flex justify-start flex-col items-start space-y-2">
            <button className="flex flex-row items-center text-gray-600 hover:text-gray-500 space-x-1">
              <svg
                className="fill-stroke"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.91681 7H11.0835"
                  stroke="currentColor"
                  strokeWidth="0.666667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.91681 7L5.25014 9.33333"
                  stroke="currentColor"
                  strokeWidth="0.666667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.91681 7.00002L5.25014 4.66669"
                  stroke="currentColor"
                  strokeWidth="0.666667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Link to={`/cart`} className="text-sm leading-none">
                Back
              </Link>
            </button>
            <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-rose-600">
              Checkout
            </p>
            <p className="text-base leading-normal sm:leading-4 text-gray-600">
              Home {">"} Product {">"} Cart {">"} Checkout
            </p>
          </div>

          <div className="flex flex-col xl:flex-row justify-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-6 w-full">
            <div className="flex flex-col sm:flex-row xl:flex-col justify-center items-center bg-gray-100 py-7 sm:py-0 xl:py-10 px-10 xl:w-full">
              <div className="flex flex-col justify-start items-start w-full space-y-4">
                <p className="text-xl md:text-2xl leading-normal text-gray-800">
                  Coming Soon
                </p>
                <p className="text-base font-semibold leading-none text-gray-600">
                  Logitech K251
                </p>
              </div>
              <div className="mt-6 sm:mt-0 xl:my-10 xl:px-20 w-52 sm:w-96 xl:w-auto">
                <img
                  src="https://i.ibb.co/0GFzTP4/Rectangle-131.png"
                  alt="headphones"
                />
              </div>
            </div>

            <div className="p-8 bg-gray-100 flex flex-col lg:w-full xl:w-3/5">
              <div className="mt-8">
                <p className="text-rose-600 text-2xl">Shipping Details</p>
              </div>
              <label className="mt-8 text-base leading-4 text-gray-800">
                Payment Method
              </label>
              <div className="mt-2 flex-col">
                <div className="relative">
                  <button className="text-left border rounded-tr rounded-tl border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600 bg-white">
                    {method}
                  </button>
                  <svg
                    onClick={() => setMenu(!menu)}
                    className={
                      "transform  cursor-pointer absolute top-4 right-4 " +
                      (menu ? "rotate-180" : "")
                    }
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.5 5.75L8 10.25L12.5 5.75"
                      stroke="#27272A"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div
                    className={
                      "mt-1 absolute z-10 w-full flex bg-gray-50 justify-start flex-col text-gray-600 " +
                      (menu ? "block" : "hidden")
                    }
                  >
                    {payment_method.map((payMethod) => (
                      <div
                        key={payMethod}
                        className="cursor-pointer hover:bg-gray-800 hover:text-white px-4 py-2"
                        onClick={changeText}
                      >
                        {payMethod}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {showCardInfo ? (
                <>
                  <div className="mt-8">
                    <p className="text-red-600 font-semibold text-center mb-2">
                      {error}
                    </p>
                    <input
                      id="name"
                      className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                      type="text"
                      placeholder="Full Name"
                    />
                  </div>

                  <div className="mt-8">
                    <input
                      id="mobile_number"
                      className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                      type="number"
                      placeholder="Mobile Number"
                    />
                  </div>

                  <div className="mt-8">
                    <input
                      id="address"
                      className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                      type="text"
                      placeholder="Address"
                    />
                  </div>

                  <button
                    onClick={placeOrder}
                    className="btn btn-primary rounded w-full mt-6"
                  >
                    <div>
                      <p className="text-base leading-4">Place Order</p>
                    </div>
                  </button>
                </>
              ) : (
                ""
              )}

              {!showCardInfo ? (
                <>
                  <label className="mt-8 text-base leading-4 text-gray-800">
                    Card details
                  </label>
                  <div className="mt-2 flex-col">
                    <div>
                      <input
                        className="border rounded-tl rounded-tr border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                        type="number"
                        placeholder="0000 1234 6549 15151"
                      />
                    </div>
                    <div className="flex-row flex">
                      <input
                        className="border rounded-bl border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                        type="text"
                        placeholder="MM/YY"
                      />
                      <input
                        className="border rounded-br border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                        type="number"
                        placeholder="CVC"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex-col">
                    <div>
                      <input
                        className="border rounded border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                        type="email"
                        placeholder="Full Name"
                      />
                    </div>
                  </div>

                  <div className="mt-8">
                    <input
                      id="monile_number"
                      className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                      type="number"
                      placeholder="Mobile Number"
                    />
                  </div>

                  <div className="mt-8">
                    <input
                      id="address"
                      className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                      type="text"
                      placeholder="Address"
                    />
                  </div>

                  <button className="mt-8 btn btn-primary rounded w-full" disabled={true}>
                    <div>
                      <p className="text-base leading-4">Coming soon</p>
                    </div>
                  </button>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutScreen;

{
  /* <div className="flex flex-row justify-center items-center mt-6">
                <hr className="border w-full" />
                <p className="flex flex-shrink-0 px-4 text-base leading-4 text-gray-600">
                  OR
                </p>
                <hr className="border w-full" />
              </div> */
}
