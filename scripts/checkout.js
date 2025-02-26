import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import '../data/cart-class.js';
//import '../data/backend-practice.js'
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";

//promises in js - all js to do mutliple things at once
//promise is an object that represents the eventual completion or failure of an asynchronous operation

Promise.all([ new Promise((resolve) => {
    loadProducts(() => {
    resolve('value1'); //resolve is a function that is called when the promise is fulfilled to go to the next step
    })
 }),
 new Promise((resolve) => {
    loadCart(() => {
    resolve();
    }
    )

    })
]).then((values) => {
    renderOrderSummary(); 
    renderPaymentSummary()
})


    // new Promise((resolve) => {
    // loadProducts(() => {
    // resolve('value1'); //resolve is a function that is called when the promise is fulfilled to go to the next step
    // })
    // }).then((value) => {

    //     console.log(value);
    //     loadCart(() => {
    //     return new Promise((resolve) => {
    //         loadCart(() => {
    //         resolve();
    //         }
    //         )

    //         }).then(() => {
    //             renderOrderSummary(); 
    //             renderPaymentSummary()          
    //         });
    //     });
    // }
    // );


//load product from backend by using call back function
  /*  loadProducts(() => {
    loadCart(() => {
    renderOrderSummary(); 
    renderPaymentSummary()
        }
        )
    });*/

    
