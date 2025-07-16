import { Link, useLocation } from "react-router-dom";
import styles from "./styles.module.css";

const Header = () => {
  const location = useLocation();

  const items = [
    { label: "Inicio", path: "/" },
    { label: "Produtos", path: "/product" },
    { label: "Meus Pedidos", path: "/my-orders" },
  ];

  const getActiveIndex = () => {
    switch (true) {
      case location.pathname === "/":
        return 0;
      case location.pathname.startsWith("/products"):
        return 1;
      case location.pathname === "/my-orders":
        return 2;
      default:
        return null;
    }
  };

  return (
    <header className={styles.header}>
      <nav className={styles.menu}>
        {items.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`nav-item ${getActiveIndex() === index ? "active" : ""}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
