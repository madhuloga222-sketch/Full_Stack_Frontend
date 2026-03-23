document.addEventListener("DOMContentLoaded", async function () {
  const BASE_URL = "https://full-stack-backend-omega.vercel.app";

  const farmerName = localStorage.getItem("farmer_name");
  const farmerEmail = localStorage.getItem("farmer_email");
  const farmerPhone = localStorage.getItem("farmer_phone");
  const farmerLocation = localStorage.getItem("farmer_location");
  const farmerId = localStorage.getItem("farmer_id");

  if (!farmerName) {
    alert("Please login first!");
    window.location.href = "../index.html";
    return;
  }

  const avatarEl = document.getElementById("edit-avatar");
  const nameEl = document.getElementById("edit-name");
  const emailEl = document.getElementById("edit-email");

  if (avatarEl) avatarEl.textContent = farmerName.charAt(0).toUpperCase();
  if (nameEl) nameEl.textContent = farmerName;
  if (emailEl) emailEl.textContent = farmerEmail;

  document.getElementById("full_name").value = farmerName;
  document.getElementById("email").value = farmerEmail;
  document.getElementById("phone").value = farmerPhone || "";
  document.getElementById("location").value = farmerLocation || "";

  document
    .getElementById("save-btn")
    .addEventListener("click", async function () {
      await updateProfile(farmerId);
    });

  try {
    const id = parseInt(farmerId);

    const [productsRes, ordersRes, reviewsRes] = await Promise.all([
      fetch(`${BASE_URL}/products/products/`),
      fetch(`${BASE_URL}/orders/orders/`),
      fetch(`${BASE_URL}/review/reviews/`),
    ]);

    const allProducts = await productsRes.json();
    const allOrders = await ordersRes.json();
    const allReviews = await reviewsRes.json();

    const farmerProducts = id
      ? allProducts.filter((p) => p.farmer_id === id)
      : allProducts;
    const farmerOrders = id
      ? allOrders.filter((o) => o.farmer_id === id)
      : allOrders;
    const farmerReviews = id
      ? allReviews.filter((r) => r.farmer_id === id)
      : allReviews;

    const greenEl = document.querySelector(".card.stats .green");
    if (greenEl) greenEl.textContent = farmerProducts.length;

    const blueEl = document.querySelector(".card.stats .blue");
    if (blueEl) blueEl.textContent = farmerOrders.length;

    const orangeEl = document.querySelector(".card.stats .orange");
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
  } catch (err) {
    console.error("Statistics error:", err);
  }
});

async function updateProfile(farmerId) {
  const updatedName = document.getElementById("full_name").value.trim();
  const updatedEmail = document.getElementById("email").value.trim();
  const updatedPhone = document.getElementById("phone").value.trim();
  const updatedLocation = document.getElementById("location").value.trim();

  if (!updatedName || !updatedEmail) {
    alert("Name and Email are required!");
    return;
  }

  try {
    const BASE_URL = "https://full-stack-backend-omega.vercel.app";
    const response = await fetch(`${BASE_URL}/farmers/farmers/${farmerId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name: updatedName,
        email: updatedEmail,
        phone: updatedPhone,
        location: updatedLocation,
      }),
    });

    if (response.ok) {
      localStorage.setItem("farmer_name", updatedName);
      localStorage.setItem("farmer_email", updatedEmail);
      localStorage.setItem("farmer_phone", updatedPhone);
      localStorage.setItem("farmer_location", updatedLocation);

      alert("Profile updated successfully!");
      window.location.href = "../HTML/farmer-dashboard.html";
    } else {
      const error = await response.json();
      alert("Update failed: " + (error.detail || "Something went wrong"));
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Server error! Please try again.");
  }
}
