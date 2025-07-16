import React, { useEffect, useState } from "react";
import { getOrders } from "../services/OrderService";

const MeusPedidos = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h2 style={{ textAlign: "center", marginBottom: 32 }}>Meus Pedidos</h2>
      {orders.length === 0 ? (
        <p>Você ainda não fez nenhum pedido.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {orders.map((order) => (
            <li key={order.id} style={{ borderBottom: "1px solid #eee", marginBottom: 24, paddingBottom: 16 }}>
              <div><strong>Pedido:</strong> #{order.id}</div>
              <div><strong>Data:</strong> {order.date}</div>
              <div><strong>Total:</strong> R$ {order.total.toFixed(2)}</div>
              <div>
                <strong>Itens:</strong>
                <ul>
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} (Ref: {item.ref || "Sem ref"}) - {item.quantity}x R$ {item.price}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MeusPedidos;
