import { getCart, removeFromCart, clearCart } from "./utils.js";

function renderCart() {
  const cartContainer = document.getElementById("cart");
  cartContainer.innerHTML = "";
}
renderCart();
