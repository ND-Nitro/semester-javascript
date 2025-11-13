const cartContainer = document.getElementById("cart");
const checkoutBtn = document.getElementById("checkoutBtn");
const api = "https://v2.api.noroff.dev/gamehub/";

async function loadCartProducts() {
  const cart = getCart();

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let totalPrice = 0;
  cartContainer.innerHTML = "";

  for (const id of cart) {
    try {
      const response = await fetch(api + id);
      if (!response.ok) {
        throw new Error("Failed to fetch item");
      }
      const json = await response.json();
      const item = json.data;

      totalPrice += item.price;

      const itemDiv = document.createElement("div");
      itemDiv.classList.add("card");

      const title = document.createElement("h3");
      title.textContent = item.title;

      const price = document.createElement("p");
      price.textContent = `Price: $${item.price}`;

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.addEventListener("click", () => removeFromCart(id));

      itemDiv.appendChild(title);
      itemDiv.appendChild(price);
      itemDiv.appendChild(removeBtn);

      cartContainer.appendChild(itemDiv);
    } catch (error) {
      console.error(error);
    }
  }

  const totalEl = document.createElement("h2");
  totalEl.textContent = `Total: $${totalPrice}`;
  cartContainer.appendChild(totalEl);
}

checkoutBtn.addEventListener("click", () => {
  window.location.href = "confirmation.html";
});

loadCartProducts();
