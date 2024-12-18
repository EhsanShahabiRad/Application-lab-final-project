<template>
  <div class="product-manage">
    <div class="header-row">
      <h2>Manage Products</h2>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search products..."
        class="search-input"
      />
      <button class="add-product-button" @click="openAddModal">
        + Add Product
      </button>
    </div>

    <div v-if="filteredProducts.length" class="product-list">
      <ProductCart
        v-for="product in filteredProducts"
        :key="product._id"
        :product="product"
        @edit-product="openEditModal"
        @delete-product="deleteProduct"
      />
    </div>

    <p v-else>No products found.</p>

    <div v-if="isEditModalOpen" class="modal-overlay">
      <div class="modal-content">
        <h3>Edit Product</h3>
        <form @submit.prevent="saveProductChanges">
          <label>
            Name:
            <input v-model="editableProduct.name" type="text" required />
          </label>
          <label>
            Price:
            <input v-model="editableProduct.price" type="number" required />
          </label>
          <label>
            Image URL:
            <input v-model="editableProduct.image" type="text" required />
          </label>
          <label>
            In Stock:
            <select v-model="editableProduct.inStock" required>
              <option :value="true">Yes</option>
              <option :value="false">No</option>
            </select>
          </label>
          <div class="modal-actions">
            <button type="submit" class="save-button">Save</button>
            <button type="button" @click="closeEditModal" class="cancel-button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="isAddModalOpen" class="modal-overlay">
      <div class="modal-content">
        <h3>Add New Product</h3>
        <form @submit.prevent="addNewProduct">
          <label>
            Name:
            <input v-model="newProduct.name" type="text" required />
          </label>
          <label>
            Price:
            <input v-model="newProduct.price" type="number" required />
          </label>
          <label>
            Image URL:
            <input v-model="newProduct.image" type="text" required />
          </label>
          <label>
            In Stock:
            <select v-model="newProduct.inStock" required>
              <option :value="true">Yes</option>
              <option :value="false">No</option>
            </select>
          </label>
          <div class="modal-actions">
            <button type="submit" class="save-button">Add</button>
            <button type="button" @click="closeAddModal" class="cancel-button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import ProductCart from "./ProductCart.vue";

const products = ref([]);
const searchQuery = ref("");
const isEditModalOpen = ref(false);
const isAddModalOpen = ref(false);
const editableProduct = ref({});
const newProduct = ref({
  name: "",
  price: 0,
  image: "",
  inStock: true,
});

const fetchProducts = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/carts");
    products.value = response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const filteredProducts = computed(() => {
  return products.value.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const openAddModal = () => (isAddModalOpen.value = true);
const closeAddModal = () => {
  isAddModalOpen.value = false;
  newProduct.value = { name: "", price: 0, image: "", inStock: true };
};
const addNewProduct = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/carts",
      newProduct.value
    );
    products.value.push(response.data);
    closeAddModal();
    alert("Product added successfully!");
  } catch (error) {
    console.error("Error adding product:", error);
  }
};

const openEditModal = (product) => {
  editableProduct.value = { ...product };
  isEditModalOpen.value = true;
};
const closeEditModal = () => (isEditModalOpen.value = false);
const saveProductChanges = async () => {
  try {
    const { _id, ...updatedProduct } = editableProduct.value;
    await axios.put(`http://localhost:3000/api/carts/${_id}`, updatedProduct);
    const index = products.value.findIndex((product) => product._id === _id);
    if (index !== -1) products.value[index] = { _id, ...updatedProduct };
    closeEditModal();
    alert("Product updated successfully!");
  } catch (error) {
    console.error("Error updating product:", error);
  }
};

const deleteProduct = async (productId) => {
  if (!confirm("Are you sure you want to delete this product?")) return;
  try {
    await axios.delete(`http://localhost:3000/api/carts/${productId}`);
    products.value = products.value.filter(
      (product) => product._id !== productId
    );
    alert("Product deleted successfully!");
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};

onMounted(fetchProducts);
</script>

<style scoped>
.product-manage {
  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
  background: #f9fafb;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
h2 {
  text-align: left;
  color: #4f46e5;
}
.search-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 300px;
  margin-right: 10px;
}
.add-product-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}
.add-product-button:hover {
  background-color: #45a049;
}
.product-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
p {
  text-align: center;
  color: #666;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  position: relative;
}

.modal-content h3 {
  margin-bottom: 15px;
  color: #333;
}

.modal-content form label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

.modal-content input,
.modal-content select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.save-button {
  background-color: #4caf50;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.save-button:hover {
  background-color: #45a049;
}

.cancel-button {
  background-color: #f44336;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-button:hover {
  background-color: #d32f2f;
}
</style>
