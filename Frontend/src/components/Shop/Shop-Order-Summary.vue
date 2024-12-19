<template>
  <div class="order-summary">
    <h2>Order Summary</h2>
    <div class="summary-item">
      <span>Subtotal:</span>
      <span>${{ subtotal }}</span>
    </div>
    <div class="summary-item">
      <span>Shipping estimate:</span>
      <span>${{ shippingCost }}</span>
    </div>
    <div class="summary-item">
      <span>Tax estimate:</span>
      <span>${{ tax }}</span>
    </div>
    <div class="summary-total">
      <strong>Order Total:</strong>
      <strong>${{ orderTotal }}</strong>
    </div>

    <div id="paypal-button-container"></div>
  </div>
</template>

<script setup>
import { ref, defineProps, computed, onMounted } from "vue";

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
});

const subtotal = computed(() =>
  props.products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  )
);
const shippingCost = computed(() => (subtotal.value > 0 ? 10 : 0));
const tax = computed(() => (subtotal.value * 0.1).toFixed(2));
const orderTotal = computed(() =>
  (subtotal.value + shippingCost.value + parseFloat(tax.value)).toFixed(2)
);

const loadPayPalScript = () => {
  return new Promise((resolve) => {
    if (document.getElementById("paypal-sdk")) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.id = "paypal-sdk";
    script.src =
      "https://www.paypal.com/sdk/js?client-id=ATh-kF_0SKEldVCWjaQY-SlzqR9MMonydr7LfMG3FgGSuSglKeXKL4xjlJOb1m_iyZE8AIu-608VQTaV&currency=USD";
    script.onload = resolve;
    document.body.appendChild(script);
  });
};

const renderPayPalButton = async () => {
  await loadPayPalScript();

  window.paypal
    .Buttons({
      createOrder: async () => {
        try {
          const response = await fetch(
            "http://localhost:3000/api/paypal/create-order",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderTotal: orderTotal.value }),
            }
          );

          const data = await response.json();

          if (!response.ok || !data.id) {
            console.error("Error creating order:", data);
            alert("Failed to create PayPal order. Please try again.");
            throw new Error("Failed to create PayPal order");
          }

          return data.id;
        } catch (error) {
          console.error("Error in createOrder:", error);
          alert("Failed to create order. Please try again later.");
          throw error;
        }
      },
      onApprove: async (data) => {
        try {
          const token = localStorage.getItem("authToken");

          const saveOrderPayload = {
            orderId: data.orderID,
            items: props.products.filter((item) => item.quantity > 0),
            orderTotal: orderTotal.value,
          };

          const saveOrderResponse = await fetch(
            "http://localhost:3000/api/orders/save-order",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(saveOrderPayload),
            }
          );

          if (saveOrderResponse.ok) {
            alert("Payment Successful and Order Saved!");
          } else {
            const errorData = await saveOrderResponse.json();
            console.error("Save Order Response Error:", errorData);
            alert(
              "Payment was successful, but we couldn't save the order. Please contact support."
            );
          }
        } catch (error) {
          console.error("Error saving order:", error);
          alert(
            "Payment was successful, but an error occurred while saving the order."
          );
        }
      },
      onError: (err) => {
        console.error("Error during PayPal checkout:", err);
        alert("An error occurred during the payment process.");
      },
    })
    .render("#paypal-button-container");
};

onMounted(() => {
  renderPayPalButton();
});
</script>

<style scoped>
.order-summary {
  max-width: 300px;
  background: #f9fafb;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-left: auto;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-weight: bold;
  border-top: 1px solid #ccc;
  padding-top: 10px;
}

#paypal-button-container {
  margin-top: 20px;
}
</style>
