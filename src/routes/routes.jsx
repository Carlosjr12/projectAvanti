import { useRoutes } from "react-router-dom";
import Home from "../pages/Home";
import ListingPage from "../pages/ListingPage";
<<<<<<< HEAD
import ViewProduct from "../pages/ViewProduct";
=======
import ProductList from "../pages/ProductList";
import ViewProduct from "../pages/ViewProduct";
import MeusPedidos from "../pages/MeusPedidos";
>>>>>>> master

const AppRoutes = () => {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/product", element: <ListingPage /> },
    { path: "/product/:id", element: <ViewProduct /> },
<<<<<<< HEAD
=======
    { path: "/produtos", element: <ProductList /> },
    { path: "/meus-pedidos", element: <MeusPedidos /> },
>>>>>>> master
  ]);

  return routes;
};

export default AppRoutes;
