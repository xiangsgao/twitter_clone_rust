import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import { Home } from "../views/Home/Home";
import { useContext } from "react";
import { AuthContext } from "../components/providers/authProvider";
import { Login } from "../views/Login/Login";
import { BackgroundLayout } from "../components/layouts/BackgroundLayout";


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
]);

export default router;