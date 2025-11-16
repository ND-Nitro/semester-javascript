import { fetchAllProducts } from "./api.js";
import { getCartCount } from "./utils.js";

const buttons = document.querySelectorAll("#genre-buttons button");
const result = document.getElementById("genre-products");

let allProducts = [];

function updateCartCount() {
  const span = document.getElementById("cart-count");
  if (span) span.textContent = getCartCount();
}

function card(item) {
  return `
    <a href="product.html?id=${item.id}" class="product-card">
        <article>
        <img src="${item.image.url}" alt="${item.image.alt}">
        <h3>${item.title}</h3>
        <p>${item.genre}</p>
        <p>$${item.price}</p>
        </article>
    </a>
    `;
}

async function init() {
  allProducts = await fetchAllProducts();
  updateCartCount();
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const genre = btn.dataset.genre;

    const filtered = allProducts.filter(
      (product) => product.genre.toLowerCase() === genre.toLowerCase()
    );
    result.innerHTML = filtered.map(card).join("");
  });
});

init();
