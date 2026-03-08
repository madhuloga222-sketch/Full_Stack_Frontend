// const products = [
//   {
//     name: "Tomatoes",
//     image: "../ASSETS/fs1.jpg",
//     quantity: "500 kg available",
//     price: "₹45/kg",
//     market: "₹52/kg",
//     demand: "High",
//     category: "Vegetables",
//   },
//   {
//     name: "Potatoes",
//     image: "../ASSETS/fs2.jpeg",
//     quantity: "1000 kg available",
//     price: "₹35/kg",
//     market: "₹42/kg",
//     demand: "Medium",
//     category: "Vegetables",
//   },
//   {
//     name: "Carrot",
//     image: "../ASSETS/full stack img4.webp",
//     quantity: "300 kg available",
//     price: "₹55/kg",
//     market: "₹48/kg",
//     demand: "High",
//     category: "Vegetables",
//   },
//   {
//     name: "Mango",
//     image: "../ASSETS/mango.jpg",
//     quantity: "400 kg available",
//     price: "₹35/kg",
//     market: "₹50/kg",
//     demand: "High",
//     category: "Fruits",
//   },
//   {
//     name: "Banana",
//     image: "../ASSETS/banana.webp",
//     quantity: "600 kg available",
//     price: "₹60/kg",
//     market: "₹90/kg",
//     demand: "High",
//     category: "Fruits",
//   },
//   {
//     name: "Pearl Millet (Kambu)",
//     image: "../ASSETS/pearl millet.jpg",
//     quantity: "600 kg available",
//     price: "₹90/kg",
//     market: "₹120/kg",
//     demand: "High",
//     category: "Grains",
//   },
// ];

// const container = document.getElementById("productContainer");

// products.forEach((product) => {
//   const card = document.createElement("div");
//   card.classList.add("product-card");

//   card.innerHTML = `
//     <div class="image">
//       <img src="${product.image}" alt="${product.name}" />
//       <span class="tag premium">Fresh</span>
//     </div>
//     <div class="content">
//       <h3>${product.name}</h3>
//       <p>${product.quantity}</p>
//       <p class="price">${product.price}</p>
//       <p class="market">Market:₹ ${product.market}</p>
//       <div class="rating">
//         <span class="demand ${product.demand.toLowerCase()}">
//           ${product.demand}
//         </span>
//       </div>
//       <p class="harvest">Category: ${product.category}</p>
//       <div class="buttons">
//         <a href="../HTML/contact-f.html">
//           <button class="edit-btn">Contact</button>
//         </a>
//         <a href="../HTML/orders-v.html">
//           <button class="view-btn">Order</button>
//         </a>
//       </div>
//     </div>
//   `;

//   container.appendChild(card);
// });

const container = document.getElementById("productContainer");

fetch("http://127.0.0.1:8000/products/products/")
  .then((res) => res.json())
  .then((data) => {
    display(data);

    const btn = document.getElementById("btnId");

    btn.addEventListener("click", function () {
      const key = document
        .getElementById("searchInput")
        .value.toLowerCase()
        .trim();

      const filteredArr = data.filter(
        (item) =>
          item.name.toLowerCase().includes(key) ||
          item.category.toLowerCase().includes(key)
      );

      display(filteredArr);
    });
  })
  .catch((error) => console.log(error));

function display(products) {
  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = "<h3>No results found</h3>";
    return;
  }

  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <div class="image">
        <img src="${product.image_url}" alt="${product.name}" />
        <span class="tag premium">${product.quality_grade}</span>
      </div>

      <div class="content">
        <h3>${product.name}</h3>
        <p>${product.quantity_kg} kg available</p>
        <p class="price">₹${product.price_per_kg}/kg</p>
        <p class="market">Market: ₹${product.market_price_per_kg}/kg</p>
        <p class="harvest">Category: ${product.category}</p>

        <div class="buttons">
          <a href="../HTML/contact-f.html">
            <button class="edit-btn">Contact</button>
          </a>
          <a href="../HTML/orders-v.html">
            <button class="view-btn">Order</button>
          </a>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}
