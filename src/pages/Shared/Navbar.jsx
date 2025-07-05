import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import Logo from "./Logo";
import UseAuth from "../../hooks/UseAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = UseAuth();
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire("Log Out Successful!");
        navigate("/login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/sendParcel">Send A Parcel</NavLink>
      </li>

      {user && (
        <>
        <li>
          <NavLink to="/dashBoard">Dashboard</NavLink>
        </li>
        </>
      )}
      <li>
        <NavLink to="/coverage">Coverage</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <div className="lg:block md:hidden sm:hidden ">
          <Logo></Logo>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end space-x-4">
        {user ? (
          <>
            <div className="hidden md:flex flex-col text-right">
              <span className="font-semibold text-sm">
                {user.displayName || user.email}
              </span>
              <span className="text-xs text-gray-500">Logged In</span>
            </div>
            <button
              onClick={handleLogOut}
              className="btn btn-outline btn-error"
            >
              Log Out
            </button>
          </>
        ) : (
          <Link to="/login" className="btn btn-success">
            Log In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
