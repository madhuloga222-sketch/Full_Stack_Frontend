document
  .getElementById("registrationForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const location = document.getElementById("location").value.trim();

    if (!fullName || !email || !password || !phone || !location) {
      alert("All fields are required!");
      return;
    }

    const farmerData = {
      full_name: fullName,
      email: email,
      password: password,
      phone: phone,
      location: location,
    };

    console.log("Sending farmer:", farmerData);

    try {
      const BASE_URL = "https://full-stack-backend-omega.vercel.app";
      const response = await fetch(`${BASE_URL}/farmers/farmers/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(farmerData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Registered:", data);

        localStorage.setItem("farmer_id", data.id);
        localStorage.setItem("farmer_name", data.full_name);
        localStorage.setItem("farmer_email", data.email);
        localStorage.setItem("farmer_phone", data.phone);
        localStorage.setItem("farmer_location", data.location);
        localStorage.setItem("user_type", "farmer");

        alert("Registration Successful!");
        window.location.href = "../HTML/farmer.html";
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
