document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.getElementById("loginBtn");

  if (!loginBtn) {
    console.error("loginBtn not found!");
    return;
  }

  loginBtn.addEventListener("click", async function () {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Email and Password required!");
      return;
    }

    try {
      const BASE_URL = "https://full-stack-backend-omega.vercel.app";
      
      const farmerRes = await fetch(`${BASE_URL}/farmers/farmers/`);
      const farmers = await farmerRes.json();
      const farmer = farmers.find((f) => f.email === email);

      if (farmer) {
        localStorage.setItem("farmer_id", farmer.id);
        localStorage.setItem("farmer_name", farmer.full_name);
        localStorage.setItem("farmer_email", farmer.email);
        localStorage.setItem("farmer_phone", farmer.phone);
        localStorage.setItem("farmer_location", farmer.location);
        localStorage.setItem("user_type", "farmer");

        alert(`Welcome ${farmer.full_name}!`);
        window.location.href = "../HTML/farmer.html";
        return;
      }

      // https://full-stack-backend-omega.vercel.app/farmers/farmers/

      const vendorRes = await fetch(`${BASE_URL}/vendors/vendors/`);
      const vendors = await vendorRes.json();
      const vendor = vendors.find((v) => v.email === email);

      if (vendor) {
        localStorage.setItem("vendor_id", vendor.id);
        localStorage.setItem("vendor_name", vendor.full_name);
        localStorage.setItem("vendor_email", vendor.email);
        localStorage.setItem("vendor_phone", vendor.phone);
        localStorage.setItem("vendor_location", vendor.location);
        localStorage.setItem("vendor_business_type", vendor.business_type);
        localStorage.setItem("user_type", "vendor");

        alert(`Welcome ${vendor.full_name}!`);
        window.location.href = "../HTML/vendor_md.html";
        return;
      }

      alert("Invalid Email or Password!");
    } catch (err) {
      console.error("Login error:", err);
      alert("Backend not running!");
    }
  });
});
