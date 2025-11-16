import { getCart, saveCart, getCartCount, clearCart } from "./utils.js";

function updateCartCount() {
  const cartSpan = document.getElementById("cart-count");
  if (cartSpan) cartSpan.textContent = getCartCount();
}

function renderCart() {
  const cartList = document.getElementById("cart-list");
  const totalElement = document.getElementById("total-price");

  const cart = getCart();
  cartList.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartList.innerHTML = "<p>Your cart is empty.</p>";
    totalElement.textContent = "0.00";
    updateCartCount();
    return;
  }

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("checkout-item");

    li.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="info">
        <h3>${item.title}</h3>
        <p>Price: $${item.price}</p>

        <div class="qty-controls">
          <button class="qty-btn minus" data-id="${item.id}">−</button>
          <span class="qty-number">${item.qty}</span>
          <button class="qty-btn plus" data-id="${item.id}">+</button>
        </div>

        <button class="remove-btn" data-id="${item.id}">Remove</button>
      </div>
    `;

    cartList.appendChild(li);

    total += item.price * item.qty;
  });

  totalElement.textContent = total.toFixed(2);
  updateCartCount();
}

document.addEventListener("click", (event) => {
  const cart = getCart();

  if (event.target.classList.contains("plus")) {
    const id = event.target.dataset.id;
    const item = cart.find((p) => p.id === id);
    item.qty++;
    saveCart(cart);
    renderCart();
  }

  if (event.target.classList.contains("minus")) {
    const id = event.target.dataset.id;
    const item = cart.find((p) => p.id === id);

    if (item.qty > 1) {
      item.qty--;
    } else {
      const filtered = cart.filter((p) => p.id !== id);
      saveCart(filtered);
      renderCart();
      return;
    }

    saveCart(cart);
    renderCart();
  }

  if (event.target.classList.contains("remove-btn")) {
    const id = event.target.dataset.id;
    const filtered = cart.filter((p) => p.id !== id);
    saveCart(filtered);
    renderCart();
  }
});

const checkoutBtn = document.getElementById("checkoutBtn");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    window.location.href = "confirmation.html";
  });
}

renderCart();
updateCartCount();
