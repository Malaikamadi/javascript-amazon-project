import {addToCart, cart, loadFromStorage} from '../../data/cart.js'

describe('test suite: addToCart', () => {
    it ('adds an existing product to the cart', () =>{
       
    })

    it('adds a new product to the cart', () => {
        spyOn(localStorage, 'setItem')
        //create a mock 
      spyOn(localStorage, 'getItem').and.callfake(() => {
      return JSON.stringify([]);
      });

 loadFromStorage();


        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart.length).toEquals(1)

        expect(localStorage.setItem).toHaveBeenCalledTimes(1);

        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        
    })
})