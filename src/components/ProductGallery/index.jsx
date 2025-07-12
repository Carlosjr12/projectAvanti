import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./style.module.css";

import "primeflex/primeflex.css";

const ProductGallery = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className={`${styles.gallery} m-2`}>
      <div
        className="flex justify-content-center md:max-w-5 border-round"
        style={{ backgroundColor: images[currentImage].color }}
      >
        <img
          src={images[currentImage].img}
          alt={images[currentImage].title}
          style={{ maxWidth: "90%", width: "100%" }}
          className="p-2"
        />
      </div>
      <div className="img-secondary">
        <div className="thumbnails-container flex mt-2 gap-2 md:max-w-5">
          {images.map((image, index) => (
            <div
              key={index}
              className={`${styles.thumbnail} ${
                currentImage === index ? styles.active : ""
              } border-round`}
              onClick={() => setCurrentImage(index)}
              style={{ backgroundColor: image.color }}
            >
              <img
                src={image.img}
                alt={image.title}
                className="img-thumbnail-size w-full p-2"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

ProductGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ProductGallery;
