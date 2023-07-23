import user from "../assets/user_avatar.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [authenticated, setauthenticated] = useState("");
  const [id, profileID] = useState("");
  function logout() {
    setauthenticated("");
    localStorage.clear();
    navigate("/");
  }
  useEffect(() => {
    const loggedInUser = localStorage.getItem("token");
    if (loggedInUser) {
      setauthenticated(loggedInUser);
      profileID(localStorage.getItem("user_id")!);
    }
  }, [authenticated]);
  return (
    <nav>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link
            to={`/`}
            className="btn btn-ghost normal-case text-xl text-transparent bg-clip-text bg-gradient-to-r from-rose-800 to-rose-500"
          >
            BIGBAZAAR
          </Link>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">0</span>
              </div>
            </label>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">0 Items</span>
                {/* <span className="text-info">Subtotal: $999</span> */}
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {authenticated ? (
                <>
                  <li>
                    <Link to={`/`}>
                      <p className="justify-between">Profile</p>
                    </Link>
                  </li>
                  <li>
                    <a onClick={logout}>Logout</a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to={"/login"}>
                      <a>Login</a>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
