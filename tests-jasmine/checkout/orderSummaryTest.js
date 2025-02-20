
import { loadFromStorage } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";

describe("test suite: renderOrderSummary", () => {
  it("displays the cart", () => {
    // Set up the test DOM container
    document.body.innerHTML = `<div class="js-test-container">
                                  <div class="js-order-summary"></div>
                               </div>`;

    // Mock localStorage to return a valid cart array
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: "2",
        },
      ]);
    });

    // Call function to load cart from storage
    loadFromStorage();

    // Call function to render order summary
    renderOrderSummary();

    // Assert that the order summary container has content
    const orderSummary = document.querySelector(".js-order-summary");
    expect(orderSummary.innerHTML).not.toBe("");
  });
});
