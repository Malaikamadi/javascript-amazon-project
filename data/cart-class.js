class Cart{
    cartItems ;
    localStorageKey;


constructor(localStorageKey){
  this.localStorageKey = 'localStorageKey';

  // ✅ Load cart on startup
  this.loadFromStorage();

}
    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem('this.localStorageKey')) || []; // ✅ Default to empty array
    
        if (this.cartItems.length === 0) { // ✅ Ensure it's an array before checking length
          this.cartItems = [
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
          this.saveToStorage(); 
        }
      };
      saveToStorage() {
        localStorage.setItem("this.localStorageKey", JSON.stringify(this.cartItems));
      };
    
      addToCart(productId) {
        let matchingItem = this.cartItems.find(cartItem => cartItem.productId === productId);
    
        if (matchingItem) {
          matchingItem.quantity += 1;
        } else {
          this.cartItems.push({
            productId: productId,
            quantity: 1,
            deliveryOptionsId: "1"
          });
        }
        
        this.saveToStorage(); // ✅ Save after modifying the cart
      };
      removeFromCart(productId) {
        this.cartItems = this.cartItems.filter(cartItem => cartItem.productId !== productId); // ✅ Filter directly
        this.saveToStorage();
      }
    }
  
  
  //oop  object-oriented-programming
  const cart = new Cart('cart-oop');
  const businessCart = new Cart('cart-business');

  
  console.log(cart);
  console.log(businessCart)




    
      
    
      
    
      