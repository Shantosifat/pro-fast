import React, { Children } from "react";
import UseAuth from "../hooks/UseAuth";
import Loading from "../pages/Shared/Loading";
import { Navigate } from "react-router";

const PrivateRoute = ({children}) => {
  const { user, loading } = UseAuth();
  // console.log(user,loading);

  if (loading) {
    return <Loading></Loading>;
  }
  if (!user) {
    <Navigate to="/login"></Navigate>;
  }
  return children;
};

export default PrivateRoute;
