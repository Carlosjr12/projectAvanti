import { useRoutes } from "react-router-dom";
import Home from "../pages/Home";
import ListingPage from "../pages/ListingPage";
import ProductList from "../pages/ProductList";
import ViewProduct from "../pages/ViewProduct";
import MeusPedidos from "../pages/MeusPedidos";

const AppRoutes = () => {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/product", element: <ListingPage /> },
    { path: "/product/:id", element: <ViewProduct /> },
    { path: "/produtos", element: <ProductList /> },
    { path: "/meus-pedidos", element: <MeusPedidos /> },
  ]);

  return routes;
};

export default AppRoutes;
