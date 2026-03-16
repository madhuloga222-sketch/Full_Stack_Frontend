document.addEventListener("DOMContentLoaded", function () {
  
  const farmerName =
    localStorage.getItem("farmer_name") ||
    JSON.parse(localStorage.getItem("farmer") || "{}").name;
  const farmerEmail =
    localStorage.getItem("farmer_email") ||
    JSON.parse(localStorage.getItem("farmer") || "{}").email;
  const farmerPhone =
    localStorage.getItem("farmer_phone") ||
    JSON.parse(localStorage.getItem("farmer") || "{}").phone;
  const farmerLocation =
    localStorage.getItem("farmer_location") ||
    JSON.parse(localStorage.getItem("farmer") || "{}").location;

  console.log("farmer_name:", farmerName); 
  console.log("farmer_email:", farmerEmail);

  if (!farmerName) {
    alert("Please login first!");
    window.location.href = "../index.html";
    return;
  }

  document.querySelector(".profile-name").textContent = farmerName;
  document.querySelector(".profile-email").textContent = farmerEmail;

  const avatar = document.querySelector(".profile-avatar");
  if (avatar) avatar.textContent = farmerName.charAt(0).toUpperCase();

  const headerAvatar = document.querySelector(".user-avatar");
  if (headerAvatar)
    headerAvatar.textContent = farmerName.charAt(0).toUpperCase();

  const details = document.querySelectorAll(".detail-value");
  if (details[0]) details[0].textContent = farmerName;
  if (details[1]) details[1].textContent = farmerEmail;
  if (details[2]) details[2].textContent = farmerPhone || "N/A";
  if (details[3]) details[3].textContent = farmerLocation || "N/A";
});
