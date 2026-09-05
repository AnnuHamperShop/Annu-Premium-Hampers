// ===============================
// ANNU PREMIUM HAMPERS
// Main Website JavaScript
// ===============================

const products = [
  {
    id: 1,
    name: "Birthday Premium Hamper",
    category: "Birthday",
    price: 1299,
    oldPrice: 1599,
    image: "assets/birthday/birthday1.jpg"
  },
  {
    id: 2,
    name: "Birthday Special Hamper",
    category: "Birthday",
    price: 1499,
    oldPrice: 1799,
    image: "assets/birthday/birthday2.jpg"
  },
  {
    id: 3,
    name: "Birthday Love Hamper",
    category: "Birthday",
    price: 1599,
    oldPrice: 1899,
    image: "assets/birthday/birthday3.jpg"
  },
  {
    id: 4,
    name: "Birthday Luxury Hamper",
    category: "Birthday",
    price: 1799,
    oldPrice: 2199,
    image: "assets/birthday/birthday4.jpg"
  },
  {
    id: 5,
    name: "Birthday Gift Box",
    category: "Birthday",
    price: 1199,
    oldPrice: 1499,
    image: "assets/birthday/birthday5.jpg"
  },
  {
    id: 6,
    name: "Birthday Elegant Hamper",
    category: "Birthday",
    price: 1399,
    oldPrice: 1699,
    image: "assets/birthday/birthday6.jpg"
  },
  {
    id: 7,
    name: "Birthday Royal Hamper",
    category: "Birthday",
    price: 1899,
    oldPrice: 2299,
    image: "assets/birthday/birthday7.jpg"
  },
  {
    id: 8,
    name: "Birthday Premium Gift Box",
    category: "Birthday",
    price: 1699,
    oldPrice: 1999,
    image: "assets/birthday/birthday8.jpg"
  },
  {
    id: 9,
    name: "Birthday Celebration Hamper",
    category: "Birthday",
    price: 1299,
    oldPrice: 1599,
    image: "assets/birthday/birthday9.jpg"
  }
];

let cart = JSON.parse(localStorage.getItem("annupremium_cart")) || [];

// ===============================
// CATEGORY
// ===============================

function setCategory(category) {
  const select = document.getElementById("category");

  if (select) {
    select.value = category;
  }

  renderProducts();

  document.getElementById("shop").scrollIntoView({
    behavior: "smooth"
  });
}

// ===============================
// PRODUCTS
// ===============================
function renderBirthdayProducts() {
  const container = document.getElementById("birthdayProducts");

  if (!container) return;

  const birthdayProducts = products.filter(
    product => product.category === "Birthday"
  );

  container.innerHTML = birthdayProducts.map(product => `
    <div class="birthday-product">
      <img src="${product.image}" alt="${product.name}">

      <div class="birthday-product-info">
        <h3>${product.name}</h3>

        <div class="birthday-price">
          <strong>₹${product.price}</strong>
          <span>₹${product.oldPrice}</span>
        </div>

        <button onclick="addToCart(${product.id})">
          Select
        </button>
      </div>
    </div>
  `).join("");
}

function renderProducts() {
  const container = document.getElementById("products");
  const searchInput = document.getElementById("search");
  const categorySelect = document.getElementById("category");

  if (!container) return;

  const search = searchInput
    ? searchInput.value.toLowerCase().trim()
    : "";

  const category = categorySelect
    ? categorySelect.value
    : "All";

  const filtered = products.filter(product => {
    const matchCategory =
      category === "All" || product.category === category;

    const matchSearch =
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search);

    return matchCategory && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML =
      "<p>No hampers found.</p>";
    return;
  }

  container.innerHTML = filtered.map(product => `
    <div class="product">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
        <span class="tag">${product.category}</span>
      </div>

      <div class="product-body">
        <h3>${product.name}</h3>
        <p>Beautifully curated for special moments.</p>

        <div class="price-row">
          <div>
            <span class="price">₹${product.price}</span>
            <span class="old">₹${product.oldPrice}</span>
          </div>

          <button class="add" onclick="addToCart(${product.id})">
            Select
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

// ===============================
// ADD TO CART
// ===============================

function addToCart(id) {
  const product = products.find(p => p.id === id);

  if (!product) return;

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      ...product,
      qty: 1
    });
  }

  saveCart();

  showToast(product.name + " selected");

  openCart();
}

// ===============================
// CART
// ===============================

function saveCart() {
  localStorage.setItem(
    "annupremium_cart",
    JSON.stringify(cart)
  );

  updateCartCount();
  renderCart();
}

function updateCartCount() {
  const count = cart.reduce(
    (total, item) => total + item.qty,
    0
  );

  const element = document.getElementById("cartCount");

  if (element) {
    element.textContent = count;
  }
}

function renderCart() {
  const container = document.getElementById("cartItems");
  const totalElement = document.getElementById("cartTotal");

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML =
      "<p>Your cart is empty.</p>";

    if (totalElement) {
      totalElement.textContent = "₹0";
    }

    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-row">

      <img src="${item.image}" alt="${item.name}">

      <div class="grow">
        <b>${item.name}</b>
        <small>₹${item.price}</small>

        <div class="qty">
          <button onclick="changeQty(${item.id}, -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${item.id}, 1)">+</button>
        </div>
      </div>

      <button class="remove" onclick="removeFromCart(${item.id})">
        Remove
      </button>

    </div>
  `).join("");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (totalElement) {
    totalElement.textContent = "₹" + total;
  }
}

function changeQty(id, amount) {
  const item = cart.find(p => p.id === id);

  if (!item) return;

  item.qty += amount;

  if (item.qty <= 0) {
    cart = cart.filter(p => p.id !== id);
  }

  saveCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);

  saveCart();

  showToast("Item removed");
}

// ===============================
// OPEN / CLOSE CART
// ===============================

function openCart() {
  const modal = document.getElementById("cartModal");

  if (modal) {
    modal.classList.remove("hidden");
  }

  renderCart();
}

function closeCart() {
  const modal = document.getElementById("cartModal");

  if (modal) {
    modal.classList.add("hidden");
  }
}

// ===============================
// CHECKOUT
// ===============================

function openCheckout() {
  if (cart.length === 0) {
    showToast("Your cart is empty");
    return;
  }

  closeCart();

  const modal =
    document.getElementById("checkoutModal");

  if (modal) {
    modal.classList.remove("hidden");
  }
}

function closeCheckout() {
  const modal =
    document.getElementById("checkoutModal");

  if (modal) {
    modal.classList.add("hidden");
  }
}

function placeOrder(event) {
  event.preventDefault();

  const form = event.target;
  const data = new FormData(form);

  const name = data.get("name");

  alert(
    "Thank you " +
    name +
    "! Your order has been placed successfully."
  );

  cart = [];

  saveCart();

  form.reset();

  closeCheckout();
}

// ===============================
// MOBILE MENU
// ===============================

function toggleMenu() {
  const nav = document.getElementById("nav");

  if (nav) {
    nav.classList.toggle("open");
  }
}

// ===============================
// SEARCH
// ===============================

function focusSearch() {
  const search = document.getElementById("search");

  if (search) {
    document.getElementById("shop").scrollIntoView({
      behavior: "smooth"
    });

    setTimeout(() => {
      search.focus();
    }, 500);
  }
}

// ===============================
// TOAST
// ===============================

function showToast(message) {
  const toast = document.getElementById("toast");

  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

// ===============================
// START WEBSITE
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderBirthdayProducts();
  updateCartCount();
  renderCart();
});
