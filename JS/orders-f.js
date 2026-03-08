// const orders = [
//   {
//     product: "Tomatoes",
//     status: "confirmed",
//     orderId: "ORD001",
//     amount: 3000,
//     payment: "Paid",
//     vendor: "Suresh Traders",
//     quantity: 100,
//     date: "28/01/2026",
//     price: 30,
//   },
//   {
//     product: "Potatoes",
//     status: "shipped",
//     orderId: "ORD002",
//     amount: 5000,
//     payment: "Paid",
//     vendor: "Suresh Traders",
//     quantity: 200,
//     date: "27/01/2026",
//     price: 25,
//   }
// ];

// const container = document.getElementById("ordersContainer");

// orders.forEach((order) => {

//   const card = document.createElement("div");
//   card.className = "order-card";

//   // TOP SECTION
//   const top = document.createElement("div");
//   top.className = "top";

//   const left = document.createElement("div");

//   const title = document.createElement("h2");

//   const badge = document.createElement("span");
//   badge.className = "badge " + order.status;
//   badge.innerText = order.status.toUpperCase();

//   title.append(order.product + " ");
//   title.appendChild(badge);

//   const orderId = document.createElement("p");
//   orderId.className = "order-id";
//   orderId.innerText = "Order ID: " + order.orderId;

//   left.appendChild(title);
//   left.appendChild(orderId);

//   const amountDiv = document.createElement("div");
//   amountDiv.className = "amount";

//   const amount = document.createElement("h2");
//   amount.innerText = "₹" + order.amount.toLocaleString();

//   const payment = document.createElement("span");
//   payment.className = "paid";
//   payment.innerText = order.payment;

//   amountDiv.appendChild(amount);
//   amountDiv.appendChild(payment);

//   top.appendChild(left);
//   top.appendChild(amountDiv);

//   // DETAILS SECTION
//   const details = document.createElement("div");
//   details.className = "details";

//   details.innerHTML = `
//     <div>
//       <small>Vendor</small>
//       <p><strong>${order.vendor}</strong></p>
//     </div>
//     <div>
//       <small>Quantity</small>
//       <p><strong>${order.quantity} kg</strong></p>
//     </div>
//     <div>
//       <small>Order Date</small>
//       <p><strong>${order.date}</strong></p>
//     </div>
//     <div>
//       <small>Price/Unit</small>
//       <p><strong>₹${order.price}</strong></p>
//     </div>
//   `;

//   // BUTTON
//   const button = document.createElement("button");

//   if (order.status === "confirmed") {
//     button.className = "btn blue";
//     button.innerText = "Mark as Shipped";
//   } else if (order.status === "shipped") {
//     button.className = "btn green";
//     button.innerText = "Mark as Delivered";
//   } else {
//     button.className = "btn";
//     button.innerText = "View Details";
//   }

//   // APPEND EVERYTHING
//   card.appendChild(top);
//   card.appendChild(details);
//   card.appendChild(button);

//   container.appendChild(card);

// });

document.addEventListener("DOMContentLoaded", loadOrders);

const BASE_URL = "http://127.0.0.1:8000";

async function loadOrders() {
  const container = document.getElementById("ordersContainer");

  if (!container) {
    console.error("ordersContainer not found in HTML");
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/orders/orders`);

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    const orders = await response.json();

    container.innerHTML = "";

    if (orders.length === 0) {
      container.innerHTML = "<p>No orders available</p>";
      return;
    }

    orders.forEach((order) => {
      const card = document.createElement("div");
      card.className = "order-card";

      // TOP SECTION
      const top = document.createElement("div");
      top.className = "top";

      const left = document.createElement("div");

      const title = document.createElement("h2");
      title.textContent = order.product_name;

      const badge = document.createElement("span");
      badge.className = "badge " + order.status;
      badge.textContent = order.status.toUpperCase();

      title.appendChild(badge);

      const orderId = document.createElement("p");
      orderId.className = "order-id";
      orderId.textContent = "Order ID: " + order.id;

      left.appendChild(title);
      left.appendChild(orderId);

      const amountDiv = document.createElement("div");
      amountDiv.className = "amount";

      const amount = document.createElement("h2");
      amount.textContent = "₹" + order.total_amount;

      const payment = document.createElement("span");
      payment.className = "paid";
      payment.textContent = "Paid";

      amountDiv.appendChild(amount);
      amountDiv.appendChild(payment);

      top.appendChild(left);
      top.appendChild(amountDiv);

      // DETAILS
      const details = document.createElement("div");
      details.className = "details";

      details.innerHTML = `
        <div>
          <small>Vendor</small>
          <p><strong>${order.vendor_name}</strong></p>
        </div>

        <div>
          <small>Quantity</small>
          <p><strong>${order.quantity} kg</strong></p>
        </div>

        <div>
          <small>Price</small>
          <p><strong>₹${order.price}</strong></p>
        </div>
      `;

      // BUTTON
      const button = document.createElement("button");

      if (order.status === "confirmed") {
        button.className = "btn blue";
        button.textContent = "Mark as Shipped";
      } else if (order.status === "shipped") {
        button.className = "btn green";
        button.textContent = "Mark as Delivered";
      } else {
        button.className = "btn";
        button.textContent = "View Details";
      }

      // APPEND
      card.appendChild(top);
      card.appendChild(details);
      card.appendChild(button);

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading orders:", error);
    container.innerHTML = "<p>Failed to load orders</p>";
  }
}