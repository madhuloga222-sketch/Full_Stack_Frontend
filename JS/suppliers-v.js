let selectedRating = 0;

const BASE_URL = "https://full-stack-backend-omega.vercel.app";

document.addEventListener("DOMContentLoaded", async function () {
  const vendorName = localStorage.getItem("vendor_name") || "Vendor";

  try {
    const farmerRes = await fetch(`${BASE_URL}/farmers/farmers/`);
    const allFarmers = await farmerRes.json();
    const select = document.getElementById("farmerSelect");
    if (select) {
      select.innerHTML = `<option value="">-- Select Farmer --</option>`;
      allFarmers.forEach((f) => {
        const name = f.full_name || f.name || "Unknown";
        const opt = document.createElement("option");
        opt.value = f.id;
        opt.textContent = name;
        select.appendChild(opt);
      });
    }
  } catch (err) {
    console.error("Error loading farmers:", err);
  }

  document
    .getElementById("submitReviewBtn")
    .addEventListener("click", async function () {
      const farmerId = document.getElementById("farmerSelect").value;
      const reviewText = document.getElementById("reviewText").value.trim();

      if (!farmerId) {
        alert("Please select a farmer.");
        return;
      }
      if (selectedRating === 0) {
        alert("Please select a rating.");
        return;
      }
      if (!reviewText) {
        alert("Please write a review.");
        return;
      }

      try {
        const payload = {
          vendor_name: vendorName,
          farmer_id: parseInt(farmerId),
          rating: selectedRating,
          comment: reviewText,
        };

        const res = await fetch(`${BASE_URL}/review/reviews/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          alert("Review submitted successfully!");
          closeModal();
          location.reload();
        } else {
          const err = await res.json();
          alert("Failed to submit: " + JSON.stringify(err));
        }
      } catch (err) {
        console.error("Submit error:", err);
        alert("Server error while submitting review.");
      }
    });

  await loadReviews(vendorName);
});

async function loadReviews(vendorName) {
  try {
    const [reviewRes, farmerRes] = await Promise.all([
      fetch(`${BASE_URL}/review/reviews/`),
      fetch(`${BASE_URL}/farmers/farmers/`),
    ]);
    const allReviews = await reviewRes.json();
    const allFarmers = await farmerRes.json();

    const myReviews = allReviews.filter((r) => r.vendor_name === vendorName);

    const list = document.getElementById("reviewsList");
    list.innerHTML = "";

    if (myReviews.length === 0) {
      list.innerHTML = `
        <div class="empty-state">
          <div class="icon">📝</div>
          <p style="font-size:16px;font-weight:500;">No reviews yet</p>
          <p style="font-size:14px;margin-top:8px;">Click "+ Write Review" to add your first review.</p>
        </div>`;
      return;
    }

    myReviews.forEach((review) => {
      const initial = review.vendor_name.charAt(0).toUpperCase();
      const farmer = allFarmers.find((f) => f.id === review.farmer_id);
      const farmerName = farmer
        ? farmer.full_name || farmer.name
        : "Unknown Farmer";

      const reviewDate = review.created_at
        ? new Date(review.created_at).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "N/A";

      let stars = "";
      for (let i = 1; i <= 5; i++) {
        stars += `<span class="review-item-card__star" style="opacity:${i <= review.rating ? 1 : 0.3}">⭐</span>`;
      }

      const card = document.createElement("div");
      card.className = "review-item-card";
      card.id = `card-${review.id}`;
      card.innerHTML = `
        <div class="review-item-card__avatar">${initial}</div>
        <div class="review-item-card__content">
          <div class="review-item-card__header">
            <div>
              <h3 class="review-item-card__reviewer-name">${review.vendor_name}</h3>
              <p style="font-size:13px; color:#6b7280; margin-top:2px;">
                 Farmer: <strong>${farmerName}</strong> &nbsp;|&nbsp;  ${reviewDate}
              </p>
            </div>
            <button class="delete-btn" onclick="deleteCard('${review.id}')">
              <img src="../ASSETS/Delete.png" width="20px" height="20px">
            </button>
          </div>
          <div class="review-item-card__rating-section">
            <div class="review-item-card__stars">${stars}</div>
          </div>
          <p class="review-item-card__text">${review.comment}</p>
        </div>`;
      list.appendChild(card);
    });
  } catch (err) {
    console.error("Error loading reviews:", err);
  }
}

async function deleteCard(reviewId) {
  if (!confirm("Are you sure you want to delete this review?")) return;

  try {
    const res = await fetch(`${BASE_URL}/review/reviews/${reviewId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      const card = document.getElementById(`card-${reviewId}`);
      if (card) {
        card.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        card.style.opacity = "0";
        card.style.transform = "translateX(20px)";
        setTimeout(() => {
          card.remove();
          const list = document.getElementById("reviewsList");
          if (list && list.children.length === 0) {
            list.innerHTML = `
              <div class="empty-state">
                <div class="icon">📝</div>
                <p style="font-size:16px;font-weight:500;">No reviews yet</p>
                <p style="font-size:14px;margin-top:8px;">Click "+ Write Review" to add your first review.</p>
              </div>`;
          }
        }, 300);
      }
    } else {
      alert("Failed to delete review");
    }
  } catch (err) {
    console.error("Error deleting:", err);
    alert("Server error while deleting");
  }
}

function openModal() {
  document.getElementById("modalOverlay").classList.add("active");
  selectedRating = 0;
  document.getElementById("farmerSelect").value = "";
  document.getElementById("reviewText").value = "";
  updateStars();
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("active");
}

document.getElementById("modalOverlay").addEventListener("click", function (e) {
  if (e.target === this) closeModal();
});

function setRating(r) {
  selectedRating = r;
  updateStars();
}

function updateStars() {
  const stars = document.querySelectorAll("#starSelector span");
  stars.forEach((s, i) => {
    s.classList.toggle("active", i < selectedRating);
  });
}
