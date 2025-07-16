import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import PhotoService from "../../services/PhotoService";
import styles from "./styles.module.css";

const ProductListing = () => {
  const [productIds, setProductIds] = useState([]);

  useEffect(() => {
    const fetchProductIds = async () => {
      try {
        const products = await PhotoService.getPhotos();
        const ids = products.map((p) => p.id);
        setProductIds(ids);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    };

    fetchProductIds();
  }, []);

  return (
    <section className={styles.productListing}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {productIds.map((id) => (
            <div key={id} className={styles.col}>
              <ProductCard id={id} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductListing;
