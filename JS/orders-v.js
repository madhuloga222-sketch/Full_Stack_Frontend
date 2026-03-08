// const orders = [
//   {
//     id: "ORD001",
//     product: "Tomatoes",
//     farmer: "Rajesh Kumar",
//     quantity: "100 kg",
//     price: "₹3,000",
//     orderDate: "28/01/2026",
//     expected: "01/02/2026",
//     status: "Confirmed"
//   },
//   {
//     id: "ORD002",
//     product: "Potatoes",
//     farmer: "Rajesh Kumar",
//     quantity: "200 kg",
//     price: "₹5,000",
//     orderDate: "27/01/2026",
//     expected: "31/01/2026",
//     status: "Shipped"
//   },
//   {
//     id: "ORD003",
//     product: "Mangoes",
//     farmer: "Lakshmi Farms",
//     quantity: "50 kg",
//     price: "₹4,000",
//     orderDate: "29/01/2026",
//     expected: "TBD",
//     status: "Pending"
//   }
// ];

// const container = document.getElementById("ordersContainer");
// const filter = document.getElementById("orderFilter");

// function renderOrders(filteredOrders) {
//   container.innerHTML = "";

//   filteredOrders.forEach(order => {
//     const card = document.createElement("div");
//     card.classList.add("order-card");

//     card.innerHTML = `
//       <div class="order-top">
//         <div>
//           <h3>
//             ${order.product}
//             <span class="badge ${order.status.toLowerCase()}">
//               ${order.status.toUpperCase()}
//             </span>
//           </h3>
//           <p>Order ID: ${order.id}</p>
//         </div>
//         <h2 class="price">${order.price}</h2>
//       </div>

//       <div class="order-details">
//         <div><strong>Farmer:</strong> ${order.farmer}</div>
//         <div><strong>Quantity:</strong> ${order.quantity}</div>
//         <div><strong>Order Date:</strong> ${order.orderDate}</div>
//         <div><strong>Expected:</strong> ${order.expected}</div>
//       </div>

//       <div class="progress-line">
//         <span class="${order.status !== "Pending" ? "done" : ""}">Placed</span>
//         <span class="${order.status === "Confirmed" || order.status === "Shipped" ? "done" : ""}">Confirmed</span>
//         <span class="${order.status === "Shipped" ? "done" : ""}">Shipped</span>
//         <span class="${order.status === "Delivered" ? "done" : ""}">Delivered</span>
//       </div>
//     `;

//     container.appendChild(card);
//   });

//   updateStats();
// }

// function updateStats() {
//   document.getElementById("totalOrders").innerText = orders.length;
//   document.getElementById("pendingOrders").innerText =
//     orders.filter(o => o.status === "Pending").length;
//   document.getElementById("shippedOrders").innerText =
//     orders.filter(o => o.status === "Shipped").length;
//   document.getElementById("deliveredOrders").innerText =
//     orders.filter(o => o.status === "Delivered").length;
// }

// filter.addEventListener("change", () => {
//   const value = filter.value;

//   if (value === "All") {
//     renderOrders(orders);
//   } else {
//     const filtered = orders.filter(o => o.status === value);
//     renderOrders(filtered);
//   }
// });

// renderOrders(orders);

// const container = document.getElementById("ordersContainer");
// const filter = document.getElementById("orderFilter");

// let allOrders = [];

// fetch("http://127.0.0.1:8000/orders/orders/")
//   .then((res) => res.json())
//   .then((data) => {
//     allOrders = data;
//     renderOrders(allOrders);
//   })
//   .catch((error) => console.log("Fetch Error:", error));

// function renderOrders(filteredOrders) {
//   container.innerHTML = "";

//   if (filteredOrders.length === 0) {
//     container.innerHTML = "<h3>No Orders Found</h3>";
//     return;
//   }

//   filteredOrders.forEach(order => {
//     const card = document.createElement("div");
//     card.classList.add("order-card");

//     card.innerHTML = `
//       <div class="order-top">
//         <div>
//           <h3>
//             ${order.product_name}
//             <span class="badge ${order.status.toLowerCase()}">
//               ${order.status.toUpperCase()}
//             </span>
//           </h3>
//           <p>Order ID: ${order.id}</p>
//         </div>
//         <h2 class="price">₹${order.total_price}</h2>
//       </div>

//       <div class="order-details">
//         <div><strong>Farmer:</strong> ${order.farmer_name}</div>
//         <div><strong>Quantity:</strong> ${order.quantity} kg</div>
//         <div><strong>Order Date:</strong> ${order.order_date}</div>
//         <div><strong>Expected:</strong> ${order.expected_date || "TBD"}</div>
//       </div>

//       <div class="progress-line">
//         <span class="${order.status !== "Pending" ? "done" : ""}">Placed</span>
//         <span class="${order.status === "Confirmed" || order.status === "Shipped" || order.status === "Delivered" ? "done" : ""}">Confirmed</span>
//         <span class="${order.status === "Shipped" || order.status === "Delivered" ? "done" : ""}">Shipped</span>
//         <span class="${order.status === "Delivered" ? "done" : ""}">Delivered</span>
//       </div>
//     `;

//     container.appendChild(card);
//   });

//   updateStats();
// }

// function updateStats() {
//   document.getElementById("totalOrders").innerText = allOrders.length;

//   document.getElementById("pendingOrders").innerText =
//     allOrders.filter(o => o.status === "Pending").length;

//   document.getElementById("shippedOrders").innerText =
//     allOrders.filter(o => o.status === "Shipped").length;

//   document.getElementById("deliveredOrders").innerText =
//     allOrders.filter(o => o.status === "Delivered").length;
// }

// filter.addEventListener("change", () => {
//   const value = filter.value;

//   if (value === "All") {
//     renderOrders(allOrders);
//   } else {
//     const filtered = allOrders.filter(o => o.status === value);
//     renderOrders(filtered);
//   }
// });

const container = document.getElementById("ordersContainer");
const filter = document.getElementById("orderFilter");

let allOrders = [];

fetch("http://127.0.0.1:8000/orders/orders/")
  .then((res) => res.json())
  .then((data) => {
    console.log("API DATA:", data); // keep for debugging
    allOrders = data;
    renderOrders(allOrders);
  })
  .catch((error) => console.log("Fetch Error:", error));

function renderOrders(filteredOrders) {
  container.innerHTML = "";

  if (!filteredOrders || filteredOrders.length === 0) {
    container.innerHTML = "<h3>No Orders Found</h3>";
    return;
  }

  filteredOrders.forEach((order) => {
    const productName =
      order.product_name ||
      order.product?.name ||
      order.product?.product_name ||
      "N/A";

    const farmerName =
      order.farmer_name ||
      order.farmer?.name ||
      order.farmer?.farmer_name ||
      "N/A";

    const quantity = order.quantity ?? 0;
    const orderDate = order.order_date || order.created_at || "N/A";
    const expectedDate = order.expected_date || "TBD";
    const totalPrice = order.total_price ?? order.price ?? 0;
    const status = order.status || "Pending";

    const card = document.createElement("div");
    card.classList.add("order-card");

    card.innerHTML = `
      <div class="order-top">
        <div>
          <h3>
            ${productName}
            <span class="badge ${status.toLowerCase()}">
              ${status.toUpperCase()}
            </span>
          </h3>
          <p>Order ID: ${order.id}</p>
        </div>
        <h2 class="price">₹${totalPrice}</h2>
      </div>

      <div class="order-details">
        <div><strong>Farmer:</strong> ${farmerName}</div>
        <div><strong>Quantity:</strong> ${quantity} kg</div>
        <div><strong>Order Date:</strong> ${orderDate}</div>
        <div><strong>Expected:</strong> ${expectedDate}</div>
      </div>

      <div class="progress-line">
        <span class="${status !== "Pending" ? "done" : ""}">Placed</span>
        <span class="${["Confirmed", "Shipped", "Delivered"].includes(status) ? "done" : ""}">Confirmed</span>
        <span class="${["Shipped", "Delivered"].includes(status) ? "done" : ""}">Shipped</span>
        <span class="${status === "Delivered" ? "done" : ""}">Delivered</span>
      </div>
    `;

    container.appendChild(card);
  });

  updateStats();
}

function updateStats() {
  document.getElementById("totalOrders").innerText = allOrders.length;

  document.getElementById("pendingOrders").innerText = allOrders.filter(
    (o) => (o.status || "") === "Pending",
  ).length;

  document.getElementById("shippedOrders").innerText = allOrders.filter(
    (o) => (o.status || "") === "Shipped",
  ).length;

  document.getElementById("deliveredOrders").innerText = allOrders.filter(
    (o) => (o.status || "") === "Delivered",
  ).length;
}

filter.addEventListener("change", () => {
  const value = filter.value;

  if (value === "All") {
    renderOrders(allOrders);
  } else {
    const filtered = allOrders.filter((o) => (o.status || "") === value);
    renderOrders(filtered);
  }
});
