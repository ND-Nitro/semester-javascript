const apiURL = "https://v2.api.noroff.dev/gamehub";

async function getProducts() {
  const loading = document.getElementById("loading");
  const container = document.getElementById("productList");

  try {
    if (loading) loading.style.display = "block";

    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error(error);
    if (container) {
      container.innerHTML = "<p>Could not load products.</p>";
    }
    return null;
  } finally {
    if (loading) loading.style.display = "none";
  }
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.classList.add("card");

  const title = document.createElement("h2");
  title.textContent = product.title;

  const img = document.createElement("img");
  img.src = product.image?.url || "";
  img.alt = product.title;
  img.width = 200;

  const price = document.createElement("p");
  price.textContent = `Price: $${product.price}`;

  const link = document.createElement("a");
  link.href = `product.html?id=${product.id}`;
  link.textContent = "View product";

  card.appendChild(title);
  card.appendChild(img);
  card.appendChild(price);
  card.appendChild(link);

  return card;
}

function renderProducts(products) {
  const container = document.getElementById("productList");
  if (!container) return;

  container.innerHTML = "";

  products.forEach((product) => {
    const card = createProductCard(product);
    container.appendChild(card);
  });
}

async function init() {
  const products = await getProducts();
  if (products && products.length) {
    renderProducts(products);
  }
}

init();
