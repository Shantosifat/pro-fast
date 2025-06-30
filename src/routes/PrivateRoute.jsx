import React, { Children } from "react";
import UseAuth from "../hooks/UseAuth";
import Loading from "../pages/Shared/Loading";
import { Navigate } from "react-router";

const PrivateRoute = () => {
  const { user, loading } = UseAuth();

  if (loading) {
    return <Loading></Loading>;
  }
  if (!user) {
    <Navigate to="/login"></Navigate>;
  }
  return Children;
};

export default PrivateRoute;
