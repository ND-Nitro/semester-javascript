import { fetchAllProducts } from "./api.js";

function getCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart.length;
}

function card(item) {
  return `
    <a href="product.html?id=${item.id}" class="product-card">
      <article>
        <img src="${item.image.url}" alt="${item.image.alt}">
        <h2>${item.title}</h2>
        <p>Genre: ${item.genre}</p>
        <p>Price: $${item.price}</p>
      </article>
    </a>
  `;
}

function updateCartCount() {
  const cartSpan = document.getElementById("cart-count");
  if (!cartSpan) return;

  const count = getCartCount();
  cartSpan.textContent = count;
}

async function displayProducts() {
  const productsContainer = document.getElementById("products-container");
  const loadingElement = document.getElementById("loading");

  try {
    const products = await fetchAllProducts();
    productsContainer.innerHTML = products.map(card).join("");
  } catch (error) {
    console.error("Error loading products:", error);
    productsContainer.innerHTML = "<p>Failed to load products.</p>";
  } finally {
    if (loadingElement) {
      loadingElement.style.display = "none";
    }
  }
}
updateCartCount();
displayProducts();
