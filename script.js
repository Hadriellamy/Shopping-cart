let cart = JSON.parse(localStorage.getItem("cart")) || {};

async function fetchProducts() {
    try {
        const res = await fetch("https://fakestoreapi.com/products");
        const products = await res.json();
        displayProducts(products);
        updateSummary();
    } catch (error) {
        document.getElementById("products").innerHTML = "<p>Error loading products.</p>";
        console.error("Fetch error:", error);
    }
}

function displayProducts(products) {
    const container = document.getElementById("products");
    container.innerHTML = "";
    products.forEach(product => {
        const quantity = cart[product.id]?.qty || 0;
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <h4>${product.title}</h4>
            <img src="${product.image}" />
            <p>Price: $${product.price}</p>
            <input type="number" min="0" value="${quantity}" onchange="updateCart(${product.id}, ${product.price}, this.value)">
            <button onclick="removeProduct(${product.id})">Remove</button>
        `;
        container.appendChild(card);
    });
}

function updateCart(id, price, qty) {
    qty = parseInt(qty);
    if (qty <= 0) {
        delete cart[id];
    } else {
        cart[id] = { price: price, qty: qty };
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateSummary();
}

function removeProduct(id) {
    delete cart[id];
    localStorage.setItem("cart", JSON.stringify(cart));
    fetchProducts();
}

function updateSummary() {
    let total = 0;
    let count = 0;
    for (let id in cart) {
        total += cart[id].price * cart[id].qty;
        count += cart[id].qty;
    }
    let shipping = count > 4 ? 10 : 0;
    document.getElementById("total").innerText = `Total: $${total.toFixed(2)}`;
    document.getElementById("shipping").innerText = `Shipping: $${shipping}`;
}