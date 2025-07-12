import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartProvider";
import Header from "./components/Header";
import AppRoutes from "./routes/routes";

import "./App.css";

import "primereact/resources/themes/lara-dark-green/theme.css";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Header />
        <AppRoutes />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
