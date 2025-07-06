import React, { Children } from "react";
import UseAuth from "../hooks/UseAuth";
import Loading from "../pages/Shared/Loading";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({children}) => {
  const { user, loading } = UseAuth();
  const location = useLocation()
  // console.log(location);
  // console.log(user,loading);

  if (loading) {
    return <Loading></Loading>;
  }
  if (!user) {
   return <Navigate state={{from: location.pathname}} to="/login"></Navigate>;
  }
  return children;
};

export default PrivateRoute;
