// document.addEventListener("DOMContentLoaded", loadEarnings);

// const BASE_URL = "https://full-stack-backend-omega.vercel.app";

// async function loadEarnings() {
//   const transactionList = document.getElementById("transactionList");

//   try {
//     const response = await fetch(`${BASE_URL}/earning/earnings/`);

//     if (!response.ok) throw new Error("Failed to fetch earnings");

//     const earnings = await response.json();
//     console.log("Earnings:", earnings);

//     // Stats calculate
//     const totalEarnings = earnings.reduce((sum, e) => sum + e.amount, 0);
//     const completedCount = earnings.filter(
//       (e) => e.status === "completed",
//     ).length;
//     const pendingEarnings = earnings
//       .filter((e) => e.status === "pending")
//       .reduce((sum, e) => sum + e.amount, 0);
//     const pendingCount = earnings.filter((e) => e.status === "pending").length;

//     const currentMonth = new Date().getMonth();
//     const currentYear = new Date().getFullYear();
//     const monthEarnings = earnings
//       .filter((e) => {
//         const d = new Date(e.date);
//         return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
//       })
//       .reduce((sum, e) => sum + e.amount, 0);

//     // Stats update
//     document.getElementById("totalEarnings").textContent =
//       `₹${totalEarnings.toLocaleString()}`;
//     document.getElementById("monthEarnings").textContent =
//       `₹${monthEarnings.toLocaleString()}`;
//     document.getElementById("pendingAmount").textContent =
//       `₹${pendingEarnings.toLocaleString()}`;
//     document.getElementById("completedCount").textContent =
//       `From ${completedCount} completed orders`;
//     document.getElementById("pendingCount").textContent =
//       `${pendingCount} pending orders`;

//     transactionList.innerHTML = "";

//     if (earnings.length === 0) {
//       transactionList.innerHTML = "<p>No transactions found</p>";
//       return;
//     }

//     earnings.forEach((earning) => {
//       const formattedDate = new Date(earning.date).toLocaleDateString("en-IN", {
//         day: "numeric",
//         month: "short",
//         year: "numeric",
//       });

//       const item = document.createElement("div");
//       item.className = "transaction-item";
//       item.innerHTML = `
//         <div class="transaction-left">
//           <div class="transaction-icon">
//             <img src="../ASSETS/Fair & Transparent Pricing1.png" width="40px" height="40px" />
//           </div>
//           <div class="transaction-details">
//             <h3>${earning.product_name}</h3>
//             <div class="transaction-meta">${earning.buyer_name} • ${earning.quantity} kg</div>
//             <div class="transaction-date">${formattedDate}</div>
//           </div>
//         </div>
//         <div class="transaction-right">
//           <div class="transaction-amount">+₹${earning.amount.toLocaleString()}</div>
//           <div class="transaction-status ${earning.status}">${earning.status}</div>
//         </div>
//       `;
//       transactionList.appendChild(item);
//     });
//   } catch (error) {
//     console.error("Error loading earnings:", error);
//     if (transactionList)
//       transactionList.innerHTML = "<p>Failed to load earnings</p>";
//   }
// }
