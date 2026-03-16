document.addEventListener("DOMContentLoaded", async function () {
  const BASE_URL = "https://full-stack-backend-omega.vercel.app";

  const farmerId = parseInt(localStorage.getItem("farmer_id"));
  const farmerName = localStorage.getItem("farmer_name") || "Farmer";

  document.querySelector(".welcome h1").textContent =
    `Welcome back, ${farmerName}! 👋`;

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
      ? allProducts.filter((p) => p.farmer_id === farmerId)
      : allProducts;

    const farmerOrders = farmerId
      ? allOrders.filter((o) => o.farmer_id === farmerId)
      : allOrders;

    const farmerReviews = farmerId
      ? allReviews.filter((r) => r.farmer_id === farmerId)
      : allReviews;

    const totalProductsEl = document.getElementById("stat-total-products");
    const activeOrdersEl = document.getElementById("stat-active-orders");
    const avgRatingEl = document.getElementById("stat-avg-rating");

    if (totalProductsEl) totalProductsEl.textContent = farmerProducts.length;

    if (activeOrdersEl)
      activeOrdersEl.textContent = farmerOrders.filter((o) =>
        ["pending", "confirmed", "comformed", "shipped"].includes(
          (o.status || "").toLowerCase(),
        ),
      ).length;

    if (avgRatingEl) {
      if (farmerReviews.length > 0) {
        const avg =
          farmerReviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
          farmerReviews.length;

        const rounded = Math.round(avg * 10) / 10;

        const fullStars = Math.floor(rounded);
        const halfStar = rounded - fullStars >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;

        const starsHTML =
          "⭐".repeat(fullStars) 

        avgRatingEl.innerHTML = `
          <span style="font-size:32px; font-weight:700; color:#1a1a1a;">${rounded}</span>
          <div style="font-size:18px; margin-top:2px; letter-spacing:2px;">${starsHTML}</div>
          <div style="font-size:12px; color:#6b7280; margin-top:2px;">${farmerReviews.length} review${farmerReviews.length > 1 ? "s" : ""}</div>
        `;
      } else {
        avgRatingEl.innerHTML = `
          <span style="font-size:32px; font-weight:700; color:#1a1a1a;">0</span>
          <div style="font-size:18px; margin-top:2px; color:#d1d5db;">☆☆☆☆☆</div>
          <div style="font-size:12px; color:#6b7280; margin-top:2px;">No reviews yet</div>
        `;
      }
    }

    const ordersContainer = document.querySelector(".card.full");
    if (ordersContainer) {
      const cardHeader = ordersContainer.querySelector(".card-header");
      ordersContainer.innerHTML = "";
      ordersContainer.appendChild(cardHeader);

      if (farmerOrders.length === 0) {
        ordersContainer.innerHTML += `<p style="padding:15px; color:#6b7280;">No orders yet</p>`;
      } else {
        farmerOrders
          .slice(-3)
          .reverse()
          .forEach((order, index) => {
            const s = (order.status || "").toLowerCase();
            const statusClass =
              s === "confirmed" || s === "comformed"
                ? "confirmed"
                : s === "shipped"
                  ? "shipped"
                  : s === "delivered"
                    ? "delivered"
                    : "pending";

            ordersContainer.innerHTML += `
              <div class="order">
                <div>
                  <h4>Order #${String(order.id).padStart(4, "0")}</h4>
                  <p>${order.vendor_name || "N/A"}</p>
                </div>
                <div class="order-right">
                  <span class="price">₹${(order.total_price || 0).toLocaleString("en-IN")}</span>
                  <span class="status ${statusClass}">${s.toUpperCase()}</span>
                </div>
              </div>
              ${index < 2 ? "<hr/>" : ""}
            `;
          });
      }
    }

    const productsGrid =
      document.querySelector(".card .product")?.parentElement;
    if (productsGrid && farmerProducts.length > 0) {
      productsGrid.querySelectorAll(".product").forEach((el) => el.remove());

      farmerProducts.slice(0, 3).forEach((product, index) => {
        productsGrid.innerHTML += `
          <div class="product">
            <img
              src="${product.image_url || "../ASSETS/fs1.jpg"}"
              width="50px" height="50px"
              style="object-fit:cover; border-radius:8px;"
              onerror="this.src='../ASSETS/fs1.jpg'"
            />
            <div>
              <h4>${product.name}</h4>
              <p>₹${product.price_per_kg}/kg</p>
            </div>
            <span class="rank">#${index + 1}</span>
          </div>
        `;
      });
    }
  } catch (err) {
    console.error("Dashboard error:", err);
  }
});
