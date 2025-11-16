const KEY = "local_storage_items";

export function getCart() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function saveCart(cart) {
  localStorage.setItem(KEY, JSON.stringify(cart));
}

export function addToCart(product, qty = 1) {
  const cart = getCart();

  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      image: product.image.url,
      price: product.price,
      qty: qty,
    });
  }

  saveCart(cart);
}

export function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter((item) => item.id !== id);
  saveCart(cart);

  if (window.location.pathname.includes("checkout.html")) {
    location.reload();
  }
}

export function clearCart() {
  localStorage.removeItem(KEY);
}

export function getCartCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.qty, 0);
}
