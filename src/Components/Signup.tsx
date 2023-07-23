import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./Header";

function Signup() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  function signin() {
    let email = (document.getElementById("email") as HTMLInputElement).value;
    let pass = (document.getElementById("password") as HTMLInputElement).value;
    if (!email || !pass) {
      setError("Please provide required information.");
      return;
    }
    fetch("http://localhost:5050/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: pass }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "User already registered") {
          setError("User already registered");
          return;
        }
        if (data.message === "Please Provide Required Information") {
          setError("Please Provide Required Information");
          return;
        }
        if (data.message === "User created Successfully") {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", data.user.email);
          localStorage.setItem("user_id", data.user._id);
          if (localStorage.getItem("link"))
            navigate(`/product/${localStorage.getItem("link")}`);
          else navigate(`/`);
        }
      });
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <Header />
      <div className="min-h-screen bg-base-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-800 to-rose-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">
                  Sign up to{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-800 to-rose-500">
                    BIGBAZAAR
                  </span>
                </h1>
              </div>
              {error ? <p className="text-red-500 text-center">{error}</p> : ""}
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="email"
                      name="email"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email address"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="password"
                      name="password"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <button
                      onClick={signin}
                      className="btn btn-primary text-white rounded-3xl w-full"
                    >
                      Sign up
                    </button>
                  </div>
                  <div>
                    <p>
                      Already have an account?{" "}
                      <Link to={`/login`} className="underline">
                        Log in
                      </Link>{" "}
                      instead.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
