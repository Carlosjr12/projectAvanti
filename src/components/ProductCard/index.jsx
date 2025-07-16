import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import PhotoService from "../../services/PhotoService";
import styles from "./styles.module.css";

const ProductCard = ({ id }) => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const allProducts = await PhotoService.getPhotos();
        const product = allProducts.find((p) => p.id === id);
        setProductData(product);
      } catch (error) {
        console.error("Erro ao carregar o produto:", error);
      }
    };

    loadProduct();
  }, [id]);

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  if (!productData) return null;

  const { img, title, price, priceDiscount, type } = productData;

  const discountPercentage = priceDiscount
    ? Math.round(((price - priceDiscount) / price) * 100)
    : 0;

  return (
    <div className={styles.productCard} onClick={handleCardClick}>
      <div className={styles.imageContainer}>
        {priceDiscount > 0 && (
          <div className={styles.discountBadge}>{discountPercentage}% OFF</div>
        )}
        <img src={img} alt={title} className={styles.img} />
      </div>

      <div className={styles.productText}>
        <h3 className={styles.name}>{type}</h3>
        <div className={styles.priceSection}>
          {priceDiscount > 0 && (
            <span className={styles.priceDiscount}>R$ {priceDiscount}</span>
          )}
          <span
            className={
              priceDiscount > 0 ? styles.priceOriginal : styles.priceNormal
            }
          >
            R$ {price}
          </span>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
};

export default ProductCard;
