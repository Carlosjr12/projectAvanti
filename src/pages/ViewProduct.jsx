import { useContext, useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

import { CartContext } from "../context/CartContext";
import PhotoService from "../services/PhotoService";

import ProductGallery from "../components/ProductGallery";
import ProductCard from "../components/ProductCard";

import styles from "./ViewProduct.module.css";

// 🔁 Utilitário para pegar produtos relacionados aleatórios
const getRandomProducts = (products, excludeId, count) => {
  const filtered = products.filter((p) => p.id !== excludeId);
  const random = [];
  while (random.length < count && filtered.length > 0) {
    const index = Math.floor(Math.random() * filtered.length);
    random.push(filtered.splice(index, 1)[0]);
  }
  return random;
};

const ViewProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addItemToCart } = useContext(CartContext);
  const toast = useRef(null);

  // ⏳ Buscar o produto e os relacionados
  useEffect(() => {
    PhotoService.getPhotos().then((data) => {
      const selected = data.find((p) => p.id === parseInt(id));
      setProduct(selected);
      setRelatedProducts(getRandomProducts(data, parseInt(id), 4));
      window.scrollTo(0, 0);
    });
  }, [id]);

  // 🛒 Adiciona ao carrinho com feedback visual
  const handleAddToCart = () => {
    if (!product) return;
    addItemToCart({ ...product, quantity: 1 });
    toast.current.show({
      severity: "success",
      summary: "Sucesso",
      detail: "Produto adicionado ao carrinho!",
      life: 3000,
    });
  };

  if (!product) return <div>Carregando...</div>;

  // 🖼️ Simula imagens para galeria
  const galleryImages = Array(5)
    .fill(null)
    .map((_, i) => ({
      img: product.img,
      title: `Imagem ${i + 1}`,
      color: ["#E2E3FF", "#FFE8BC", "#FFC0BC", "#DEC699", "#E8DFCF"][i],
    }));

  return (
    <div className={`${styles.productViewPage} md:px-8`}>
      <Toast ref={toast} />

      {/* 🧭 Navegação breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link className={styles.breadcrumbLink} to="/">
          Home
        </Link>{" "}
        /
        <Link className={styles.breadcrumbLink} to="/products">
          Produtos
        </Link>{" "}
        /
        <Link className={styles.breadcrumbLink} to="/products/tenis">
          Tênis
        </Link>{" "}
        /<b>{product.type}</b>
      </nav>

      <div className="md:flex md:flex-wrap">
        {/* 🎨 Galeria de imagens */}
        <div>
          <ProductGallery images={galleryImages} />
        </div>

        {/* 📝 Informações do produto */}
        <div className={styles.productInfo}>
          <h1>{product.title}</h1>
          <p>{product.categoria} | Ref: RF-6547-5781</p>

          <div className={styles.priceInfo}>
            <span className={styles.currentPrice}>R$ {product.price}</span>
            {product.priceDiscount && (
              <span className={styles.originalPrice}>
                R$ {product.priceDiscount}
              </span>
            )}
          </div>

          <div className={styles.ratingInfo}>4.7 (200 avaliações)</div>

          <p className={styles.description}>{product.description}</p>

          {/* 👟 Tamanhos disponíveis */}
          <div className={styles.sizeSelector}>
            <label>Tamanho</label>
            <div className={styles.sizeButtons}>
              {["39", "40", "41", "42", "43"].map((size) => (
                <Button
                  key={size}
                  label={size}
                  className="p-button-secondary"
                />
              ))}
            </div>
          </div>

          {/* 🎨 Opções de cor */}
          <div className={styles.colorSelector}>
            <label>Cor</label>
            <div className={styles.colorButtons}>
              {["#6FEEFF", "#FF6969", "#6D70B7"].map((color, i) => (
                <Button
                  key={i}
                  style={{ backgroundColor: color }}
                  className="p-button-rounded p-button-outlined"
                />
              ))}
            </div>
          </div>

          {/* 🛍️ Botão de compra */}
          <Button onClick={handleAddToCart} className="p-button-primary">
            Adicionar ao Carrinho
          </Button>
        </div>
      </div>

      {/* 🔄 Produtos relacionados */}
      <div className={styles.relatedProducts}>
        <div className="flex justify-content-between align-items-center mb-4">
          <h3>Produtos Relacionados</h3>
          <Link className={styles.link} to="/products">
            Ver Todos
          </Link>
        </div>

        <div className={styles.relatedProductsList}>
          {relatedProducts.map((p, i) => (
            <div key={i} className="lg:col">
              <ProductCard
                id={p.id}
                image={p.img}
                type={p.type}
                name={p.title}
                price={p.price}
                priceDiscount={p.priceDiscount}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
