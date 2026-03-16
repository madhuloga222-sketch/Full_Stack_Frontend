document.addEventListener("DOMContentLoaded", function () {
  const BASE_URL = "https://full-stack-backend-omega.vercel.app";

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  const pricePerKg = parseFloat(params.get("price")) || 0;
  const farmerId = parseInt(params.get("farmer_id")) || 1;

  console.log(
    "Product ID:",
    productId,
    "Price:",
    pricePerKg,
    "Farmer ID:",
    farmerId,
  );

  const vendorName = localStorage.getItem("vendor_name") || "";
  const nameInput = document.getElementById("name");
  if (nameInput && vendorName) {
    nameInput.value = vendorName;
  }

  document
    .querySelector(".btn-place")
    .addEventListener("click", async function (e) {
      e.preventDefault();

      const vendorNameFinal =
        localStorage.getItem("vendor_name") ||
        document.getElementById("name").value.trim();

      const quantity = parseFloat(document.getElementById("quantity").value);

      if (!vendorNameFinal || !quantity) {
        alert("Name and Quantity are required!");
        return;
      }

      const totalPrice = quantity * pricePerKg;
      const orderNum = "AGD" + String(Math.floor(Math.random() * 9000) + 1000);

      const orderData = {
        order_number: orderNum,
        farmer_id: farmerId,
        vendor_name: vendorNameFinal,
        total_price: totalPrice,
        status: "pending",
      };

      console.log("Placing order:", orderData);

      try {
        const response = await fetch(`${BASE_URL}/orders/orders/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Order placed:", data);
          alert("Order Placed Successfully!");
          window.location.href = "../HTML/orders-v.html";
        } else {
          const err = await response.json();
          console.error("Order failed:", err);
          alert("Failed to place order! " + JSON.stringify(err));
        }
      } catch (error) {
        console.error("Network error:", error);
        alert("Backend not running!");
      }
    });
});
