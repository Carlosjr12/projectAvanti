import React from "react";
import { data as products } from "../services/tenisData";
import { Link } from "react-router-dom";

const ProductList = () => (
  <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
    <h2 style={{ textAlign: "center", marginBottom: 32 }}>Todos os Produtos</h2>
    <ul style={{ listStyle: "none", padding: 0 }}>
      {products.map((product) => (
        <li key={product.id} style={{
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #eee",
          padding: "16px 0"
        }}>
          <Link to={`/products/${product.id}`} style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit", flex: 1 }}>
            <img src={product.img} alt={product.title} style={{ width: 80, height: 80, objectFit: "contain", marginRight: 24 }} />
            <div>
              <div style={{ fontWeight: "bold", fontSize: 18, color: "#4caf50" }}>
                {product.title}
              </div>
              <div style={{ color: "#888", fontSize: 14 }}>
                {product.categoria} {product.ref ? `| Ref: ${product.ref}` : ""}
              </div>
              <div style={{ fontSize: 16, marginTop: 4 }}>
                R$ {product.price}
                {product.priceDiscount && (
                  <span style={{ marginLeft: 12, textDecoration: "line-through", color: "#f44336" }}>
                    R$ {product.priceDiscount}
                  </span>
                )}
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default ProductList;
