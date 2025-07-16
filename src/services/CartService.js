const CART_KEY = "cart";

export const getCartItems = () => {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

function extractProductName(product) {
  // Tenta pegar o nome das propriedades mais comuns
  if (product.name) return product.name;
  if (product.nome) return product.nome;
  if (product.titulo) return product.titulo;
  if (product.title) return product.title;
  // Se vier uma descrição longa, pega só a primeira linha
  if (product.descricao || product.description) {
    const desc = product.descricao || product.description;
    const firstLine = desc.split("\n")[0].trim();
    if (firstLine.length > 0) return firstLine;
  }
  // Se vier tudo junto, tenta pegar até a primeira quebra de linha
  if (typeof product === "string") {
    return product.split("\n")[0].trim();
  }
  return "Sem nome";
}

function extractProductRef(product) {
  // Tenta pegar diretamente
  if (product.ref) return product.ref;
  if (product.referencia) return product.referencia;
  if (product.reference) return product.reference;
  // Tenta extrair do texto (segunda linha ou após "Ref:")
  const text = product.titulo || product.title || product.name || product.nome || product.descricao || product.description || "";
  // Procura padrão "Ref: XXXXX"
  const refMatch = text.match(/Ref:\s*([A-Za-z0-9\-]+)/i);
  if (refMatch) return refMatch[1];
  // Procura padrão "| Ref: XXXXX"
  const pipeRefMatch = text.match(/\|\s*Ref:\s*([A-Za-z0-9\-]+)/i);
  if (pipeRefMatch) return pipeRefMatch[1];
  // Procura na segunda linha
  const lines = text.split("\n");
  if (lines.length > 1) {
    const refLine = lines[1].match(/Ref:\s*([A-Za-z0-9\-]+)/i);
    if (refLine) return refLine[1];
  }
  return "Sem ref";
}

export const addToCart = (product) => {
  const cart = getCartItems();
  const existingProductIndex = cart.findIndex((item) => item.id === product.id);

  const productName = extractProductName(product);
  const productRef = extractProductRef(product);

  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += 1;
  } else {
    cart.push({ ...product, name: productName, ref: productRef, quantity: 1 });
  }
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const removeFromCart = (productId) => {
  let cart = getCartItems();
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};

export const updateCartItemQuantity = (productId, quantity) => {
  const cart = getCartItems();
  const index = cart.findIndex((item) => item.id === productId);
  if (index !== -1) {
    if (quantity > 0) {
      cart[index].quantity = quantity;
    } else {
      cart.splice(index, 1);
    }
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }
};

export const getCartTotalItems = () => {
  const cart = getCartItems();
  return cart.reduce((total, item) => total + item.quantity, 0);
};

export const getCartTotalPrice = () => {
  const cart = getCartItems();
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};
