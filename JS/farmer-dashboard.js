document.addEventListener("DOMContentLoaded", async function () {
  const BASE_URL = "https://full-stack-backend-omega.vercel.app";

  const farmerName =
    localStorage.getItem("farmer_name") ||
    JSON.parse(localStorage.getItem("farmer") || "{}").name;
  const farmerEmail =
    localStorage.getItem("farmer_email") ||
    JSON.parse(localStorage.getItem("farmer") || "{}").email;
  const farmerPhone =
    localStorage.getItem("farmer_phone") ||
    JSON.parse(localStorage.getItem("farmer") || "{}").phone;
  const farmerLocation =
    localStorage.getItem("farmer_location") ||
    JSON.parse(localStorage.getItem("farmer") || "{}").location;

  const farmerId =
    localStorage.getItem("farmer_id") ||
    String(JSON.parse(localStorage.getItem("farmer") || "{}").id || "");

  console.log("farmer_name:", farmerName);
  console.log("farmer_email:", farmerEmail);
  console.log("farmer_id:", farmerId);

  if (!farmerName) {
    alert("Please login first!");
    window.location.href = "../index.html";
    return;
  }

  document.querySelector(".profile-name").textContent = farmerName;
  document.querySelector(".profile-email").textContent = farmerEmail;

  const avatar = document.querySelector(".profile-avatar");
  if (avatar) avatar.textContent = farmerName.charAt(0).toUpperCase();

  const headerAvatar = document.querySelector(".user-avatar");
  if (headerAvatar)
    headerAvatar.textContent = farmerName.charAt(0).toUpperCase();

  const details = document.querySelectorAll(".detail-value");
  if (details[0]) details[0].textContent = farmerName;
  if (details[1]) details[1].textContent = farmerEmail;
  if (details[2]) details[2].textContent = farmerPhone || "N/A";
  if (details[3]) details[3].textContent = farmerLocation || "N/A";

  try {
    const [productsRes, ordersRes, reviewsRes] = await Promise.all([
      fetch(`${BASE_URL}/products/products/`),
      fetch(`${BASE_URL}/orders/orders/`),
      fetch(`${BASE_URL}/review/reviews/`),
    ]);

    const allProducts = await productsRes.json();
    const allOrders = await ordersRes.json();
    const allReviews = await reviewsRes.json();

    const farmerProducts = farmerId
      ? allProducts.filter((p) => String(p.farmer_id) === String(farmerId))
      : allProducts;
    const farmerOrders = farmerId
      ? allOrders.filter((o) => String(o.farmer_id) === String(farmerId))
      : allOrders;
    const farmerReviews = farmerId
      ? allReviews.filter((r) => String(r.farmer_id) === String(farmerId))
      : allReviews;

    const greenEl = document.querySelector(".stat-value.green");
    if (greenEl) greenEl.textContent = farmerProducts.length;

    const blueEl = document.querySelector(".stat-value.blue");
    if (blueEl) blueEl.textContent = farmerOrders.length;

    const orangeEl = document.querySelector(".stat-value.orange");
    if (orangeEl) {
      if (farmerReviews.length > 0) {
        const avg =
          farmerReviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
          farmerReviews.length;
        orangeEl.textContent = (Math.round(avg * 10) / 10).toFixed(1);
      } else {
        orangeEl.textContent = "0.0";
      }
    }

    const blackEl = document.querySelector(".stat-value.black");
    if (blackEl) {
      const joinDate =
        localStorage.getItem("farmer_join_date") ||
        JSON.parse(localStorage.getItem("farmer") || "{}").created_at;
      if (joinDate) {
        const join = new Date(joinDate);
        const now = new Date();
        const months =
          (now.getFullYear() - join.getFullYear()) * 12 +
          (now.getMonth() - join.getMonth());
        blackEl.textContent =
          months <= 0
            ? "< 1 Month"
            : months === 1
              ? "1 Month"
              : `${months} Months`;
      } else {
        blackEl.textContent = "N/A";
      }
    }
  } catch (err) {
    console.error("Statistics error:", err);
  }
});
