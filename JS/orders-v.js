const container = document.getElementById("ordersContainer");
const filter = document.getElementById("orderFilter");

let allOrders = [];

const BASE_URL = "https://full-stack-backend-omega.vercel.app";
const vendorName = localStorage.getItem("vendor_name");

Promise.all([
  fetch(`${BASE_URL}/orders/orders/`).then((res) => res.json()),
  fetch(`${BASE_URL}/farmers/farmers/`).then((res) => res.json()),
])
  .then(([ordersData, farmersData]) => {
    const farmerMap = {};
    farmersData.forEach((f) => {
      farmerMap[f.id] = f.full_name || f.name || "Unknown";
    });

    allOrders = vendorName
      ? ordersData.filter(
          (o) =>
            (o.vendor_name || "").toLowerCase() === vendorName.toLowerCase(),
        )
      : ordersData;

    allOrders = allOrders.map((o) => ({
      ...o,
      farmer_name: farmerMap[o.farmer_id] || "N/A",
    }));

    renderOrders(allOrders);
  })
  .catch((error) => console.log("Fetch Error:", error));

function getProgressIndex(status) {
  const s = (status || "").trim().toLowerCase();
  if (s === "pending") return 0;
  if (s === "confirmed" || s === "comformed") return 1;
  if (s === "shipped") return 2;
  if (s === "delivered") return 3;
  return 0;
}

function renderOrders(filteredOrders) {
  container.innerHTML = "";

  if (!filteredOrders || filteredOrders.length === 0) {
    container.innerHTML = "<h3 style='padding:20px'>No Orders Found</h3>";
    updateStats();
    return;
  }

  filteredOrders.forEach((order) => {
    const status = (order.status || "pending").trim().toLowerCase();
    const idx = getProgressIndex(status);
    const isPaid = status === "delivered";

    const badgeClass =
      status === "confirmed" || status === "comformed"
        ? "confirmed"
        : status === "shipped"
          ? "shipped"
          : status === "delivered"
            ? "delivered"
            : "pending";

    const paymentBadge = isPaid
      ? `<span style="color:#065f46;
        background:#d1fae5;
        padding:2px 10px;
        border-radius:12px;
        font-size:13px;
        font-weight:600;">PAID
        </span>`
      : `<span style="color:#991b1b;
        background:#fee2e2;
        padding:2px 10px;
        border-radius:12px;
        font-size:13px;
        font-weight:600;">UNPAID
        </span>`;

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
      </div>

      <div class="order-details">
        <div><strong>Farmer:</strong> ${order.farmer_name}</div>
        <div><strong>Vendor:</strong> ${order.vendor_name || "N/A"}</div>
        <div><strong>Payment:</strong> ${paymentBadge}</div>
      </div>

      <div class="progress-line">
        <span class="done">Placed</span>
        <span class="${idx >= 1 ? "done" : ""}">Confirmed</span>
        <span class="${idx >= 2 ? "done" : ""}">Shipped</span>
        <span class="${idx >= 3 ? "done" : ""}">Delivered</span>
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

  if (total) total.textContent = allOrders.length;
  if (pending)
    pending.textContent = allOrders.filter(
      (o) => (o.status || "").trim().toLowerCase() === "pending",
    ).length;
  if (shipped)
    shipped.textContent = allOrders.filter(
      (o) => (o.status || "").trim().toLowerCase() === "shipped",
    ).length;
  if (delivered)
    delivered.textContent = allOrders.filter(
      (o) => (o.status || "").trim().toLowerCase() === "delivered",
    ).length;
}

if (filter) {
  filter.addEventListener("change", () => {
    const value = filter.value.toLowerCase();
    if (value === "all") {
      renderOrders(allOrders);
    } else {
      const filtered = allOrders.filter(
        (o) => (o.status || "").trim().toLowerCase() === value,
      );
      renderOrders(filtered);
    }
  });
}
