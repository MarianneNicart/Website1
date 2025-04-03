// Simple Cart Simulation
let cart = [];

function addToCart(productName, price) {
    let item = { name: productName, price: price };
    cart.push(item);
    alert(`${productName} added to cart!`);
    updateCartDisplay();
}

function updateCartDisplay() {
    let cartContainer = document.getElementById("cart");
    cartContainer.innerHTML = "";

    let total = 0;
    cart.forEach(item => {
        let div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `<h3>${item.name}</h3> <p>₱${item.price}</p>`;
        cartContainer.appendChild(div);
        total += item.price;
    });

    let totalDiv = document.createElement("div");
    totalDiv.innerHTML = `<h2>Total: ₱${total}</h2>`;
    cartContainer.appendChild(totalDiv);
}

// Handle dynamic redirection and passing of product data
function viewProduct(img, name, price, rating, stock) {
    // Pass data via query string
    window.location.href = `products.html?img=${img}&name=${name}&price=${price}&rating=${rating}&stock=${stock}`;
}

// Display product details dynamically on page load
document.addEventListener("DOMContentLoaded", function () {
    // Parse query string for product data
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('name');
    const productPrice = urlParams.get('price');
    const productImg = urlParams.get('img');
    const productRating = urlParams.get('rating');
    const productStock = urlParams.get('stock');

    // Display product details dynamically if data is available
    if (productName && productPrice && productImg) {
        document.querySelector('.product-name').textContent = productName;
        document.querySelector('.product-price').textContent = `₱${productPrice}`;
        document.querySelector('.product-img').src = productImg;
        document.querySelector('.product-rating').textContent = `Rating: ${productRating} stars`;
        document.querySelector('.product-stock').textContent = `In Stock: ${productStock}`;
    }

    // Product Filtering and Display Logic
    const stars = document.querySelectorAll('.stars');
    const applyButton = document.getElementById('apply-filters');
    const clearButton = document.getElementById('clear-filters');
    const priceRange = document.getElementById('price-range');
    const checkboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]');
    const productGrid = document.querySelector('.product-grid');

    let selectedRating = 0;

    // Sample product data (add stock to each product)
    const products = [
        { name: "Stylish T-shirt", price: 500, category: "Women Apparel", rating: 4, stock: 10 },
        { name: "Classic Jeans", price: 1200, category: "Men Apparel", rating: 5, stock: 5 },
        { name: "Trendy Hoodie", price: 1500, category: "Women Apparel", rating: 3, stock: 15 },
        { name: "Trauser", price: 2500, category: "Women Apparel", rating: 5, stock: 7 },
        { name: "School Uniform", price: 800, category: "School Clothing", rating: 4, stock: 12 },
        { name: "Sewing Machine", price: 4000, category: "Machines", rating: 5, stock: 3 },
    ];

    // Function to display products dynamically, including stock and rating
    function displayProducts(filteredProducts) {
        productGrid.innerHTML = '';
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="Resources/${product.name.toLowerCase().replace(/ /g, '-')}.jpg" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>₱${product.price}</p>
                <p>Rating: ${product.rating} stars</p>
                <p>In Stock: ${product.stock}</p>
                <button onclick="viewProduct('Resources/${product.name.toLowerCase().replace(/ /g, '-')}.jpg', '${product.name}', ${product.price}, ${product.rating}, ${product.stock})">View Product</button>
            `;
            productGrid.appendChild(productCard);
        });
    }

    // Initial display of all products
    displayProducts(products);

    // Star rating selection
    stars.forEach(star => {
        star.addEventListener('click', function () {
            selectedRating = this.getAttribute('data-rating');
            stars.forEach(s => s.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Apply filters
    applyButton.addEventListener('click', function () {
        const selectedCategories = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        const maxPrice = parseInt(priceRange.value);
        const filteredProducts = products.filter(product => {
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
            const matchesPrice = product.price <= maxPrice;
            const matchesRating = selectedRating === 0 || product.rating >= selectedRating;
            return matchesCategory && matchesPrice && matchesRating;
        });

        displayProducts(filteredProducts);
    });

    // Clear filters
    clearButton.addEventListener('click', function () {
        checkboxes.forEach(checkbox => checkbox.checked = false);
        priceRange.value = 2500;
        stars.forEach(star => star.classList.remove('selected'));
        selectedRating = 0;
        displayProducts(products);
    });
});

// shop.html product card 
document.addEventListener("DOMContentLoaded", function () {
    const products = [
        {
            name: "Stylish T-shirt",
            img: "Resources/stylish-t-shirt.jpg",
            price: 500.00,
            rating: 4.5,
            available: 10,
        },
        {
            name: "Trendy Hoodie",
            img: "Resources/trendy-hoodie.jpg",
            price: 1000.00,
            rating: 4.0,
            available: 5,
        },
        {
            name: "Classic Jeans",
            img: "Resources/classic-jeans.jpg",
            price: 800.00,
            rating: 3.5,
            available: 8,
        },
        {
            name: "School Uniform",
            img: "Resources/school-uniform.jpg",
            price: 600.00,
            rating: 3.0,
            available: 15,
        },
        {
            name: "Sewing Machine",
            img: "Resources/sewing-machine.jpg",
            price: 3000.00,
            rating: 5.0,
            available: 3,
        }
    ];

    const productGrid = document.getElementById("product-grid");
    productGrid.innerHTML = ""; // Clear the grid to avoid duplicates

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";

        // Create stars dynamically with filled and empty stars
        const filledStars = "★".repeat(Math.floor(product.rating));
        const emptyStars = "☆".repeat(5 - Math.floor(product.rating));

        productCard.innerHTML = `
            <img src="${product.img}" alt="${product.name}" onerror="this.onerror=null; this.src='Resources/placeholder.png';">
            <h3>${product.name}</h3>
            <p class="price">₱${product.price.toFixed(2)}</p>
            <div class="rating">
                <span class="stars">${filledStars}${emptyStars}</span>
                <span class="rating-count">(${product.rating.toFixed(1)})</span>
            </div>
            <p class="available">In stock: <span class="available-count">${product.available}</span></p>
        `;

        // Click event to redirect with query parameters
        productCard.addEventListener("click", () => {
            window.location.href = `products.html?img=${product.img}&name=${product.name}&price=${product.price}`;
        });

        productGrid.appendChild(productCard); // Append the refined product card
    });
});
