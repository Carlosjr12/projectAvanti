const CART_KEY = "cart";

export const getCartItems = () => {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};
export const addToCart = (product) => {
  const cart = getCartItems();
  const existingProductIndex = cart.findIndex((item) => item.id === product.id);

  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
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
