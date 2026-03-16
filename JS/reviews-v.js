document.addEventListener("DOMContentLoaded", async function () {
  const BASE_URL = "https://full-stack-backend-omega.vercel.app";
  const vendorName = localStorage.getItem("vendor_name") || "Vendor";

  const avatarEl = document.querySelector(".avatar");
  if (avatarEl) avatarEl.textContent = vendorName.charAt(0).toUpperCase();

  let allFarmers = [];
  try {
    const res = await fetch(`${BASE_URL}/farmers/farmers/`);
    allFarmers = await res.json();
    console.log("All Farmers:", allFarmers);
  } catch (err) {
    console.error("Could not load farmers:", err);
  }

  document
    .querySelector(".submit-btn")
    .addEventListener("click", async function () {
      const farmerInput = document.getElementById("product-name").value.trim();
      const selectedRating = document.querySelector(
        'input[name="rating"]:checked',
      );
      const comment = document.getElementById("review").value.trim();

      if (!farmerInput || !selectedRating || !comment) {
        alert("All fields are required!");
        return;
      }

      const matchedFarmer = allFarmers.find((f) =>
        (f.full_name || f.name || "")
          .toLowerCase()
          .includes(farmerInput.toLowerCase()),
      );

      if (!matchedFarmer) {
        alert(`Farmer "${farmerInput}" not found! Please check the name.`);
        return;
      }

      const farmerId = matchedFarmer.id || matchedFarmer.farmer_id;

      const reviewData = {
        farmer_id: farmerId,
        vendor_name: vendorName,
        rating: parseInt(selectedRating.value),
        comment: comment,
      };

      console.log("Submitting review:", reviewData);

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
          window.location.href = "../HTML/suppliers-v.html";
        } else {
          const err = await response.json();
          console.error("Failed:", err);
          alert(
            "Failed to submit review: " +
              (err.detail || "Something went wrong"),
          );
        }
      } catch (err) {
        console.error("Error:", err);
        alert("Server error! Please try again.");
      }
    });
});
