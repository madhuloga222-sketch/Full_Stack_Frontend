document.addEventListener("DOMContentLoaded", function () {
  const vendorName = localStorage.getItem("vendor_name");
  const vendorEmail = localStorage.getItem("vendor_email");
  const vendorPhone = localStorage.getItem("vendor_phone");
  const vendorLocation = localStorage.getItem("vendor_location");
  const vendorBusinessType = localStorage.getItem("vendor_business_type");
  const vendorId = localStorage.getItem("vendor_id");

  if (!vendorName) {
    alert("Please login first!");
    window.location.href = "../index.html";
    return;
  }

  const avatarEl = document.getElementById("edit-avatar");
  const nameEl = document.getElementById("edit-name");
  const emailEl = document.getElementById("edit-email");

  if (avatarEl) avatarEl.textContent = vendorName.charAt(0).toUpperCase();
  if (nameEl) nameEl.textContent = vendorName;
  if (emailEl) emailEl.textContent = vendorEmail;

  document.getElementById("vendor_name").value = vendorName || "";
  document.getElementById("vendor_email").value = vendorEmail || "";
  document.getElementById("vendor_phone").value = vendorPhone || "";
  document.getElementById("vendor_location").value = vendorLocation || "";
  document.getElementById("vendor_business_type").value =
    vendorBusinessType || "";

  document
    .getElementById("save-btn")
    .addEventListener("click", async function () {
      await updateProfile(vendorId);
    });
});

async function updateProfile(vendorId) {
  const updatedName = document.getElementById("vendor_name").value.trim();
  const updatedEmail = document.getElementById("vendor_email").value.trim();
  const updatedPhone = document.getElementById("vendor_phone").value.trim();
  const updatedLocation = document
    .getElementById("vendor_location")
    .value.trim();
  const updatedBusinessType = document
    .getElementById("vendor_business_type")
    .value.trim();

  if (!updatedName || !updatedEmail) {
    alert("Name and Email are required!");
    return;
  }

  try {
    const BASE_URL = "https://full-stack-backend-omega.vercel.app";
    const response = await fetch(
      `${BASE_URL}/vendors/vendors/${vendorId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: updatedName,
          email: updatedEmail,
          phone: updatedPhone,
          location: updatedLocation,
          business_type: updatedBusinessType,
        }),
      },
    );

    // https://full-stack-backend-omega.vercel.app/vendors/vendors/

    if (response.ok) {
      localStorage.setItem("vendor_name", updatedName);
      localStorage.setItem("vendor_email", updatedEmail);
      localStorage.setItem("vendor_phone", updatedPhone);
      localStorage.setItem("vendor_location", updatedLocation);
      localStorage.setItem("vendor_business_type", updatedBusinessType);

      alert("Profile updated successfully!");
      window.location.href = "../HTML/vendor-dashboard.html";
    } else {
      const error = await response.json();
      alert("Update failed: " + (error.detail || "Something went wrong"));
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Server error! Please try again.");
  }
}
