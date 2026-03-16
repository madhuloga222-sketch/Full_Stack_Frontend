let selectedRating = 0;
let cardCounter = 4;

document.addEventListener("DOMContentLoaded", async function() {
  const BASE_URL = "https://full-stack-backend-omega.vercel.app";
  const vendorName = localStorage.getItem("vendor_name") || "Vendor";
  
  try {
    const res = await fetch(`${BASE_URL}/review/reviews/`);
    const allReviews = await res.json();
    const myReviews = allReviews.filter(r => r.vendor_name === vendorName);
    
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
    
    myReviews.forEach(review => {
      const initial = review.vendor_name.charAt(0).toUpperCase();
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
            <h3 class="review-item-card__reviewer-name">${review.vendor_name}</h3>
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
  } catch(err) {
    console.error("Error loading reviews:", err);
  }
});

async function deleteCard(reviewId) {
  if(!confirm("Are you sure you want to delete this review?")) return;
  
  const BASE_URL = "https://full-stack-backend-omega.vercel.app";
  try {
    const res = await fetch(`${BASE_URL}/review/reviews/${reviewId}`, {
      method: 'DELETE'
    });
    
    if(res.ok) {
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
  } catch(err) {
    console.error("Error deleting:", err);
    alert("Server error while deleting");
  }
}

function openModal() {
  document.getElementById("modalOverlay").classList.add("active");
  selectedRating = 0;
  document.getElementById("reviewerName").value = "";
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

async function submitReview() {
  const name = document.getElementById("reviewerName").value.trim();
  const text = document.getElementById("reviewText").value.trim();
  if (!name || !text || selectedRating === 0) {
    alert("Please fill all fields and select a rating.");
    return;
  }

  const BASE_URL = "https://full-stack-backend-omega.vercel.app";
  let farmerId = null;
  
  try {
    const res = await fetch(`${BASE_URL}/farmers/farmers/`);
    const allFarmers = await res.json();
    const matchedFarmer = allFarmers.find((f) =>
      (f.full_name || f.name || "").toLowerCase().includes(name.toLowerCase())
    );

    if (!matchedFarmer) {
      alert(`Farmer "${name}" not found! Please check the name.`);
      return;
    }
    farmerId = matchedFarmer.id || matchedFarmer.farmer_id;
  } catch (err) {
    console.error("Could not verify farmer:", err);
    alert("Could not verify farmer. Please try again.");
    return;
  }

  const vendorName = localStorage.getItem("vendor_name") || "Vendor";
  const reviewData = {
    farmer_id: farmerId,
    vendor_name: vendorName,
    rating: selectedRating,
    comment: text,
  };

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/review/reviews/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(reviewData),
    });

    if (response.ok) {
      alert("Review submitted successfully!");
      window.location.reload();
    } else {
      const err = await response.json();
      console.error("Failed:", err);
      alert("Failed to submit review: " + (err.detail || "Something went wrong"));
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Server error! Please try again.");
  }
}
