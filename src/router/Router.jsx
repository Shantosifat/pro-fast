import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Signup from "../pages/Authentication/Signup/Signup";
import Coverage from "../coverage/Coverage";
import SendParcel from "../pages/SendAParcel/SendParcel";
import PrivateRoute from "../routes/PrivateRoute";
import DashBoardLayout from "../layouts/DashBoardLayout";
import MyParcels from "../DashBoard/MyParcels/MyParcels";
import Payment from "../DashBoard/payment/Payment";
import PaymentHistory from "../DashBoard/PaymentHistory/PaymentHistory";
import TrackPackage from "../DashBoard/TrackPackage/TrackPackage";
import BeARider from "../BeARider/BeARider";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "coverage",
        Component: Coverage,
        loader: () => fetch("./warehouses.json"),
      },
      {
        path: "beArider",
        element: (
          <PrivateRoute>
            <BeARider></BeARider>
          </PrivateRoute>
        ),
      },
      {
        path: "sendParcel",
        element: (
          <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>
        ),
        loader: () => fetch("./warehouses.json"),
      },
    ],
  },
  {
    path: "/dashBoard",
    element: (
      <PrivateRoute>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "myParcels",
        Component: MyParcels,
      },
      {
        path: "payment/:id",
        Component: Payment,
      },
      {
        path: "paymentHistory",
        Component: PaymentHistory,
      },
      {
        path: "trackPackage",
        Component: TrackPackage,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "signup",
        Component: Signup,
      },
    ],
  },
]);
