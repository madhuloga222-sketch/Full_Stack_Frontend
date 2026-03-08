// Calculate totals
let total = 0;
let pending = 0;

transactions.forEach((item) => {
  if (item.status === "Completed") {
    total += item.amount;
  }
  if (item.status === "Pending") {
    pending += item.amount;
  }
});

// Update cards
document.getElementById("totalEarnings").innerText = "₹" + total;
document.getElementById("monthEarnings").innerText = "₹" + total;
document.getElementById("pendingAmount").innerText = "₹" + pending;

// Display Transactions
const list = document.getElementById("transactionList");

transactions.forEach((item) => {
  const div = document.createElement("div");
  div.className = "transaction-item";

  div.innerHTML = `
    <div class="transaction-left">
      <div class="transaction-details">
        <h3>${item.product}</h3>
        <div class="transaction-meta">${item.buyer} • ${item.quantity} kg</div>
        <div class="transaction-date">${item.date}</div>
      </div>
    </div>
    <div class="transaction-right">
      <div class="transaction-amount ${item.status === "Pending" ? "orange" : ""}">
        +₹${item.amount}
      </div>
      <div class="transaction-status">${item.status}</div>
    </div>
  `;

  list.appendChild(div);
});
