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