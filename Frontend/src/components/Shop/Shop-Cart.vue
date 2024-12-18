<template>
  <div class="cart-item">
    <img :src="product.image" alt="Product Image" class="product-image" />
    <div class="product-details">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-price">Price: ${{ product.price }}</p>
      <div class="quantity-controls">
        <button @click="decreaseQuantity">-</button>
        <span>{{ product.quantity }}</span>
        <button @click="increaseQuantity">+</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  product: Object,
});

const emit = defineEmits(["update-quantity"]);

const increaseQuantity = () => {
  emit("update-quantity", { ...props.product, quantity: props.product.quantity + 1 });
};

const decreaseQuantity = () => {
  if (props.product.quantity > 0) {
    emit("update-quantity", { ...props.product, quantity: props.product.quantity - 1 });
  }
};
</script>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #e2e2e2;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 15px;
}

.product-details {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.product-name {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.product-price {
  margin: 5px 0;
  font-size: 14px;
  color: #777;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.quantity-controls button {
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-weight: bold;
}

.quantity-controls button:hover {
  background-color: #4138d9;
}
</style>
