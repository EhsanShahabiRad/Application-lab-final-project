<template>
    <div class="carts-list">
      <ShopCart
        v-for="product in products"
        :key="product._id"
        :product="product"
        @update-quantity="updateQuantity"
      />
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from "vue";
  import ShopCart from "./Shop-Cart.vue";
  
  const props = defineProps({
    products: Array,
  });
  
  const emit = defineEmits(["update-quantity"]);
  
  const updateQuantity = (updatedProduct) => {
    emit("update-quantity", updatedProduct);
  };
  </script>
  
  <style scoped>
  .carts-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  </style>
  