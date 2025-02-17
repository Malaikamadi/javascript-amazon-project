import { cart } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { formatCurrency } from '../utils/money.js';

export function renderPaymentSummary() {
  if (cart.length === 0) {
    document.querySelector('.js-payment-summary').innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let productPriceCent = 0;
  let shippingPriceCents = 0;

  // Iterate through the cart items once
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId); // Get the product based on productId
    console.log('Product:', product); // Debug: check the product

    if (product) {
      productPriceCent += product.priceCents * cartItem.quantity; // Accumulate product price
    }

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId); // Get the delivery option
    console.log('Delivery Option:', deliveryOption); // Debug: check the delivery option

    if (deliveryOption) {
      shippingPriceCents += deliveryOption.priceCents; // Accumulate shipping price
    }
  });

  console.log('Product Price (Cents):', productPriceCent); // Debug: total product price in cents
  console.log('Shipping Price (Cents):', shippingPriceCents); // Debug: total shipping price in cents

  const totalBeforeTaxCents = productPriceCent + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;
  
  console.log('Total Before Tax (Cents):', totalBeforeTaxCents); // Debug: total before tax
  console.log('Estimated Tax (Cents):', taxCents); // Debug: estimated tax in cents
  console.log('Total (Cents):', totalCents); // Debug: final total

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
        Order Summary
    </div>

    <div class="payment-summary-row">
        <div>Items (${cart.length}):</div> 
        <div class="payment-summary-money">
            $${formatCurrency(productPriceCent)}
        </div>
    </div>

    <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">
            $${formatCurrency(shippingPriceCents)}
        </div>
    </div>

    <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">
            $${formatCurrency(totalBeforeTaxCents)}
        </div>
    </div>

    <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">
            $${formatCurrency(taxCents)}
        </div>
    </div>

    <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">
            $${formatCurrency(totalCents)}
        </div>
    </div>

    <button class="place-order-button button-primary">
        Place your order
    </button>
  `;

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}
