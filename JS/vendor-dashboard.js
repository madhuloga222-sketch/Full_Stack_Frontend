document.addEventListener("DOMContentLoaded", function () {
  loadVendorProfile();
});

function loadVendorProfile() {
  const vendorName = localStorage.getItem("vendor_name");
  const vendorEmail = localStorage.getItem("vendor_email");
  const vendorPhone = localStorage.getItem("vendor_phone");
  const vendorLocation = localStorage.getItem("vendor_location");
  const vendorBusinessType = localStorage.getItem("vendor_business_type");

  if (!vendorName) {
    alert("Please login first!");
    window.location.href = "../index.html";
    return;
  }

  const avatarEl = document.querySelector(".avatar");
  const nameEl = document.querySelector(".name");
  const emailEl = document.querySelector(".email");

  if (avatarEl) avatarEl.textContent = vendorName.charAt(0).toUpperCase();
  if (nameEl) nameEl.textContent = vendorName;
  if (emailEl) emailEl.textContent = vendorEmail;

  const inputs = document.querySelectorAll(".input");
  if (inputs[0]) inputs[0].value = vendorName;
  if (inputs[1]) inputs[1].value = vendorEmail;
  if (inputs[2]) inputs[2].value = vendorPhone || "N/A";
  if (inputs[3]) inputs[3].value = vendorLocation || "N/A";
  if (inputs[4]) inputs[4].value = vendorBusinessType || "N/A";
}

const logoutBtn = document.querySelector(".btn-login");
if (logoutBtn) {
  logoutBtn.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("vendor_name");
    localStorage.removeItem("vendor_email");
    localStorage.removeItem("vendor_phone");
    localStorage.removeItem("vendor_location");
    localStorage.removeItem("vendor_business_type");
    localStorage.removeItem("vendor_id");
    localStorage.removeItem("vendor");
    localStorage.removeItem("user_type");
    window.location.href = "../index.html";
  });
}
