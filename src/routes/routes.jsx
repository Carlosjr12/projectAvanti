import { useRoutes } from "react-router-dom";
import Home from "../pages/Home";
import ListingPage from "../pages/ListingPage";
import ViewProduct from "../pages/ViewProduct";

const AppRoutes = () => {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/product", element: <ListingPage /> },
    { path: "/product/:id", element: <ViewProduct /> },
  ]);

  return routes;
};

export default AppRoutes;
