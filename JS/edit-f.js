window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  console.log("Product ID:", id);

  if (!id) {
    alert("No product selected!");
    return;
  }

  fetch(`http://127.0.0.1:8000/products/products/${id}/`)
    .then((res) => res.json())
    .then((product) => {
      console.log("Product data:", product);

      document.getElementById("productName").value = product.name;
      document.getElementById("category").value =
        product.category.toLowerCase();
      document.getElementById("quantity").value = product.quantity_kg;
      document.getElementById("price").value = product.price_per_kg;
      document.getElementById("market-price").value =
        product.market_price_per_kg;
      document.getElementById("quality").value =
        product.quality_grade.toLowerCase();
      document.getElementById("image_url").value = product.image_url;
    })
    .catch((err) => console.log("Fetch error:", err));

  document.querySelector(".btn-save").addEventListener("click", function (e) {
    e.preventDefault();

    const updatedData = {
      name: document.getElementById("productName").value,
      category: document.getElementById("category").value,
      quantity_kg: document.getElementById("quantity").value,
      price_per_kg: document.getElementById("price").value,
      market_price_per_kg: document.getElementById("market-price").value,
      quality_grade: document.getElementById("quality").value,
      image_url: document.getElementById("image_url").value,
    };

    fetch(`http://127.0.0.1:8000/products/products/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Product updated successfully!");
        window.location.href = "../HTML/products-f.html";
      })
      .catch((err) => console.log("Update error:", err));
  });
};
