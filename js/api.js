const apiURL = "https://v2.api.noroff.dev/gamehub";

export async function fetchAllProducts() {
  const response = await fetch(apiURL);

  if (!response.ok) {
    throw new Error("Failed to load data");
  }

  const json = await response.json();

  const products = Array.isArray(json.data) ? json.data : [];
  return products.filter((product) => product && product.id);
}

export async function fetchProductById(id) {
  const products = await fetchAllProducts();
  return products.find((product) => product.id === id);
}
