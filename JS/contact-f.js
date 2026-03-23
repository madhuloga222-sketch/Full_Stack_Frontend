// document.addEventListener("DOMContentLoaded", async function () {
//   const BASE_URL = "https://full-stack-backend-omega.vercel.app";
//   const params = new URLSearchParams(window.location.search);
//   const farmerId = parseInt(params.get("farmer_id"));

//   console.log("Farmer ID from URL:", farmerId);

//   if (!farmerId) {
//     console.error("No farmer_id in URL!");
//     return;
//   }

//   try {

//     const farmerRes = await fetch(`${BASE_URL}/farmers/farmers/`);
//     const farmers = await farmerRes.json();
//     const farmer = farmers.find((f) => f.id === farmerId);

//     console.log("Farmer found:", farmer);

//     if (farmer) {

//       const avatarEl = document.getElementById("farmerAvatar");
//       if (avatarEl)
//         avatarEl.textContent = farmer.full_name.substring(0, 2).toUpperCase();

//       const nameEl = document.getElementById("farmerName");
//       if (nameEl) nameEl.textContent = farmer.full_name;

//       const locationEl = document.getElementById("farmerLocation");
//       if (locationEl) locationEl.textContent = farmer.location;

//       const emailEl = document.getElementById("farmerEmail");
//       if (emailEl) emailEl.textContent = farmer.email;

//       const phoneEl = document.getElementById("farmerPhone");
//       if (phoneEl) phoneEl.textContent = farmer.phone;

//       const addressEl = document.getElementById("farmerAddress");
//       if (addressEl) addressEl.textContent = farmer.location;
//     }

//     const productsRes = await fetch(`${BASE_URL}/products/products/`);
//     const allProducts = await productsRes.json();
//     const farmerProducts = allProducts.filter((p) => p.farmer_id === farmerId);

//     const totalProductsEl = document.getElementById("farmerTotalProducts");
//     if (totalProductsEl) totalProductsEl.textContent = farmerProducts.length;

//     const reviewsRes = await fetch(`${BASE_URL}/review/reviews/`);
//     const allReviews = await reviewsRes.json();
//     const farmerReviews = allReviews.filter((r) => r.farmer_id === farmerId);

//     console.log("Farmer reviews:", farmerReviews);

//     if (farmerReviews.length > 0) {
//       const avg =
//         farmerReviews.reduce((sum, r) => sum + r.rating, 0) /
//         farmerReviews.length;
//       const ratingEl = document.getElementById("farmerRating");
//       if (ratingEl) {
//         ratingEl.innerHTML = `
//           <span class="star-icon">★</span>
//           ${avg.toFixed(1)}
//           <span class="rating-count">(${farmerReviews.length} reviews)</span>
//         `;
//       }
//     }

//     const reviewList = document.getElementById("reviewList");
//     if (reviewList) {
//       reviewList.innerHTML = "";

//       if (farmerReviews.length === 0) {
//         reviewList.innerHTML = "<p style='padding:15px'>No reviews yet</p>";
//       } else {
//         farmerReviews.forEach((review) => {
//           const item = document.createElement("div");
//           item.className = "review-item";
//           item.innerHTML = `
//             <div class="review-body">
//               <div class="reviewer-name">${review.vendor_name}</div>
//               <div class="review-text">${review.comment}</div>
//             </div>
//             <div class="review-rating"><span class="star">★</span> ${review.rating}</div>
//           `;
//           reviewList.appendChild(item);
//         });
//       }
//     }
//   } catch (err) {
//     console.error("Error:", err);
//   }
// });

document.addEventListener("DOMContentLoaded", async function () {
  const BASE_URL = "https://full-stack-backend-omega.vercel.app";
  const params = new URLSearchParams(window.location.search);

  // Fix 1: Get farmer_id as both string and number to avoid type mismatch
  const farmerIdRaw = params.get("farmer_id");
  const farmerIdNum = parseInt(farmerIdRaw);
  const farmerIdStr = String(farmerIdRaw).trim();

  console.log("Farmer ID from URL (raw):", farmerIdRaw);

  if (!farmerIdRaw) {
    console.error("No farmer_id in URL!");
    showError("Farmer not found. Please go back and try again.");
    return;
  }

  try {
    // ─── FETCH FARMER ────────────────────────────────────────────────
    const farmerRes = await fetch(`${BASE_URL}/farmers/farmers/`);
    const farmers = await farmerRes.json();

    console.log("All farmers:", farmers);

    // Fix 2: Match by both number and string to handle type mismatch
    const farmer = farmers.find(
      (f) =>
        f.id === farmerIdNum ||
        f.id === farmerIdStr ||
        String(f.id) === farmerIdStr,
    );

    console.log("Farmer found:", farmer);

    if (farmer) {
      // Fix 3: Fallback field names in case API uses different keys
      const name =
        farmer.full_name || farmer.name || farmer.username || "Unknown Farmer";
      const phone =
        farmer.phone || farmer.phone_number || farmer.contact || "N/A";
      const location =
        farmer.location || farmer.address || farmer.city || "N/A";
      const email = farmer.email || "N/A";
      const farmSize = farmer.farm_size || farmer.farmSize || "N/A";
      const experience = farmer.experience || farmer.years_experience || "N/A";
      const memberSince = farmer.created_at
        ? new Date(farmer.created_at).getFullYear()
        : farmer.member_since || farmer.joined_year || "N/A";

      // Avatar (initials)
      const avatarEl = document.getElementById("farmerAvatar");
      if (avatarEl) avatarEl.textContent = name.substring(0, 2).toUpperCase();

      // Name
      const nameEl = document.getElementById("farmerName");
      if (nameEl) nameEl.textContent = name;

      // Location (subtitle under name)
      const locationEl = document.getElementById("farmerLocation");
      if (locationEl) locationEl.textContent = location;

      // Contact info
      const emailEl = document.getElementById("farmerEmail");
      if (emailEl) emailEl.textContent = email;

      const phoneEl = document.getElementById("farmerPhone");
      if (phoneEl) phoneEl.textContent = phone;

      const addressEl = document.getElementById("farmerAddress");
      if (addressEl) addressEl.textContent = location;

      // Farm Details — dynamic instead of hardcoded
      const farmSizeEl = document.querySelector(
        ".stat-box:nth-child(1) .stat-value",
      );
      if (farmSizeEl)
        farmSizeEl.textContent =
          farmSize !== "N/A" ? `${farmSize} acres` : "N/A";

      const expEl = document.querySelector(
        ".stat-box:nth-child(2) .stat-value",
      );
      if (expEl)
        expEl.textContent =
          experience !== "N/A" ? `${experience} years` : "N/A";

      const memberEl = document.querySelector(
        ".stat-box:nth-child(4) .stat-value",
      );
      if (memberEl) memberEl.textContent = memberSince;
    } else {
      console.warn(
        "Farmer not found in list! Check if farmer_id matches any id in the farmers array.",
      );
      showError("Farmer details not found.");
    }

    // ─── FETCH PRODUCTS COUNT ────────────────────────────────────────
    const productsRes = await fetch(`${BASE_URL}/products/products/`);
    const allProducts = await productsRes.json();

    const farmerProducts = allProducts.filter(
      (p) =>
        p.farmer_id === farmerIdNum ||
        p.farmer_id === farmerIdStr ||
        String(p.farmer_id) === farmerIdStr,
    );

    const totalProductsEl = document.getElementById("farmerTotalProducts");
    if (totalProductsEl) totalProductsEl.textContent = farmerProducts.length;

    // ─── FETCH REVIEWS ───────────────────────────────────────────────
    const reviewsRes = await fetch(`${BASE_URL}/review/reviews/`);
    const allReviews = await reviewsRes.json();

    const farmerReviews = allReviews.filter(
      (r) =>
        r.farmer_id === farmerIdNum ||
        r.farmer_id === farmerIdStr ||
        String(r.farmer_id) === farmerIdStr,
    );

    console.log("Farmer reviews:", farmerReviews);

    // Update rating in profile header
    const ratingEl = document.getElementById("farmerRating");
    if (ratingEl) {
      if (farmerReviews.length > 0) {
        const avg =
          farmerReviews.reduce((sum, r) => sum + r.rating, 0) /
          farmerReviews.length;
        ratingEl.innerHTML = `
          <span class="star-icon">★</span>
          ${avg.toFixed(1)}
          <span class="rating-count">(${farmerReviews.length} review${farmerReviews.length > 1 ? "s" : ""})</span>
        `;
      } else {
        ratingEl.innerHTML = `
          <span class="star-icon">★</span>
          0
          <span class="rating-count">(0 reviews)</span>
        `;
      }
    }

    // Render review list
    const reviewList = document.getElementById("reviewList");
    if (reviewList) {
      reviewList.innerHTML = "";

      if (farmerReviews.length === 0) {
        reviewList.innerHTML =
          "<p style='padding:15px; color:#888;'>No reviews yet for this farmer.</p>";
      } else {
        farmerReviews.forEach((review) => {
          const item = document.createElement("div");
          item.className = "review-item";

          // Stars display
          const stars =
            "★".repeat(Math.round(review.rating)) +
            "☆".repeat(5 - Math.round(review.rating));

          item.innerHTML = `
            <div class="review-body">
              <div class="reviewer-name">${review.vendor_name || review.reviewer_name || "Anonymous"}</div>
              <div class="review-text">${review.comment || review.review || ""}</div>
            </div>
            <div class="review-rating" style="color:#f59e0b; font-size:14px;">${stars} ${review.rating}</div>
          `;
          reviewList.appendChild(item);
        });
      }
    }
  } catch (err) {
    console.error("Error fetching farmer data:", err);
    showError("Something went wrong. Please try again.");
  }
});

// Helper: show error message on page
function showError(msg) {
  const nameEl = document.getElementById("farmerName");
  if (nameEl) {
    nameEl.textContent = msg;
    nameEl.style.color = "#ef4444";
  }
}
