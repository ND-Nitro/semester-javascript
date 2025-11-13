function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id) {
  const cart = getCart();
  cart.push(id);
  saveCart(cart);
}

function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter((item) => item !== id);
  saveCart(cart);
  // reload checkout-siden etter endring
  if (window.location.pathname.includes("checkout.html")) {
    location.reload();
  }
}

function clearCart() {
  localStorage.removeItem("cart");
}
