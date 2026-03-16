const container = document.getElementById("ordersContainer");
const filter = document.getElementById("orderFilter");

let allOrders = [];

const BASE_URL = "https://full-stack-backend-omega.vercel.app";

fetch(`${BASE_URL}/orders/orders/`)
  .then((res) => res.json())
  .then((data) => {
    console.log("API DATA:", data);
    console.log("vendor_name in storage:", localStorage.getItem("vendor_name"));

    allOrders = data;
    renderOrders(allOrders);
  })
  .catch((error) => console.log("Fetch Error:", error));

  // https://full-stack-backend-omega.vercel.app/orders/orders/

function renderOrders(filteredOrders) {
  container.innerHTML = "";

  if (!filteredOrders || filteredOrders.length === 0) {
    container.innerHTML = "<h3>No Orders Found</h3>";
    return;
  }

  filteredOrders.forEach((order) => {
    const status = (order.status || "pending").toLowerCase();

    const badgeClass =
      status === "confirmed" || status === "comformed"
        ? "confirmed"
        : status === "shipped"
          ? "shipped"
          : status === "delivered"
            ? "delivered"
            : "pending";

    const card = document.createElement("div");
    card.classList.add("order-card");

    card.innerHTML = `
      <div class="order-top">
        <div>
          <h3>
            Order #${String(order.id).padStart(4, "0")}
            <span class="badge ${badgeClass}">${status.toUpperCase()}</span>
          </h3>
          <p>Order ID: ${String(order.id).padStart(4, "0")}</p>
        </div>
        <h2 class="price">₹${order.total_price}</h2>
      </div>

      <div class="order-details">
        <div><strong>Vendor:</strong> ${order.vendor_name || "N/A"}</div>
        <div><strong>Farmer ID:</strong> ${order.farmer_id}</div>
        <div><strong>Total Price:</strong> ₹${order.total_price}</div>
        <div><strong>Status:</strong> ${status}</div>
      </div>

      <div class="progress-line">
        <span class="done">Placed</span>
        <span class="${["confirmed", "comformed", "shipped", "delivered"].includes(status) ? "done" : ""}">Confirmed</span>
        <span class="${["shipped", "delivered"].includes(status) ? "done" : ""}">Shipped</span>
        <span class="${status === "delivered" ? "done" : ""}">Delivered</span>
      </div>
    `;

    container.appendChild(card);
  });

  updateStats();
}

function updateStats() {
  const total = document.getElementById("totalOrders");
  const pending = document.getElementById("pendingOrders");
  const shipped = document.getElementById("shippedOrders");
  const delivered = document.getElementById("deliveredOrders");

  if (total) total.innerText = allOrders.length;
  if (pending)
    pending.innerText = allOrders.filter(
      (o) => (o.status || "").toLowerCase() === "pending",
    ).length;
  if (shipped)
    shipped.innerText = allOrders.filter(
      (o) => (o.status || "").toLowerCase() === "shipped",
    ).length;
  if (delivered)
    delivered.innerText = allOrders.filter(
      (o) => (o.status || "").toLowerCase() === "delivered",
    ).length;
}
// 
if (filter) {
  filter.addEventListener("change", () => {
    const value = filter.value.toLowerCase();
    if (value === "all") {
      renderOrders(allOrders);
    } else {
      const filtered = allOrders.filter(
        (o) => (o.status || "").toLowerCase() === value,
      );
      renderOrders(filtered);
    }
  });
}
