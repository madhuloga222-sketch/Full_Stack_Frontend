// const container = document.getElementById("productContainer");

// const BASE_URL = "https://full-stack-backend-omega.vercel.app";

// fetch(`${BASE_URL}/products/products/`)
//   .then((res) => res.json())
//   .then((data) => {
//     display(data);

//     const btn = document.getElementById("btnId");

//     btn.addEventListener("click", function () {
//       const key = document
//         .getElementById("searchInput")
//         .value.toLowerCase()
//         .trim();

//       const filteredArr = data.filter(
//         (item) =>
//           item.name.toLowerCase().includes(key) ||
//           item.category.toLowerCase().includes(key),
//       );

//       display(filteredArr);
//     });
//   })
//   .catch((error) => console.log(error));

//   // https://full-stack-backend-omega.vercel.app/products/products/

// function display(products) {
//   container.innerHTML = "";

//   if (products.length === 0) {
//     container.innerHTML = "<h3>No results found</h3>";
//     return;
//   }

//   products.forEach((product) => {
//     const card = document.createElement("div");
//     card.classList.add("product-card");

//     card.innerHTML = `
//       <div class="image">
//         <img src="${product.image_url}" alt="${product.name}" />
//         <span class="tag premium">${product.quality_grade}</span>
//       </div>

//       <div class="content">
//         <h3>${product.name}</h3>
//         <p>${product.quantity_kg} kg available</p>
//         <p class="price">₹${product.price_per_kg}/kg</p>
//         <p class="market">Market: ₹${product.market_price_per_kg}/kg</p>
//         <p class="harvest">Category: ${product.category}</p>

//         <div class="buttons">
//           <a href="../HTML/contact-f.html?
//           farmer_id=${product.farmer_id}
//           &product=${product.name}
//           &price=${product.price_per_kg}
//           ">
//           <button class="edit-btn">Contact</button>
//           </a>
//           <a href="../HTML/orders-products-v.html?
//           id=${product.id}
//           &price=${product.price_per_kg}
//           &farmer_id=${product.farmer_id}
//           ">
//           <button class="view-btn">Order</button>
//           </a>
//         </div>
//       </div>
//     `;

//     container.appendChild(card);
//   });
// }

const container = document.getElementById("productContainer");

const BASE_URL = "https://full-stack-backend-omega.vercel.app";

fetch(`${BASE_URL}/products/products/`)
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
          item.category.toLowerCase().includes(key),
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

    // Fix: Build URLs cleanly — no line breaks or spaces inside template literals
    const contactURL = `../HTML/contact-f.html?farmer_id=${product.farmer_id}&product=${encodeURIComponent(product.name)}&price=${product.price_per_kg}`;
    const orderURL = `../HTML/orders-products-v.html?id=${product.id}&price=${product.price_per_kg}&farmer_id=${product.farmer_id}`;

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
          <a href="${contactURL}">
            <button class="edit-btn">Contact</button>
          </a>
          <a href="${orderURL}">
            <button class="view-btn">Order</button>
          </a>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}
