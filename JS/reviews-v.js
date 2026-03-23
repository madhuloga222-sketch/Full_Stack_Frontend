let selectedRating = 0;

document.addEventListener("DOMContentLoaded", async function () {
  const BASE_URL = "https://full-stack-backend-omega.vercel.app";
  const vendorName = localStorage.getItem("vendor_name") || "Vendor";

  const submitBtn = document.getElementById("submitReviewBtn");
  if (submitBtn) {
    submitBtn.addEventListener("click", submitReview);
  }

  updateStars();
});

function setRating(r) {
  selectedRating = r;
  updateStars();
}

function updateStars() {
  const stars = document.querySelectorAll("#starSelector span");
  stars.forEach((s, i) => {
    s.style.color = i < selectedRating ? "#f59e0b" : "#d1d5db";
    s.style.fontSize = "28px";
    s.style.cursor = "pointer";
  });
}

async function submitReview() {
  const BASE_URL = "https://full-stack-backend-omega.vercel.app";
  const vendorName = localStorage.getItem("vendor_name") || "Vendor";

  const nameInput = document.getElementById("reviewerName");
  const textInput = document.getElementById("reviewText");

  const name = nameInput ? nameInput.value.trim() : "";
  const text = textInput ? textInput.value.trim() : "";

  if (!name) {
    alert(" Please enter the correct farmer name!");
    return;
  }
  if (selectedRating === 0) {
    alert(" Please select a rating!");
    return;
  }
  if (!text) {
    alert(" Please write your review!");
    return;
  }

  let farmerId = null;
  try {
    const res = await fetch(`${BASE_URL}/farmers/farmers/`);
    const allFarmers = await res.json();
    const matchedFarmer = allFarmers.find((f) =>
      (f.full_name || f.name || "").toLowerCase().includes(name.toLowerCase()),
    );

    if (!matchedFarmer) {
      alert(
        ` Farmer "${name}" not found!\nPlease check the name and try again.`,
      );
      return;
    }
    farmerId = matchedFarmer.id;
  } catch (err) {
    alert(" Could not verify farmer. Please try again.");
    return;
  }

  const reviewData = {
    farmer_id: farmerId,
    vendor_name: vendorName,
    rating: selectedRating,
    comment: text,
    created_at: new Date().toISOString(),
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
      alert(" Review submitted successfully!");
      window.location.href = "../HTML/suppliers-v.html";
    } else {
      const err = await response.json();
      alert(" Failed: " + (err.detail || "Something went wrong"));
    }
  } catch (err) {
    alert(" Server error! Please try again.");
  }
}
