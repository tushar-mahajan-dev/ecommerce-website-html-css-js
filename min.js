// Sample product data (you would typically fetch this from a server or database)
const products = [
    { name: "Downshifter Sports Shoes", price: 100, description: "Description of Product 1." },
    { name: "Sports Shoes", price: 75, description: "Description of Product 2." },
    // Add more products here
];

const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to display a selected product
function displaySelectedProduct(productName, productPrice, productDescription) {
    const selectedProductDiv = document.getElementById('selected-product');
    selectedProductDiv.innerHTML = `
        <h2>${productName}</h2>
        <img src="product.jpg" alt="${productName}">
        <p>${productDescription}</p>
        <p>Price: $${productPrice.toFixed(2)}</p>
        <button class="add-to-cart" data-product="${productName}" data-price="${productPrice}">Add to Cart</button>
    `;
}

// Function to update the cart count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

// Event listener to handle "Add to Cart" button click for the selected product
document.addEventListener('click', function (event) {
    const button = event.target;
    if (button.classList.contains('add-to-cart')) {
        const productName = button.getAttribute('data-product');
        const productPrice = parseFloat(button.getAttribute('data-price'));
        cart.push({ name: productName, price: productPrice });
        updateCartCount();
        // Save the cart data to local storage
        localStorage.setItem('cart', JSON.stringify(cart));
    }
});

// Initialize the product list
const productButtons = document.querySelectorAll('.product');
productButtons.forEach(product => {
    product.addEventListener('click', () => {
        const productName = product.querySelector('h2').textContent;
        const productPrice = parseFloat(product.querySelector('p').textContent.slice(1));
        const productDescription = product.querySelector('p.description').textContent;
        displaySelectedProduct(productName, productPrice, productDescription);
    });
});
