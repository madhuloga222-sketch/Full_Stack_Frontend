document.addEventListener("DOMContentLoaded", function () {
  fetchReviews();
});

async function fetchReviews() {
  try {
    const response = await fetch("http://localhost:3000/reviews");
    const data = await response.json();

    const reviewList = document.querySelector(".review-list");
    reviewList.innerHTML = "";

    data.forEach((review) => {
      const reviewItem = document.createElement("div");
      reviewItem.classList.add("review-item");

      let starsHTML = "";

      for (let i = 0; i < review.rating; i++) {
        starsHTML += `
          <span class="star">
            <img src="../ASSETS/star (1).png" width="18px" height="18px">
          </span>
        `;
      }

      reviewItem.innerHTML = `
        <div class="review-header">
          <div class="review-avatar">${review.name.charAt(0)}</div>

          <div class="review-info">
            <div class="review-name">${review.name}</div>

            <div class="review-meta">
              <div class="review-stars">
                ${starsHTML}
              </div>

              <div class="review-date">${review.date}</div>
            </div>

          </div>
        </div>

        <div class="review-text">
          ${review.review}
        </div>
      `;

      reviewList.appendChild(reviewItem);
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
}
