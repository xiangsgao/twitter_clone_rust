import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import { Home } from "../views/Home/Home";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";


const ProtectedRoute = () =>{
   const user = useSelector((state: RootState) => state.userSlice.user);
   return user ? <Outlet /> : <Navigate to={"/login"} />
}


const router = createBrowserRouter([
   
   // all the default layout pages go under here
   {
    path: "/",
    element: <Layout />,
    children: [
      {
         path: "home",
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
         element: <Navigate to={"/home"}/>
      },

    ]
   }
]);

export default router;