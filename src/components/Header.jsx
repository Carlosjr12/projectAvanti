import React, { useState, useEffect, useContext } from "react";
import { getCartItems, getCartTotalPrice, removeFromCart, updateCartItemQuantity, clearCart } from "../services/CartService";
import { addOrder } from "../services/OrderService";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Header() {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState(getCartItems());
  const { cartCount } = useContext(CartContext);

  useEffect(() => {
    setCartItems(getCartItems());
  }, [showCart, cartCount]);

  const refreshCart = () => setCartItems(getCartItems());

  const handleRemove = (id) => {
    removeFromCart(id);
    refreshCart();
  };

  const handleQuantityChange = (id, qty) => {
    updateCartItemQuantity(id, qty);
    refreshCart();
  };

  const handleClear = () => {
    clearCart();
    refreshCart();
  };

  // Função para finalizar compra
  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    const orderId = Math.floor(100000 + Math.random() * 900000); // Ex: 6 dígitos
    const order = {
      id: orderId,
      items: cartItems,
      total: getCartTotalPrice(),
      date: new Date().toLocaleString(),
    };
    addOrder(order);
    clearCart();
    refreshCart();
    alert(`Compra realizada! Seu pedido é #${orderId}`);
  };

  return (
    <header style={{ background: "#222", color: "#fff", padding: 16, position: "relative" }}>
      {/* Barra de navegação centralizada */}
      <nav style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 32,
        fontSize: 18,
        fontWeight: "bold",
        letterSpacing: 1,
        marginBottom: 8
      }}>
        <a href="/" style={{ color: "#4caf50", textDecoration: "none" }}>Início</a>
        <Link to="/produtos" style={{ color: "#4caf50", textDecoration: "none" }}>Produtos</Link>
        <Link to="/meus-pedidos" style={{ color: "#4caf50", textDecoration: "none" }}>Meus pedidos</Link>
      </nav>
      {/* Botão do carrinho no canto superior direito */}
      <button
        onClick={() => { setShowCart(true); refreshCart(); }}
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          background: "#4caf50",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          padding: "8px 16px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Ver Carrinho ({cartCount})
      </button>
      {showCart && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: 350,
            height: "100vh",
            background: "#222",
            color: "#fff",
            zIndex: 1000,
            padding: 20,
            overflowY: "auto",
            boxShadow: "-2px 0 8px rgba(0,0,0,0.3)",
          }}
        >
          <button
            onClick={() => setShowCart(false)}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              background: "transparent",
              color: "#fff",
              border: "none",
              fontSize: 22,
              cursor: "pointer",
            }}
            aria-label="Fechar"
          >
            ×
          </button>
          <h2 style={{ marginTop: 0 }}>Seu Carrinho</h2>
          {cartItems.length === 0 ? (
            <p>Carrinho vazio.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {cartItems.map(item => {
                // Prioriza o campo ref, só extrai da descrição se não existir
                let ref = item.ref || item.referencia || item.reference;
                if (!ref) {
                  const desc = item.descricao || item.description || item.titulo || item.title || item.name || item.nome || "";
                  const lines = desc.split("\n");
                  for (const line of lines) {
                    const match = line.match(/\|\s*(RF|REF):\s*([A-Za-z0-9\-]+)/i) || line.match(/(?:^|\s)(RF|REF):\s*([A-Za-z0-9\-]+)/i);
                    if (match) {
                      ref = match[2];
                      break;
                    }
                  }
                }
                if (!ref) ref = "Sem ref";
                return (
                  <li key={item.id} style={{ marginBottom: 16, borderBottom: "1px solid #444", paddingBottom: 8 }}>
                    <div>
                      <strong>Produto:</strong> {item.name || "Sem nome"}
                      <br />
                      <strong>Ref:</strong> {ref}
                      <br />
                      <strong>Preço:</strong> R$ {item.price}
                      <br />
                      <strong>Quantidade:</strong> {item.quantity}
                    </div>
                    <div style={{ marginTop: 4 }}>
                      <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                      <span style={{ margin: "0 8px" }}>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                      <button onClick={() => handleRemove(item.id)} style={{ marginLeft: 10 }}>
                        Remover
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          <div style={{ marginTop: 16 }}>
            <strong>Total:</strong> R$ {getCartTotalPrice().toFixed(2)}
          </div>
          <button
            onClick={handleClear}
            disabled={cartItems.length === 0}
            style={{
              marginTop: 16,
              background: "#f44336",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              padding: "8px 16px",
              cursor: cartItems.length === 0 ? "not-allowed" : "pointer",
            }}
          >
            Limpar Carrinho
          </button>
          <button
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
            style={{
              marginTop: 8,
              background: "#2196f3",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              padding: "8px 16px",
              cursor: cartItems.length === 0 ? "not-allowed" : "pointer",
              marginLeft: 8,
            }}
          >
            Finalizar Compra
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;