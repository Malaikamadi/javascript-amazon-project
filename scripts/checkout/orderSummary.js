import { cart, removeFromCart } from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

// Delivery Date
const today = dayjs();
console.log(today.format('dddd, MMM D '));

export function renderOrderSummary() {
  let cartSummarryHTML = '';

  cart.forEach((cartItem) => {
    let matchingProduct = getProduct(cartItem.productId);

    // To show the selected delivery date
    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    // Ensure valid deliveryDays value
    let deliveryDays = deliveryOption?.deliveryDays;
    if (typeof deliveryDays !== 'number' || isNaN(deliveryDays)) {
      deliveryDays = 7;
    }

    // Calculate the delivery date based on the selected option
    const deliveryDate = today.add(deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMM D');

    cartSummarryHTML += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date js-delivery-date-${matchingProduct.id}">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image" src="${matchingProduct.image}" />

                <div class="cart-item-details">
                    <div class="product-name">${matchingProduct.name}</div>
                    <div class="product-price">$${formatCurrency(matchingProduct.priceCents)}</div>
                    <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary">
                            Update
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                            Delete
                        </span>
                    </div>
                    ${deliveryOptionsHTML(matchingProduct, cartItem)} 
                </div>
            </div>
        </div>
    `;
  });

  document.querySelector('.js-order-summary').innerHTML = cartSummarryHTML;

  // Handle delivery option change and update the delivery date display
  document.querySelectorAll('.delivery-option-input').forEach((input) => {
    input.addEventListener('change', (event) => {
      const productId = event.target.dataset.productId;
      const selectedOptionId = event.target.value;

      // Find the selected delivery option for the product
      const selectedOption = deliveryOptions.find(option => option.id == selectedOptionId);

      if (selectedOption) {
        // Update the delivery date based on the selected option
        const deliveryDays = selectedOption.deliveryDays;
        const newDeliveryDate = today.add(deliveryDays, 'days');
        const newDateString = newDeliveryDate.format('dddd, MMM D');

        // Update the delivery date on the page
        const deliveryDateElement = document.querySelector(`.js-delivery-date-${productId}`);
        if (deliveryDateElement) {
          deliveryDateElement.textContent = `Delivery date: ${newDateString}`;
        }
        
        // Update the delivery option id in the cart (assuming cart is mutable)
        cart.forEach((cartItem) => {
          if (cartItem.productId === productId) {
            cartItem.deliveryOptionId = selectedOptionId;
          }
        });

        // Re-render the payment summary to update shipping costs
        renderPaymentSummary();
      }
    });
  });

  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId; // Correctly get the productId from the data attribute

      // Call the removeFromCart function to update cart data
      removeFromCart(productId);

      // Select the cart item container to remove
      const container = document.querySelector(`.js-cart-item-container-${productId}`);

      // Remove the container if it exists
      if (container) {
        container.remove();
        renderPaymentSummary();  // Re-render the payment summary after removal
      }
    });
  });
}

function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = '';
  deliveryOptions.forEach((deliveryOption) => {
    // Ensure valid deliveryDays value for each option
    let deliveryDays = deliveryOption?.deliveryDays;
    if (typeof deliveryDays !== 'number' || isNaN(deliveryDays)) {
      deliveryDays = 7; // Fallback to 7 days if invalid
    }

    // Calculate the delivery date for each option
    const deliveryDate = today.add(deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMM D');
    const priceString = deliveryOption.priceCents === 0
      ? 'FREE'
      : `$${formatCurrency(deliveryOption.priceCents )}`; // Price formatting

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `
      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio"
            ${isChecked ? ' checked ' : ''}
            class="delivery-option-input" name="delivery-option-${matchingProduct.id}" data-product-id="${matchingProduct.id}" value="${deliveryOption.id}" />
          <div>
            <div class="delivery-option-date">${dateString}</div>
            <div class="delivery-option-price">${priceString}</div>
          </div>
        </div>
      </div>
    `;
  });
  return html;
}
