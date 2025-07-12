import { useNavigate } from "react-router-dom";
import { Carousel } from "primereact/carousel";
import { data as tenisData } from "../../services/tenisData";
import { Button } from "primereact/button";

import styles from "./styles.module.css";

export const ItemCarousel = () => {
  const navigate = useNavigate();

  const destaqueTenis = tenisData.filter(
    (item) => item.description && item.buttonText
  );

  const itemTemplate = (item) => {
    const handleCardClick = () => {
      navigate(`/product/${item.id}`);
    };

    return (
      <div className={styles.carouselContainer}>
        <div className={styles.carouselContent}>
          <img
            src={item.img}
            alt={item.title}
            className={styles.carouselImage}
          />
          <div className={styles.carouselText}>
            <h1 className={styles.carouselTitle}>{item.title}</h1>
            <p className={styles.carouselDescription}>{item.description}</p>
            <Button
              label={item.buttonText || "Ver produto"}
              onClick={handleCardClick}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.carousel}>
      <Carousel
        value={destaqueTenis}
        itemTemplate={itemTemplate}
        numScroll={1}
        numVisible={1}
        circular
        autoplayInterval={3000}
      />
    </div>
  );
};
