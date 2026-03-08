// const products = [
//     {
//       name: "Tomatoes",
//       available: 500,
//       price: 45.5,
//       market: 52,
//       category: "Vegetables",
//       image: "https://images-prod.healthline.com/hlcmsresource/images/AN_images/tomatoes-1296x728-feature.jpg",
//     },
//     {
//       name: "Potatoes",
//       available: 1000,
//       price: 35,
//       market: 42,
//       category: "Vegetables",
//       image: "https://cdn.mos.cms.futurecdn.net/v2/t:0,l:420,cw:1080,ch:1080,q:80,w:1080/iC7HBvohbJqExqvbKcV3pP.jpg",
//     },
//     {
//       name: "Carrot",
//       available:300,
//       price: 55,
//       market: 48,
//       category: "Vegetables",
//       image: "https://organicbazar.net/cdn/shop/products/Untitled-design-44.jpg?v=1758026330&width=1445",
//     },
//     {
//       name: "Radish",
//       available: 300,
//       price: 55,
//       market: 48,
//       category: "Vegetables",
//       image: "https://www.metropolisindia.com/upgrade/blog/upload/25/12/Radish%20Benefits1765807962.webp",
//     },
//     {
//       name: "Mango",
//       available: 400,
//       price: 35,
//       market: 50,
//       category: "Fruits",
//       image: "https://ichef.bbci.co.uk/images/ic/1040x1040/p06hk0h6.jpg",
//     },
//     {
//       name: "Banana",
//       available: 600,
//       price: 60,
//       market: 90,
//       category: "Fruits",
//       image: "https://cdn.mos.cms.futurecdn.net/kzMYKaqQhtY2EzL7GABdah.jpg",
//     },
//      {
//       name: "Papaya",
//       available: 300,
//       price: 55,
//       market: 100,
//       category: "Fruits",
//       image: "https://cdn.wikifarmer.com/images/detailed/2023/10/Harvest-yield.png",
//     },
//      {
//       name: "Pineapple",
//       available: 800,
//       price: 60,
//       market: 110,
//       category: "Fruits",
//       image: "https://media.self.com/photos/5b4371cc4d0c3c282a8878d3/4:3/w_2560%2Cc_limit/pineapple.jpg",
//     },
//     {
//       name: "Pearl Millet (Kambu)",
//       available: 600,
//       price: 90,
//       market: 120,
//       category: "Grains",
//       image: "https://3.imimg.com/data3/CG/VQ/MY-11548528/pearl-millet-kambu-rice.jpg",
//     },
//     {
//       name: "Foxtail millet (Thinai)",
//       available: 800,
//       price: 75,
//       market: 125,
//       category: "Grains",
//       image: "https://static.wixstatic.com/media/c7c732_639d50464ed1498d81ffe011cbb14316~mv2.jpg/v1/fill/w_520,h_370,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/c7c732_639d50464ed1498d81ffe011cbb14316~mv2.jpg",
//     },
//     {
//       name: "Kodo Millet (Varagu)",
//       available: 400,
//       price: 80,
//       market: 120,
//       category: "Grains",
//       image: "https://3.imimg.com/data3/JP/LJ/MY-11548528/varagu-rice-kodo-millet-500x500.jpg",
//     },
//     {
//       name: "Corn (Makka Cholam)",
//       available: 650,
//       price: 80,
//       market: "Market: ₹230/kg",
//       category: "Grains",
//       image: "https://m.media-amazon.com/images/I/91+xeG56RqL._AC_UF1000,1000_QL80_.jpg",
//     },

//   ];

//   const container = document.getElementById("products");

//   function display(products){
//     container.innerHTML = "";
//     products.forEach((item) => {
//     const card = document.createElement("div");
//     card.className = "product-card";

//     // image
//     const imageDiv = document.createElement("div");
//     imageDiv.className = "image";

//     const img = document.createElement("img");
//     img.src = item.image;

//     const tag = document.createElement("span");
//     tag.className = "tag premium";
//     tag.innerText = "Fresh";

//     imageDiv.appendChild(img);
//     imageDiv.appendChild(tag);

//     // product content
//     const content = document.createElement("div");
//     content.className = "content";

//     const name = document.createElement("h3");
//     name.innerText = item.name;

//     const available = document.createElement("p");
//     available.innerText = item.available.toString()+"Kg Available";

//     const price = document.createElement("p");
//     price.className = "price";
//     price.innerText = "₹"+item.price.toString()+"/Kg";

//     const market = document.createElement("p");
//     market.className = "market";
//     market.innerText = "Market:₹"+item.market.toString()+"/Kg";

//     const category = document.createElement("p");
//     category.className = "harvest";
//     category.innerText = "Category:" + item.category;

//     // buttons container
//     const actions = document.createElement("div");
//     actions.className = "actions";

//     const editBtn = document.createElement("button");
//     editBtn.className = "edit-btn";
//     editBtn.innerText = "Edit";

//     const deleteBtn = document.createElement("button");
//     deleteBtn.className = "delete-btn";
//     deleteBtn.innerText = "Delete";

//     // append content
//     content.appendChild(name);
//     content.appendChild(available);
//     content.appendChild(price);
//     content.appendChild(market);
//     content.appendChild(category);
//     content.appendChild(actions);

//     actions.appendChild(editBtn);
//     actions.appendChild(deleteBtn);

//     // append card
//     card.appendChild(imageDiv);
//     card.appendChild(content);
//     container.appendChild(card);
//   });
//   console.log(products)
// }

//   display(products);
//   const btn = document.getElementById("btnId");
//   btn.addEventListener("click",filterName);
//   function filterName(){
//     const key = document.getElementById("searchInput").value.toLowerCase();

//   const filteredArr = products.filter(item =>
//     item.name.toLowerCase().includes(key) ||
//     item.category.toLowerCase().includes(key)
//   );

//   display(filteredArr);

//   if (filteredArr.length === 0) {
//     document.getElementById("rowCount").innerText = "No results found";
//     const noResult = document.createElement("div");
//     noResult.innerText = "No results found";
//     noResult.style.padding = "20px";
//     container.appendChild(noResult);
//   }
//}

// const container = document.getElementById("products");

// fetch("http://127.0.0.1:8000/products/products/")
//   .then((res) => res.json())
//   .then((data) => {
//     display(data);
//     const btn = document.getElementById("btnId");

//     btn.addEventListener("click", function () {
//       const key = document
//         .getElementById("searchInput")
//         .value.toLowerCase()
//         .trim();

//       const filteredArr = data.filter(
//         (item) =>
//           item.name.toLowerCase().includes(key) ||
//           item.category.toLowerCase().includes(key),
//       );

//       display(filteredArr);
//     });
//   })
//   .catch((error) => console.log(error));

// function display(products) {
//   container.innerHTML = "";

//   if (products.length === 0) {
//     container.innerHTML = "<h3>No results found</h3>";
//     return;
//   }

//   products.forEach((product) => {
//     const card = document.createElement("div");
//     card.className = "product-card";

//     card.innerHTML = `
//       <div class="image">
//         <img src="${product.image_url}" alt="${product.name}" />
//         <span class="tag premium">${product.quality_grade}</span>
//       </div>

//       <div class="content">
//         <h3>${product.name}</h3>
//         <p>${product.quantity_kg} kg available</p>
//         <p class="price">₹${product.price_per_kg}/kg</p>
//         <p class="market">Market: ₹${product.market_price_per_kg}/kg</p>

//         <p class="harvest">Category: ${product.category}</p>

//         <div class="buttons">
//           <a href="../HTML/edit-f.html">
//             <button class="edit-btn">Edit</button>
//           </a>
//           <button class="delete-btn">Delete</button>
//         </div>
//       </div>
//     `;

//     container.appendChild(card);
//   });
// }


const container = document.getElementById("products");

fetch("http://127.0.0.1:8000/products/products/")
  .then((res) => res.json())
  .then((data) => {
    display(data);
    const btn = document.getElementById("btnId");

    btn.addEventListener("click", function () {
      const key = document
        .getElementById("searchInput")
        .value.toLowerCase()
        .trim();

      const filteredArr = data.filter(
        (item) =>
          item.name.toLowerCase().includes(key) ||
          item.category.toLowerCase().includes(key),
      );

      display(filteredArr);
    });
  })
  .catch((error) => console.log(error));

function display(products) {
  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = "<h3>No results found</h3>";
    return;
  }

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <div class="image">
        <img src="${product.image_url}" alt="${product.name}" />
        <span class="tag premium">${product.quality_grade}</span>
      </div>

      <div class="content">
        <h3>${product.name}</h3>
        <p>${product.quantity_kg} kg available</p>
        <p class="price">₹${product.price_per_kg}/kg</p>
        <p class="market">Market: ₹${product.market_price_per_kg}/kg</p>
        <p class="harvest">Category: ${product.category}</p>

        <div class="buttons">
          <a href="../HTML/edit-f.html?id=${product.id}">
            <button class="edit-btn">Edit</button>
          </a>
          <button class="delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function deleteProduct(id) {
  if (!confirm("Delete this product?")) return;

  fetch(`http://127.0.0.1:8000/products/product/${id}/`, {
    method: "DELETE",
  }).then(() => {
    alert("Product deleted!");
    location.reload();
  });
}