document.addEventListener("DOMContentLoaded", async function () {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  const token = localStorage.getItem("token");

  const BASE_URL = "https://full-stack-backend-omega.vercel.app";
  try {
    const response = await fetch(
      `${BASE_URL}/products/products/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
// https://full-stack-backend-omega.vercel.app/products/products/

    const product = await response.json();
    console.log(" Product loaded:", product);

    setValue("productName", product.name);
    setValue("category", product.category);
    setValue("quantity", product.quantity_kg);
    setValue("price", product.price_per_kg);
    setValue("market-price", product.market_price_per_kg);
    setValue("image_url", product.image_url);
    setValue("description", product.description);

    const rawGrade = (product.quality_grade || "").toLowerCase().trim();

    const gradeMap = {
      premium: "high",
      "grade-a": "high",
      "grade-b": "medium",
      "grade-c": "standard",
      high: "high",
      medium: "medium",
      standard: "standard",
    };

    const normalizedGrade = gradeMap[rawGrade] || rawGrade;
    setValue("quality", normalizedGrade);
  } catch (err) {
    console.error(" Load error:", err);
    alert("Failed to load product details.");
  }

  document
    .getElementById("productFormEdit")
    .addEventListener("submit", async function (e) {
      e.preventDefault();

      const token = localStorage.getItem("token");
      const farmerId = parseInt(localStorage.getItem("farmer_id")) || 1;

      const qualityValue = document.getElementById("quality").value;

      if (!qualityValue) {
        alert("Please select a quality grade.");
        return;
      }

      const updatedData = {
        name: document.getElementById("productName").value,
        category: document.getElementById("category").value,
        quantity_kg: parseFloat(document.getElementById("quantity").value),
        price_per_kg: parseFloat(document.getElementById("price").value),
        market_price_per_kg: parseFloat(
          document.getElementById("market-price").value,
        ),
        image_url: document.getElementById("image_url").value,
        quality_grade: qualityValue,
        farmer_id: farmerId,
      };

      console.log(" Saving:", updatedData);

      try {
        const res = await fetch(
          `${BASE_URL}/products/products/${productId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
          },
        );

        // https://full-stack-backend-omega.vercel.app/products/products/

        if (res.ok) {
          alert(" Product updated successfully!");
          window.location.href = "../HTML/products-f.html";
        } else {
          const err = await res.json();
          console.error(" Update failed:", err);
          alert("Update failed: " + (err.detail || "Unknown error"));
        }
      } catch (err) {
        console.error(" Error:", err);
        alert("Something went wrong. Please try again.");
      }
    });
});

function setValue(id, value) {
  const el = document.getElementById(id);
  if (el && value !== undefined && value !== null) {
    el.value = value;
  }
}
