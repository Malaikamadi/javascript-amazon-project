import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import '../data/cart-class.js';
//import '../data/backend-practice.js'
import { loadProducts } from "../data/products.js";


//load product from backend by using call back function
loadProducts(() => {
    renderOrderSummary(); 
    renderPaymentSummary()
 });
