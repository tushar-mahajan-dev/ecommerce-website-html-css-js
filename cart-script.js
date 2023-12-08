// Sample cart data (you would typically pass this data from the previous page or fetch it from a server/database)
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to render the cart items on the cart page
function renderCartItems() {
    const cartItemsList = document.getElementById('cart-items-list');
    cartItemsList.innerHTML = '';

    let cartTotal = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
            <div class="cart-item-details">
                <img src="product.jpg" alt="${item.name}">
                <p>${item.name}</p>
                <p>Price: $${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-quantity">
                <input type="number" class="quantity" value="${item.quantity}" min="1">
                <button class="update" data-index="${index}">Update</button>
                <button class="remove" data-index="${index}">Remove</button>
            </div>
            <div class="cart-item-price">
                <p class="item-price">$${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        `;

        cartTotal += item.price * item.quantity;
        cartItemsList.appendChild(cartItem);
    });

    const cartTotalElement = document.getElementById('cart-total');
    cartTotalElement.textContent = cartTotal.toFixed(2);
}

// Function to update the cart in local storage
function updateLocalStorageCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to handle updating the quantity of a cart item
function handleUpdateQuantity(index, quantity) {
    if (quantity < 1) {
        alert('Quantity cannot be less than 1. Use "Remove" to delete the item.');
        quantity = 1;
    }
    cart[index].quantity = quantity;
    updateLocalStorageCart();
    renderCartItems();
}

// Function to handle removing a cart item
function handleRemoveItem(index) {
    cart.splice(index, 1);
    updateLocalStorageCart();
    renderCartItems();
}

// Function to handle the "Update Cart" button click
function handleUpdateCartClick() {
    // You can perform additional actions here if needed
    alert('Cart Updated!'); // Example: Show a confirmation message
}

// Function to handle quantity change and update the displayed item price
function handleQuantityChange(input, index) {
    input.addEventListener('input', function () {
        const newQuantity = parseInt(input.value);
        if (newQuantity < 1) {
            alert('Quantity cannot be less than 1. Use "Remove" to delete the item.');
            input.value = 1;
        }

        // Update the item's quantity in the cart
        cart[index].quantity = newQuantity;

        // Update the displayed item price
        const itemPrice = cart[index].price * newQuantity;
        const priceElements = document.querySelectorAll('.item-price');
        priceElements[index].textContent = `$${itemPrice.toFixed(2)}`;

        updateLocalStorageCart();

        // Recalculate the total cart price
        let cartTotal = 0;
        cart.forEach(item => {
            cartTotal += item.price * item.quantity;
        });
        const cartTotalElement = document.getElementById('cart-total');
        cartTotalElement.textContent = cartTotal.toFixed(2);
    });
}

// Function to initialize event listeners
function initializeEventListeners() {
    const updateButtons = document.querySelectorAll('.update');
    const removeButtons = document.querySelectorAll('.remove');
    const quantityInputs = document.querySelectorAll('.quantity');
    const updateCartButton = document.getElementById('update-cart');
    const continueShoppingLink = document.getElementById('continue-shopping');

    updateCartButton.addEventListener('click', handleUpdateCartClick);

    updateButtons.forEach(button => {
        button.addEventListener('click', function () {
            const index = button.getAttribute('data-index');
            const newQuantity = parseInt(quantityInputs[index].value);
            handleUpdateQuantity(index, newQuantity);
        });
    });

    removeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const index = button.getAttribute('data-index');
            handleRemoveItem(index);
        });
    });

    quantityInputs.forEach((input, index) => {
        handleQuantityChange(input, index);
    });
}

// Initialize the cart items and event listeners
renderCartItems();
initializeEventListeners();
