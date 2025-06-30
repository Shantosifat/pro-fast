import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Signup from "../pages/Authentication/Signup/Signup";
import Coverage from "../coverage/Coverage";

export const router = createBrowserRouter([
    {
        path:'/',
        Component: MainLayouts,
        children: [
            {
                index:true,
                Component: Home
            },
            {
                path:'coverage',
                Component: Coverage
            }
        ]
    },
    {
        path:'/',
        Component: AuthLayout,
        children:[
            {
                path:'login',
                Component:Login
            },
            {
                path:'signup',
                Component:Signup
            }
        ]
    }
])