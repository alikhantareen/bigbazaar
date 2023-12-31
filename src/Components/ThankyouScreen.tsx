import { useNavigate } from "react-router-dom";
import useCartStore from "../store";
import { useEffect } from "react";

const ThankyouScreen = () => {
  const cartItems = useCartStore((state: any) => state.cart);
  const navigate = useNavigate();
  function navigator() {
    while (cartItems.length !== 0) {
      cartItems.pop();
    }
    navigate("/");
  }
  function seeProfile() {
    while (cartItems.length !== 0) {
      cartItems.pop();
    }
    navigate(`/profile/${localStorage.getItem("user_id")}`);
  }
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/");
    }
  });
  return (
    <div className="bg-base-100 h-screen">
      <div className="bg-base-100 p-6  md:mx-auto">
        <svg
          viewBox="0 0 24 24"
          className="text-rose-600 w-16 h-16 mx-auto my-6"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Order has been placed.
          </h3>
          <p className="text-gray-600 my-2">
            Thank you for completing your order.
          </p>
          <p> Have a great day! </p>
          <div className="py-10 text-center">
            <button
              onClick={navigator}
              className="px-12 btn btn-primary text-white py-3"
            >
              Shop More
            </button>
            <button
              onClick={seeProfile}
              className="px-12 btn btn-primary text-white py-3 ml-4"
            >
              See my orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankyouScreen;
