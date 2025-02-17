export let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Set default cart items if cart is empty
if (!cart.length) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionsId: "1"
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionsId: "2"
    }
  ];
  saveToStorage();
}

// Save cart to localStorage
function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add product to cart
export function addToCart(productId) {
  let matchingItem = cart.find(cartItem => cartItem.productId === productId);
  
  if (matchingItem) {
    matchingItem.quantity += 1; // ✅ Fix: Correctly increment quantity
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionsId: "1"
    });
  }
  
  saveToStorage();
}

// Remove product from cart
export function removeFromCart(productId) {
  cart = cart.filter(cartItem => cartItem.productId !== productId);
  saveToStorage();
}
