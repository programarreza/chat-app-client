import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import NonUserRoute from "./NonUserRoute";
import PrivateRoutes from "./PrivateRoute";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <PrivateRoutes><Dashboard /></PrivateRoutes>,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <NonUserRoute><Login /></NonUserRoute>,
      },
    ],
  },
]);

export default Router;
