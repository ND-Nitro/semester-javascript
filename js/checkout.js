import { fetchProductById } from "./api.js";

function updateCartCount() {
  const cartSpan = document.getElementById("cart-count");
  if (!cartSpan) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartSpan.textContent = cart.length;
}

async function renderCart() {
  const cartList = document.getElementById("cart-list");
  const totalElement = document.getElementById("total-price");

  cartList.innerHTML = "";
  totalElement.textContent = "0.00";

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "Your cart is empty.";
    cartList.appendChild(empty);
    updateCartCount();
    return;
  }

  let total = 0;

  for (const id of cart) {
    try {
      const product = await fetchProductById(id);
      if (!product) continue;

      const itemDiv = document.createElement("div");
      itemDiv.classList.add("checkout-item");

      itemDiv.innerHTML = `
        <h3>${product.title}</h3>
        <p>$${product.price}</p>
      `;

      cartList.appendChild(itemDiv);
      total += product.price;
    } catch (error) {
      console.error("Error loading product in checkout:", error);
    }
  }

  totalElement.textContent = total.toFixed(2);
  updateCartCount();
}

const checkoutBtn = document.getElementById("checkoutBtn");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    window.location.href = "confirmation.html";
  });
}

renderCart();
updateCartCount();

/*function getCartCount() {
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
}*/
