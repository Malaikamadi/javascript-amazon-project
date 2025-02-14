export const cart = [];

export function addToCart (productId) {
    let matchingItem;
    
    cart.forEach((cartItem) =>{
       if (productId === item.product){
         matchingItem= cartItem;
       }
    }) 
    if (matchingItem) {
      matchingItem += 1;
    
    } else{
      cart.push({
        productId: productId,
        quantity: 1
      })
    }
  }