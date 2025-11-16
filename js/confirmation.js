import { clearCart, getCartCount } from "./utils.js";

clearCart();

const cartSpan = document.getElementById("cart-count");
if (cartSpan) {
  cartSpan.textContent = getCartCount();
}
