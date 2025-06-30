import React from "react";
import { Outlet } from "react-router";
import authImg from "../assets/authImage.png";
import Logo from "../pages/Shared/Logo";

const AuthLayout = () => {
  return (
    <div className="bg-base-200 w-11/12 mx-auto p-12">
      <div>
        <Logo></Logo>
      </div>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="flex-1">
          <img src={authImg} className="max-w-sm rounded-lg shadow-2xl" />
        </div>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
