import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/">
      <div className="flex items-center">
        <img src={logo} alt="" />
        <p className="text-2xl mt-5 -ml-3 font-semibold">Profast</p>
      </div>
    </Link>
  );
};

export default Logo;
