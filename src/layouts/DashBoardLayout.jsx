import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import Logo from "../pages/Shared/Logo";
import {
  FiHome,
  FiPackage,
  FiCreditCard,
  FiTruck,
  FiUser,
  FiUsers,
  FiClock,
} from "react-icons/fi";

const DashBoardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        {/* Page content here */}
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">Dashboard</div>
          <div className="hidden flex-none lg:block"></div>
        </div>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full space-y-3.5 w-80 p-4">
          {/* Sidebar content here */}
          <Logo></Logo>
          <div className="space-y-2">
            <NavLink to="/dashBoard" className="flex items-center gap-2">
              <FiHome /> Home
            </NavLink>

            <NavLink
              to="/dashBoard/myParcels"
              className="flex items-center gap-2"
            >
              <FiPackage /> My Parcels
            </NavLink>

            <NavLink
              to="/dashBoard/paymentHistory"
              className="flex items-center gap-2"
            >
              <FiCreditCard /> Payment History
            </NavLink>

            <NavLink
              to="/dashBoard/trackPackage"
              className="flex items-center gap-2"
            >
              <FiTruck /> Track a Package
            </NavLink>

            <NavLink
              to="/dashBoard/updateProfile"
              className="flex items-center gap-2"
            >
              <FiUser /> Update Profile
            </NavLink>

            {/* riders link  */}
            <NavLink
              to="/dashboard/activeRiders"
              className="flex items-center gap-2"
            >
              <FiUsers /> Active Riders
            </NavLink>

            <NavLink
              to="/dashboard/pendingRiders"
              className="flex items-center gap-2"
            >
              <FiClock /> Pending Riders
            </NavLink>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default DashBoardLayout;
