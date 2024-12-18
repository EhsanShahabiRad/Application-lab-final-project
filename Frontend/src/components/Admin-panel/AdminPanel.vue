<template>
  <div class="admin-panel">
    <div class="tab-menu">
      <button
        @click="activeTab = 'products'"
        :class="{ active: activeTab === 'products' }"
      >
        Manage Products
      </button>
      <button
        @click="activeTab = 'users'"
        :class="{ active: activeTab === 'users' }"
      >
        Manage Users
      </button>
    </div>

    <div>
      <ProductManage v-if="activeTab === 'products'" />
      <UserManage v-if="activeTab === 'users'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ProductManage from "./ProductManage.vue";
import UserManage from "./UserManage.vue";

const activeTab = ref("products");
</script>

<style scoped>
.admin-panel {
  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
  background: #f9fafb;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.admin-title {
  text-align: center;
  color: #4f46e5;
  margin-bottom: 20px;
}

.tab-menu {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.tab-menu button {
  background-color: #4f46e5;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.tab-menu button.active {
  background-color: #3b32c2;
  font-weight: bold;
}

.tab-menu button:hover {
  background-color: #3b32c2;
}
</style>
