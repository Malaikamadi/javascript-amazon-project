export let cart;

loadFromStorage();

// Load cart from localStorage
export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) || []; // ✅ Default to an empty array

  if (cart.length === 0) { // ✅ Ensure it's an array before checking length
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
}

// Save cart to localStorage
function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add product to cart
export function addToCart(productId) {
  let matchingItem = cart.find(cartItem => cartItem.productId === productId);
  
  if (matchingItem) {
    matchingItem.quantity += 1;
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


export function loadCart(fun){
  const xhr = new XMLHttpRequest()

  xhr.addEventListener('load', () => {
 
fun()  
})
console.log('load products')
  xhr.open('GET', 'https://supersimplebackend.dev/cart')
  xhr.send()

} //loading the cart from the back end

