let products = [];
let cart = JSON.parse(localStorage.getItem("shopkartCart")) || [];

const productIcons = {
    "Laptop": "💻",
    "Smartphone": "📱",
    "Headphones": "🎧",
    "Smart Watch": "⌚"
};


/* ================= LOAD PRODUCTS ================= */

async function loadProducts() {

    try {

        const response = await fetch("/api/products");

        if (!response.ok) {
            throw new Error("Unable to load products");
        }

        products = await response.json();

        displayProducts(products);

        updateCart();

    } catch (error) {

        console.error(error);

        document.getElementById("productGrid").innerHTML = `
            <div class="loading">
                Unable to load ShopKart products.
            </div>
        `;
    }
}


/* ================= DISPLAY PRODUCTS ================= */

function displayProducts(items) {

    const grid = document.getElementById("productGrid");

    if (items.length === 0) {

        grid.innerHTML = `
            <div class="loading">
                No products found.
            </div>
        `;

        return;
    }

    grid.innerHTML = items.map(product => {

        const icon = productIcons[product.name] || "🛍️";

        return `
            <article class="product-card">

                <div
                    class="product-image"
                    onclick="openProduct(${product.id})"
                >

                    <span class="product-category">
                        ${product.category}
                    </span>

                    ${icon}

                </div>

                <div class="product-info">

                    <h3>${product.name}</h3>

                    <p class="product-description">
                        ${product.description}
                    </p>

                    <div class="product-bottom">

                        <span class="price">
                            ₹${Number(product.price).toLocaleString("en-IN")}
                        </span>

                        <button
                            class="add-cart"
                            onclick="addToCart(${product.id})"
                        >
                            Add to Cart
                        </button>

                    </div>

                </div>

            </article>
        `;

    }).join("");
}


/* ================= SEARCH ================= */

function searchProducts() {

    const search = document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search)
    );

    displayProducts(filtered);

    document.getElementById("productsSection")
        .scrollIntoView({ behavior: "smooth" });
}


/* ================= CATEGORY ================= */

function filterCategory(category) {

    const filtered = products.filter(
        product => product.category === category
    );

    displayProducts(filtered);

    document.getElementById("productsSection")
        .scrollIntoView({ behavior: "smooth" });
}


/* ================= NAVIGATION ================= */

function showHome() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function showProducts() {

    displayProducts(products);

    document.getElementById("productsSection")
        .scrollIntoView({ behavior: "smooth" });
}


/* ================= CART ================= */

function addToCart(productId) {

    const product = products.find(
        product => product.id === productId
    );

    if (!product) {
        return;
    }

    const existing = cart.find(
        item => item.id === productId
    );

    if (existing) {

        existing.quantity += 1;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();
    updateCart();

    toggleCart(true);
}


function updateCart() {

    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    document.getElementById("cartCount").textContent = count;

    const cartItems =
        document.getElementById("cartItems");

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <div style="font-size:60px;">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add products to start shopping.</p>
            </div>
        `;

    } else {

        cartItems.innerHTML = cart.map(item => {

            const icon =
                productIcons[item.name] || "🛍️";

            return `
                <div class="cart-item">

                    <div class="cart-item-image">
                        ${icon}
                    </div>

                    <div class="cart-item-info">

                        <h4>${item.name}</h4>

                        <p>
                            ₹${Number(item.price)
                                .toLocaleString("en-IN")}
                        </p>

                        <div class="quantity-controls">

                            <button
                                onclick="changeQuantity(${item.id}, -1)"
                            >
                                −
                            </button>

                            <strong>
                                ${item.quantity}
                            </strong>

                            <button
                                onclick="changeQuantity(${item.id}, 1)"
                            >
                                +
                            </button>

                            <button
                                class="remove-item"
                                onclick="removeFromCart(${item.id})"
                            >
                                Remove
                            </button>

                        </div>

                    </div>

                </div>
            `;

        }).join("");
    }

    const total = calculateTotal();

    document.getElementById("cartTotal").textContent =
        formatPrice(total);

    document.getElementById("checkoutTotal").textContent =
        formatPrice(total);
}


function changeQuantity(productId, amount) {

    const item = cart.find(
        item => item.id === productId
    );

    if (!item) {
        return;
    }

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(
            item => item.id !== productId
        );
    }

    saveCart();
    updateCart();
}


function removeFromCart(productId) {

    cart = cart.filter(
        item => item.id !== productId
    );

    saveCart();
    updateCart();
}


function calculateTotal() {

    return cart.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );
}


function formatPrice(value) {

    return "₹" + Number(value).toLocaleString("en-IN");
}


function saveCart() {

    localStorage.setItem(
        "shopkartCart",
        JSON.stringify(cart)
    );
}


/* ================= CART DRAWER ================= */

function toggleCart(forceOpen = null) {

    const drawer =
        document.getElementById("cartDrawer");

    const overlay =
        document.getElementById("cartOverlay");

    const shouldOpen =
        forceOpen !== null
            ? forceOpen
            : !drawer.classList.contains("open");

    if (shouldOpen) {

        drawer.classList.add("open");
        overlay.classList.add("active");

    } else {

        drawer.classList.remove("open");
        overlay.classList.remove("active");
    }
}


/* ================= PRODUCT DETAILS ================= */

function openProduct(productId) {

    const product = products.find(
        product => product.id === productId
    );

    if (!product) {
        return;
    }

    const icon =
        productIcons[product.name] || "🛍️";

    document.getElementById("productDetails").innerHTML = `

        <div class="modal-product">

            <div class="modal-product-image">
                ${icon}
            </div>

            <div class="modal-product-info">

                <p class="section-label">
                    ${product.category}
                </p>

                <h2>${product.name}</h2>

                <p>
                    ${product.description}
                </p>

                <div class="modal-price">
                    ${formatPrice(product.price)}
                </div>

                <button
                    class="primary-button"
                    onclick="addToCart(${product.id}); closeProductModal();"
                >
                    Add to Cart
                </button>

            </div>

        </div>
    `;

    document
        .getElementById("productModal")
        .classList.add("active");
}


function closeProductModal() {

    document
        .getElementById("productModal")
        .classList.remove("active");
}


/* ================= LOGIN ================= */

function openLogin() {

    document
        .getElementById("loginModal")
        .classList.add("active");
}


function closeLogin() {

    document
        .getElementById("loginModal")
        .classList.remove("active");
}


function loginUser() {

    const email =
        document.getElementById("loginEmail").value;

    const password =
        document.getElementById("loginPassword").value;

    const message =
        document.getElementById("loginMessage");

    if (!email || !password) {

        message.textContent =
            "Please enter email and password.";

        message.style.color = "#d33";

        return;
    }

    message.textContent =
        "Demo login successful!";

    message.style.color = "#16803c";

    setTimeout(() => {

        closeLogin();

    }, 1000);
}


/* ================= CHECKOUT ================= */

function openCheckout() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }

    updateCart();

    document
        .getElementById("checkoutModal")
        .classList.add("active");
}


function closeCheckout() {

    document
        .getElementById("checkoutModal")
        .classList.remove("active");
}


document
    .getElementById("checkoutForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        if (cart.length === 0) {
            return;
        }

        const order = {

            customer: {
                name:
                    document
                        .getElementById("customerName")
                        .value,

                email:
                    document
                        .getElementById("customerEmail")
                        .value,

                address:
                    document
                        .getElementById("customerAddress")
                        .value
            },

            items: cart.map(item => ({
                product_id: item.id,
                product: item.name,
                quantity: item.quantity,
                price: item.price
            })),

            total: calculateTotal()
        };


        try {

            const response = await fetch(
                "/api/orders",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify(order)
                }
            );

            const result =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    result.error || "Order failed"
                );
            }


            document.getElementById(
                "checkoutForm"
            ).style.display = "none";


            document.getElementById(
                "orderMessage"
            ).innerHTML = `

                <div class="success-message">

                    <div style="font-size:60px;">
                        ✅
                    </div>

                    <h3>
                        Order Placed Successfully!
                    </h3>

                    <p>
                        Thank you for shopping with ShopKart.
                    </p>

                    <br>

                    <button
                        class="primary-button"
                        onclick="finishOrder()"
                    >
                        Continue Shopping
                    </button>

                </div>
            `;

        } catch (error) {

            document.getElementById(
                "orderMessage"
            ).innerHTML = `
                <p style="color:#d33;">
                    ${error.message}
                </p>
            `;
        }

    });


function finishOrder() {

    cart = [];

    saveCart();
    updateCart();

    document.getElementById(
        "checkoutForm"
    ).reset();

    document.getElementById(
        "checkoutForm"
    ).style.display = "block";

    document.getElementById(
        "orderMessage"
    ).innerHTML = "";

    closeCheckout();
    toggleCart(false);
}


/* ================= START APPLICATION ================= */

loadProducts();
