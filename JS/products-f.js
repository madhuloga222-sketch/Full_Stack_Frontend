const container = document.getElementById("products");
let allProducts = [];

const farmerId = parseInt(localStorage.getItem("farmer_id"));

const BASE_URL = "https://full-stack-backend-omega.vercel.app";
fetch(`${BASE_URL}/products/products/`)
  .then((res) => res.json())
  .then((data) => {
    allProducts = farmerId
      ? data.filter((p) => p.farmer_id === farmerId)
      : data;

    display(allProducts);

    document.getElementById("btnId").addEventListener("click", function () {
      const key = document.getElementById("searchInput").value.toLowerCase().trim();
      const filtered = allProducts.filter(
        (item) =>
          item.name.toLowerCase().includes(key) ||
          item.category.toLowerCase().includes(key),
      );
      display(filtered);
    });
  })
  .catch((error) => console.log(error));

function getQualityBadge(grade) {
  const g = (grade || "").toLowerCase().trim();
  if (g === "high") return { color: "#16a34a", label: "High" };
  if (g === "medium") return { color: "#ca8a04", label: "Medium" };
  if (g === "standard") return { color: "#6b7280", label: "Standard" };
  return { color: "#16a34a", label: grade || "—" };
}

function display(products) {
  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = "<h3>No products yet.</h3>";
    return;
  }

  products.forEach((product) => {
    const badge = getQualityBadge(product.quality_grade);

    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <div class="image">
        <img src="${product.image_url}" alt="${product.name}" />
        <div class="quality-badge" style="background:${badge.color};">
          ${badge.label}
        </div>
      </div>
      <div class="content">
        <h3>${product.name}</h3>
        <p>${product.quantity_kg} kg available</p>
        <p class="price">₹${product.price_per_kg}/kg</p>
        <p class="market">Market: ₹${product.market_price_per_kg}/kg</p>
        <p class="harvest">Category: ${product.category}</p>
        <div class="buttons">
          <a href="../HTML/edit-f.html?id=${product.id}">
            <button class="edit-btn">Edit</button>
          </a>
          <button class="delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function deleteProduct(id) {
  if (!confirm("Delete this product?")) return;
  fetch(`${BASE_URL}/products/products/${id}`, { method: "DELETE" })
    .then((res) => {
      if (res.ok) {
        alert("Product deleted!");
        allProducts = allProducts.filter((p) => p.id !== id);
        display(allProducts);
      } else {
        alert("Delete failed!");
      }
    })
    .catch((err) => console.error("Delete error:", err));
}
