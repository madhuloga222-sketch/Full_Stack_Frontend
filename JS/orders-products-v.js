document.addEventListener("DOMContentLoaded", async function () {
  const BASE_URL = "https://full-stack-backend-omega.vercel.app";

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  const farmerId = parseInt(params.get("farmer_id")) || 1;

  const vendorName = localStorage.getItem("vendor_name") || "";
  const nameInput = document.getElementById("name");
  if (nameInput && vendorName) nameInput.value = vendorName;

  let availableQty = Infinity;
  let pricePerKg = parseFloat(params.get("price")) || 0;

  try {
    const [productRes, farmerRes] = await Promise.all([
      fetch(`${BASE_URL}/products/products/${productId}`),
      fetch(`${BASE_URL}/farmers/farmers/${farmerId}`),
    ]);
    const product = await productRes.json();
    const farmer = await farmerRes.json();

    console.log("PRODUCT API RESPONSE:", product);
    console.log("FARMER API RESPONSE:", farmer);

    pricePerKg =
      product.price_per_kg ??
      product.price ??
      product.rate ??
      product.cost ??
      pricePerKg;

    availableQty = product.quantity_kg ?? null;

    const quality = product.quality_grade ?? null;

    const location =
      product.location ??
      product.city ??
      product.area ??
      farmer.location ??
      farmer.city ??
      farmer.address ??
      null;

    const farmerName =
      farmer.full_name ?? farmer.name ?? farmer.farmer_name ?? null;

    const productName =
      product.name ??
      product.product_name ??
      product.crop_name ??
      product.title ??
      null;

    document.getElementById("detail-product").textContent =
      productName || "N/A";
    document.getElementById("detail-farmer").textContent = farmerName || "N/A";
    document.getElementById("detail-location").textContent = location || "N/A";
    document.getElementById("detail-price").textContent = pricePerKg
      ? `₹${pricePerKg}/kg`
      : "N/A";
    document.getElementById("detail-available").textContent =
      availableQty !== null ? `${availableQty} kg` : "N/A";
    document.getElementById("detail-quality").textContent = quality || "N/A";
  } catch (err) {
    console.error("Error fetching product/farmer:", err);
  }

  document
    .querySelector(".btn-place")
    .addEventListener("click", async function (e) {
      e.preventDefault();

      const vendorNameFinal =
        localStorage.getItem("vendor_name") ||
        document.getElementById("name").value.trim();

      const quantity = parseFloat(document.getElementById("quantity").value);

      if (!vendorNameFinal) {
        alert(" Name is required!");
        return;
      }

      const enteredPhone = document.getElementById("phone").value.trim();
      const savedPhone = localStorage.getItem("vendor_phone") || "";
      if (!enteredPhone) {
        alert(" Please enter your phone number!");
        return;
      }
      if (enteredPhone !== savedPhone) {
        alert(
          " Phone number does not match your registered number!\nPlease enter your registered phone number.",
        );
        return;
      }

      if (!quantity || quantity <= 0) {
        alert(" Please enter a valid quantity!");
        return;
      }
      if (availableQty !== null && quantity > availableQty) {
        alert(
          ` Quantity exceeded!\nYou entered: ${quantity} kg\nAvailable stock: ${availableQty} kg\n\nPlease enter a valid quantity.`,
        );
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

      try {
        const response = await fetch(`${BASE_URL}/orders/orders/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        });

        if (response.ok) {
          alert(" Order Placed Successfully!");
          window.location.href = "../HTML/orders-v.html";
        } else {
          const err = await response.json();
          alert(" Failed to place order! " + JSON.stringify(err));
        }
      } catch (error) {
        console.error("Network error:", error);
        alert(" Backend not running!");
      }
    });
});
