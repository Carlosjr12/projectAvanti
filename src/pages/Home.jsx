import { ItemCarousel } from "../components/ItemCarousel";
import ProductListing from "../components/ProductListing";
import styles from "../components/ProductListing/styles.module.css";

const Home = () => {
  return (
    <>
      <ItemCarousel />
      <div className={styles.header}>
        <h3>Produtos</h3>
      </div>
      <ProductListing />
    </>
  );
};

export default Home;
