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

  if (typeof updateCartCount === "function") {
    updateCartCount();
  }
}

function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter((item) => item !== id);
  saveCart(cart);

  if (window.location.pathname.includes("checkout.html")) {
    location.reload();
  }
}

function clearCart() {
  localStorage.removeItem("cart");
}

function getCartCount() {
  const cart = getCart();
  return cart.length;
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];
function renderCart() {
  const list = document.getElementById("cart-list");

  const totalElement = document.getElementById("total-price");
  list.innerHTML = "";
  let total = 0;
  cart.forEach((item) => {
    const listItem = document.createElement("li");
    list.textContent = `${item.title} - $${item.price}`;
    list.appendChild(listItem);
    total += item.price;
  });
  totalElement.textContent = total;
}
renderCart();
