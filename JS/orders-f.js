document.addEventListener("DOMContentLoaded", loadOrders);

const BASE_URL = "https://full-stack-backend-omega.vercel.app";

async function loadOrders() {
  const container = document.getElementById("ordersContainer");

  if (!container) {
    console.error("ordersContainer not found");
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/orders/orders/`);
    if (!response.ok) throw new Error("Failed to fetch orders");

    const orders = await response.json();

    const farmerId = parseInt(localStorage.getItem("farmer_id"));
    const farmerOrders = farmerId
      ? orders.filter((o) => o.farmer_id === farmerId)
      : orders;

    container.innerHTML = "";

    if (farmerOrders.length === 0) {
      container.innerHTML = "<p style='padding:20px'>No orders yet</p>";
      return;
    }

    farmerOrders.forEach((order) => renderOrder(order, container));
  } catch (error) {
    console.error("Error loading orders:", error);
    container.innerHTML = "<p>Failed to load orders</p>";
  }
}

function getBadgeClass(status) {
  if (status === "confirmed" || status === "comformed") return "confirmed";
  if (status === "shipped") return "shipped";
  if (status === "delivered") return "delivered";
  if (status === "pending") return "pending";
  return "";
}

function renderOrder(order, container) {
  const card = document.createElement("div");
  card.className = "order-card";
  card.id = `order-${order.id}`;

  const badgeClass = getBadgeClass(order.status);
  const isPaid = order.status === "delivered";
  
  const orderDates = JSON.parse(localStorage.getItem("order_dates") || "{}");
  const rawDate =
    order.created_at || order.order_date || orderDates[order.id] || null;
  const orderDate = rawDate
    ? new Date(rawDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "N/A";

  card.innerHTML = `
    <div class="top">
      <div>
        <h2>Order #${String(order.id).padStart(4, "0")}
          <span class="badge ${badgeClass}">${order.status.toUpperCase()}</span>
        </h2>
        <p class="order-id">Order ID: ${String(order.id).padStart(4, "0")}</p>
      </div>
    </div>

    <div class="details">
      <div>
        <small>Vendor Name</small>
        <p><strong>${order.vendor_name || "N/A"}</strong></p>
      </div>
      <div>
        <small>Farmer ID</small>
        <p><strong>${order.farmer_id}</strong></p>
      </div>
      <div>
        <small>Status</small>
        <p><strong>${order.status}</strong></p>
      </div>
      <div>
        <small>Payment</small>
        <p><strong style="
          color: ${isPaid ? "#065f46" : "#991b1b"};
          padding: 2px 10px;
          border-radius: 12px;
          font-size: 13px;
        ">${isPaid ? "PAID" : "UNPAID"}</strong></p>
      </div>
    </div>

    ${getButton(order.status, order.id)}
  `;

  container.appendChild(card);
}

function getButton(status, orderId) {
  if (status === "pending") {
    return `<button class="btn blue" onclick="updateStatus(${orderId}, 'confirmed')">Mark as Confirmed</button>`;
  } else if (status === "confirmed" || status === "comformed") {
    return `<button class="btn blue" onclick="updateStatus(${orderId}, 'shipped')">Mark as Shipped</button>`;
  } else if (status === "shipped") {
    return `<button class="btn green" onclick="updateStatus(${orderId}, 'delivered')">Mark as Delivered</button>`;
  } else {
    return `<button class="btn" style="background:#999" disabled>Delivered</button>`;
  }
}

async function updateStatus(orderId, newStatus) {
  try {
    const res = await fetch(`${BASE_URL}/orders/orders/${orderId}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) {
      alert(`Order marked as ${newStatus}!`);
      loadOrders();
    } else {
      const err = await res.json();
      console.error("Update failed:", err);
      alert("Status update failed!");
    }
  } catch (err) {
    console.error("Error:", err);
  }
}
