const productContainer = document.getElementById("product");
const addBtn = document.getElementById("addToCartBtn");
const productUrl = "https://v2.api.noroff.dev/gamehub/";

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

async function getProduct() {
  try {
    const response = await fetch(productUrl + productId);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error(error);
    productContainer.innerHTML = "<p>Could not load product.</p>";
  }
}

function renderProduct(product) {
  productContainer.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.classList.add("card");

  const title = document.createElement("h2");
  title.textContent = product.title;

  const img = document.createElement("img");
  img.src = product.image?.url || "";
  img.alt = product.title;
  img.width = 250;

  const desc = document.createElement("p");
  desc.textContent = product.description;

  const price = document.createElement("p");
  price.textContent = `Price: $${product.price}`;

  wrapper.appendChild(title);
  wrapper.appendChild(img);
  wrapper.appendChild(desc);
  wrapper.appendChild(price);

  productContainer.appendChild(wrapper);
}

addBtn.addEventListener("click", () => {
  addToCart(productId);
  alert("Added to cart");
});

async function initProduct() {
  const product = await getProduct();
  if (product) renderProduct(product);
}

initProduct();
