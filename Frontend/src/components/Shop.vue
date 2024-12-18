<template>
  <div class="shop-container">
    <div class="carts-section">
      <ShopCartsList
        :products="products"
        @update-quantity="updateQuantity"
      />
    </div>
    <div class="summary-section">
      <ShopOrderSummary :products="products" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ShopCartsList from "./Shop/Shop-Carts-List.vue";
import ShopOrderSummary from "./Shop/Shop-Order-Summary.vue";
import ProductService from "./Shop/Services/ProductService.js";

const products = ref([]);
const productService = new ProductService("http://localhost:3000");


const fetchProducts = async () => {
  const fetchedProducts = await productService.fetchAllProducts();
  products.value = fetchedProducts.map((product) => ({
    ...product,
    quantity: 0,
  }));
};


const updateQuantity = (updatedProduct) => {
  const index = products.value.findIndex((p) => p._id === updatedProduct._id);
  if (index !== -1) {
    products.value[index] = updatedProduct;
  }
};

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
.shop-container {
  display: flex;
  gap: 20px;
  max-width: 1200px;
  margin: auto;
}

.carts-section {
  flex: 2;
}

.summary-section {
  flex: 1;
}
</style>
