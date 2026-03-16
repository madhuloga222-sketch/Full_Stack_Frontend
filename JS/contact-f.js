document.addEventListener("DOMContentLoaded", async function () {
  const BASE_URL = "https://full-stack-backend-omega.vercel.app";
  const params = new URLSearchParams(window.location.search);
  const farmerId = parseInt(params.get("farmer_id"));

  console.log("Farmer ID from URL:", farmerId);

  if (!farmerId) {
    console.error("No farmer_id in URL!");
    return;
  }

  try {
   
    const farmerRes = await fetch(`${BASE_URL}/farmers/farmers/`);
    const farmers = await farmerRes.json();
    const farmer = farmers.find((f) => f.id === farmerId);

    console.log("Farmer found:", farmer);

    if (farmer) {
      
      const avatarEl = document.getElementById("farmerAvatar");
      if (avatarEl)
        avatarEl.textContent = farmer.full_name.substring(0, 2).toUpperCase();

      const nameEl = document.getElementById("farmerName");
      if (nameEl) nameEl.textContent = farmer.full_name;

      const locationEl = document.getElementById("farmerLocation");
      if (locationEl) locationEl.textContent = farmer.location;

      const emailEl = document.getElementById("farmerEmail");
      if (emailEl) emailEl.textContent = farmer.email;

      const phoneEl = document.getElementById("farmerPhone");
      if (phoneEl) phoneEl.textContent = farmer.phone;

      const addressEl = document.getElementById("farmerAddress");
      if (addressEl) addressEl.textContent = farmer.location;
    }

    const productsRes = await fetch(`${BASE_URL}/products/products/`);
    const allProducts = await productsRes.json();
    const farmerProducts = allProducts.filter((p) => p.farmer_id === farmerId);

    const totalProductsEl = document.getElementById("farmerTotalProducts");
    if (totalProductsEl) totalProductsEl.textContent = farmerProducts.length;

    const reviewsRes = await fetch(`${BASE_URL}/review/reviews/`);
    const allReviews = await reviewsRes.json();
    const farmerReviews = allReviews.filter((r) => r.farmer_id === farmerId);

    console.log("Farmer reviews:", farmerReviews);

    if (farmerReviews.length > 0) {
      const avg =
        farmerReviews.reduce((sum, r) => sum + r.rating, 0) /
        farmerReviews.length;
      const ratingEl = document.getElementById("farmerRating");
      if (ratingEl) {
        ratingEl.innerHTML = `
          <span class="star-icon">★</span>
          ${avg.toFixed(1)}
          <span class="rating-count">(${farmerReviews.length} reviews)</span>
        `;
      }
    }

    const reviewList = document.getElementById("reviewList");
    if (reviewList) {
      reviewList.innerHTML = "";

      if (farmerReviews.length === 0) {
        reviewList.innerHTML = "<p style='padding:15px'>No reviews yet</p>";
      } else {
        farmerReviews.forEach((review) => {
          const item = document.createElement("div");
          item.className = "review-item";
          item.innerHTML = `
            <div class="review-body">
              <div class="reviewer-name">${review.vendor_name}</div>
              <div class="review-text">${review.comment}</div>
            </div>
            <div class="review-rating"><span class="star">★</span> ${review.rating}</div>
          `;
          reviewList.appendChild(item);
        });
      }
    }
  } catch (err) {
    console.error("Error:", err);
  }
});
