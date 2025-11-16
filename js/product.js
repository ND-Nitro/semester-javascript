import { fetchProductById } from "./api.js";
import { addToCart, getCartCount } from "./utils.js";

let currentProduct = null;

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

function updateCartCount() {
  const cartSpan = document.getElementById("cart-count");
  if (!cartSpan) return;

  cartSpan.textContent = getCartCount();
}

async function loadProduct() {
  const productContainer = document.getElementById("product");

  if (!productId) {
    productContainer.innerHTML = "<p>No product ID provided.</p>";
    return;
  }

  try {
    const item = await fetchProductById(productId);
    currentProduct = item;

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
    if (!currentProduct) return;

    addToCart(currentProduct, 1);

    updateCartCount();
  });
}

loadProduct();
updateCartCount();
