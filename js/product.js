import { fetchProductById } from "./api.js";

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

function getCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart.length;
}

function updateCartCount() {
  const cartSpan = document.getElementById("cart-count");
  if (!cartSpan) return;

  const count = getCartCount();
  cartSpan.textContent = count;
}

async function loadProduct() {
  const productContainer = document.getElementById("product");

  if (!productId) {
    productContainer.innerHTML = "<p>No product ID provided.</p>";
    return;
  }

  try {
    const item = await fetchProductById(productId);

    if (!item) {
      productContainer.innerHTML = "<p>Product not found.</p>";
      return;
    }

    productContainer.innerHTML = `
      <article class="product-details">
        <img src="${item.image.url}" alt="${item.image.alt}" />
        <h2>${item.title}</h2>
        <p>Genre: ${item.genre}</p>
        <p>Price: $${item.price}</p>
        <p>${item.description}</p>
      </article>
    `;
  } catch (error) {
    console.error("Error loading product:", error);
    productContainer.innerHTML = "<p>Failed to load product.</p>";
  }
}

const addToCartBtn = document.getElementById("addToCartBtn");

if (addToCartBtn) {
  addToCartBtn.addEventListener("click", () => {
    if (typeof addToCart === "function" && productId) {
      addToCart(productId);
      updateCartCount();
    } else {
      console.error("addToCart is not available or productId is missing.");
    }
  });
}

updateCartCount();
loadProduct();
