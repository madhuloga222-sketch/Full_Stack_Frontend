document.addEventListener("DOMContentLoaded", loadReviews);

const BASE_URL = "https://full-stack-backend-omega.vercel.app";

async function loadReviews() {
  const reviewList = document.querySelector(".review-list");

  try {
    const response = await fetch(`${BASE_URL}/review/reviews/`);

    if (!response.ok) throw new Error("Failed to fetch reviews");

    const reviews = await response.json();
    console.log("Reviews:", reviews);

    if (reviews.length === 0) {
      reviewList.innerHTML = "<p>No reviews yet</p>";
      return;
    }

    const avgRating = (
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    ).toFixed(1);

    document.querySelector(".rating-score").textContent = avgRating;
    document.querySelector(".rating-subtitle").textContent =
      `Based on ${reviews.length} reviews`;

    const starsContainer = document.querySelector(".stars");
    starsContainer.innerHTML = "";
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("span");
      star.className = "star";
      star.innerHTML = `<img src="../ASSETS/star (1).png" width="40px" height="40px" 
        style="opacity: ${i <= Math.round(avgRating) ? "1" : "0.3"}" />`;
      starsContainer.appendChild(star);
    }

    const breakdownBars = document.querySelectorAll(".breakdown-bar-fill");
    const breakdownCounts = document.querySelectorAll(".breakdown-count");

    for (let star = 5; star >= 1; star--) {
      const count = reviews.filter((r) => r.rating === star).length;
      const percent = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
      const index = 5 - star;
      if (breakdownBars[index])
        breakdownBars[index].style.width = `${percent}%`;
      if (breakdownCounts[index]) breakdownCounts[index].textContent = count;
    }

    reviewList.innerHTML = "";

    reviews.forEach((review) => {
      const item = document.createElement("div");
      item.className = "review-item";

      let starsHTML = "";
      for (let i = 1; i <= 5; i++) {
        starsHTML += `<span class="star">
          <img src="../ASSETS/star (1).png" width="18px" height="18px" 
            style="opacity: ${i <= review.rating ? "1" : "0.3"}" />
        </span>`;
      }

      item.innerHTML = `
        <div class="review-header">
          <div class="review-avatar">${review.vendor_name.charAt(0).toUpperCase()}</div>
          <div class="review-info">
            <div class="review-name">${review.vendor_name}</div>
            <div class="review-meta">
              <div class="review-stars">${starsHTML}</div>
            </div>
          </div>
        </div>
        <div class="review-text">${review.comment}</div>
      `;

      reviewList.appendChild(item);
    });
  } catch (error) {
    console.error("Error loading reviews:", error);
    document.querySelector(".review-list").innerHTML =
      "<p>Failed to load reviews</p>";
  }
}
