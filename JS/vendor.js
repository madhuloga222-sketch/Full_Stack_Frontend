document.getElementById("registrationForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const vendorData = {
    full_name: document.getElementById("fullName").value.trim(),
    email: document.getElementById("email").value.trim(),
    password: document.getElementById("password").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    location: document.getElementById("location").value.trim(),
    business_type: document.querySelector(".category-dropdown").value,
  };

  try {
    const BASE_URL = "https://full-stack-backend-omega.vercel.app";
    const response = await fetch(`${BASE_URL}/vendors/vendors/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vendorData),
    });

    // https://full-stack-backend-omega.vercel.app/vendors/vendors/

    if (response.ok) {
      const data = await response.json();
      console.log("Vendor registered:", data);

     
      localStorage.setItem("vendor_id", data.id);
      localStorage.setItem("vendor_name", data.full_name);
      localStorage.setItem("vendor_email", data.email);
      localStorage.setItem("vendor_phone", data.phone);
      localStorage.setItem("vendor_location", data.location);
      localStorage.setItem("vendor_business_type", data.business_type);
      localStorage.setItem("user_type", "vendor");

      alert("Vendor Registration Successful!");
      window.location.href = "../HTML/vendor_md.html";
    } else {
      const err = await response.json();
      console.error("Failed:", err);
      alert("Registration failed!");
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Backend not running!");
  }
});