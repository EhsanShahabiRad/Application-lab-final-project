<template>
    <div class="product-cart">
      <img :src="product.image" alt="Product Image" class="product-image" />
      <div class="product-details">
        <h3>{{ product.name }}</h3>
        <p>Price: ${{ product.price }}</p>
        <p>In Stock: {{ product.inStock ? "Yes" : "No" }}</p>
      </div>
      <div class="product-actions">
        <button @click="editProduct" class="edit-button">Edit</button>
        <button @click="deleteProduct" class="delete-button">Delete</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from "vue";
  
  const props = defineProps({
    product: {
      type: Object,
      required: true,
    },
  });
  
  const emit = defineEmits(["edit-product", "delete-product"]);
  
  const editProduct = () => {
    emit("edit-product", props.product);
  };
  
  const deleteProduct = () => {
    emit("delete-product", props.product._id);
  };
  </script>
  
  <style scoped>
  .product-cart {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 5px;
    background: #fff;
  }
  
  .product-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 5px;
  }
  
  .product-details {
    flex-grow: 1;
    margin-left: 15px;
  }
  
  .product-actions button {
    margin-left: 10px;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .edit-button {
    background-color: #4caf50;
    color: white;
  }
  
  .delete-button {
    background-color: #f44336;
    color: white;
  }
  </style>
  