document.addEventListener("DOMContentLoaded", async function () {
  const BASE_URL = "https://full-stack-backend-omega.vercel.app";

  const vendorName = localStorage.getItem("vendor_name") || "Vendor";
  const vendorId = parseInt(localStorage.getItem("vendor_id"));

  document.querySelector(".header h1").textContent =
    `Welcome back, ${vendorName} 👋`;

  try {
    
    const ordersRes = await fetch(`${BASE_URL}/orders/orders/`);
    const allOrders = await ordersRes.json();

  
    const vendorOrders = allOrders.filter((o) => o.vendor_name === vendorName);

    const totalOrders = vendorOrders.length;
    const activeOrders = vendorOrders.filter(
      (o) =>
        o.status === "pending" ||
        o.status === "confirmed" ||
        o.status === "comformed" ||
        o.status === "shipped",
    ).length;
    const totalSpent = vendorOrders.reduce((sum, o) => sum + o.total_price, 0);

   
    const statNumbers = document.querySelectorAll(".stat-number");
    if (statNumbers[0]) statNumbers[0].textContent = totalOrders;
    if (statNumbers[1]) statNumbers[1].textContent = activeOrders;
    if (statNumbers[2])
      statNumbers[2].textContent = `₹${totalSpent.toLocaleString()}`;

   
    const ordersList = document.querySelector(".orders-list");
    if (ordersList) {
      ordersList.innerHTML = "";

      if (vendorOrders.length === 0) {
        ordersList.innerHTML = "<p>No orders yet</p>";
      } else {
        
        vendorOrders
          .slice(-3)
          .reverse()
          .forEach((order) => {
            const statusClass =
              order.status === "confirmed" || order.status === "comformed"
                ? "status-confirmed"
                : order.status === "shipped"
                  ? "status-shipped"
                  : order.status === "delivered"
                    ? "status-delivered"
                    : "status-pending";

            const item = document.createElement("div");
            item.className = "order-item";
            item.innerHTML = `
            <div class="order-info">
              <h3>Order #${String(order.id).padStart(4, "0")}</h3>
              <p class="order-details">${order.vendor_name}</p>
            </div>
            <div class="order-price-status">
              <p class="order-price">₹${order.total_price}</p>
              <span class="status ${statusClass}">${order.status.toUpperCase()}</span>
            </div>
          `;
            ordersList.appendChild(item);
          });
      }
    }
  } catch (err) {
    console.error("Error:", err);
  }
});
