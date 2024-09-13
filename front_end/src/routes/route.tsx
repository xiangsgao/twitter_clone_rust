import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import React from "react";
import { useContext } from "react";
import { AuthContext } from "../components/providers/authProvider";
const Layout =  React.lazy(() => import("../components/layouts/DefaultLayout"));
const  Home  = React.lazy(() => import( "../views/Home/Home"));
const  Login =  React.lazy(() => import("../views/Login/Login"));
const  Register =  React.lazy(() => import("../views/Register/Register"));
const BackgroundLayout = React.lazy(() => import("../components/layouts/BackgroundLayout"));


const ProtectedRoute = () =>{
   const user = useContext(AuthContext)?.user;
   return user ? <Outlet /> : <Navigate to={"/login"} />
}

const UnprotectedRoute = () =>{
   const user = useContext(AuthContext)?.user;
   return !user ? <Outlet /> : <Navigate to={"/"} />
}


const router = createBrowserRouter([
   // all the default layout pages go under here
   {
    path: "/",
    element: <Layout />,
    children: [
      {
         path: "",
         element: <Home />
      },
      // if routes need to be protected, make sure to wrap it with protected route component
      {
         path: "user",
         element: <ProtectedRoute/>,
         children: [
            // TODO user settings page and the dashboard page
         ]
      },
      {
         path: "*",
         element: <Navigate to={"/"}/>
      },

    ]
   },
   {
      path: "/login",
      element: <BackgroundLayout />,
      children: [
         // if vice versa, if you do not want login user to reach this route, use the UnprotectedRoute
         {
            path: "",
            element: <UnprotectedRoute/>,
            children: [
               {
                  path: "",
                  element: <Login />
               }
            ]
         },
      ]
   },
   {
      path: "/register",
      element: <BackgroundLayout />,
      children: [
         // if vice versa, if you do not want login user to reach this route, use the UnprotectedRoute
         {
            path: "",
            element: <UnprotectedRoute/>,
            children: [
               {
                  path: "",
                  element: <Register />
               }
            ]
         },
      ]
   },
]);

export default router;