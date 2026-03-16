document.addEventListener("DOMContentLoaded", function () {
  const formElement = document.getElementById("productForm");
  const BASE_URL = "https://full-stack-backend-omega.vercel.app";

  formElement.addEventListener("submit", async function (event) {
    event.preventDefault();

    const nameValue = document.getElementById("product-name").value.trim();
    const categoryValue = document.getElementById("category").value;
    const quantityValue = document.getElementById("quantity").value;
    const priceValue = document.getElementById("price").value;
    const marketPriceValue = document.getElementById("market-price").value;
    const qualityValue = document.getElementById("quality_grade").value;
    const imageUrlValue = document.getElementById("image_url").value.trim();

    if (
      !nameValue ||
      !categoryValue ||
      !quantityValue ||
      !priceValue ||
      !marketPriceValue ||
      !qualityValue ||
      !imageUrlValue
    ) {
      alert("All fields are required");
      return;
    }

    const farmerId = parseInt(localStorage.getItem("farmer_id")) || 1;
    const token = localStorage.getItem("token");

    const dataObject = {
      name: nameValue,
      category: categoryValue,
      quantity_kg: Number(quantityValue),
      price_per_kg: Number(priceValue),
      market_price_per_kg: Number(marketPriceValue),
      quality_grade: qualityValue,
      image_url: imageUrlValue,
      farmer_id: farmerId,
    };

    console.log("Sending:", dataObject);

    try {
      const response = await fetch(`${BASE_URL}/products/products/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(dataObject),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Success:", responseData);
        alert("Product Added Successfully!");
        formElement.reset();
       
        window.location.href = "../HTML/products-f.html";
      } else {
        const errorData = await response.json();
        console.error("Backend Error:", errorData);
        alert("Failed to add product. Check console.");
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Backend not running or wrong URL.");
    }
  });
});
