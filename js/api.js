const apiURL = "https://v2.api.noroff.dev/gamehub";

// Hent alle produkter
export async function fetchAllProducts() {
  const response = await fetch(apiURL);

  if (!response.ok) {
    throw new Error("Failed to load data");
  }

  const json = await response.json();

  // Sikrer at vi har et array, og filtrerer bort tomme objekter
  const products = Array.isArray(json.data) ? json.data : [];
  return products.filter((product) => product && product.id);
}

// Hent ett spesifikt produkt basert på ID
export async function fetchProductById(id) {
  const products = await fetchAllProducts();
  return products.find((product) => product.id === id);
}
