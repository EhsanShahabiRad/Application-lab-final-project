<template>
  <nav class="secondary-menu">
    <ul>
      <li>
        <router-link to="/shop" active-class="active">Shop</router-link>
      </li>
      <li>
        <router-link to="/contact" active-class="active">Contact</router-link>
      </li>
      <li v-if="isAdmin">
        <router-link to="/admin" active-class="active">Admin Panel</router-link>
      </li>
      <li v-if="!authStatus">
        <router-link to="/login" active-class="active">Login</router-link>
      </li>
      <li v-if="authStatus">
        <button @click="handleLogout" class="logout-button">Logout</button>
      </li>
    </ul>
  </nav>

  <div class="container">
    <router-view />
  </div>
</template>

<script>
import { computed } from "vue";
import { isAuthenticated, isAdmin, logout } from "./store/auth.js";
import { useRouter } from "vue-router";

export default {
  setup() {
    const authStatus = computed(() => isAuthenticated.value);
    const isAdminStatus = computed(() => isAdmin.value);
    const router = useRouter();

    const handleLogout = () => {
      logout();
      router.push("/login");
    };

    return { authStatus, isAdmin: isAdminStatus, handleLogout };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.secondary-menu {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  padding: 10px 0;
  margin: 5px auto;
  width: 90%;
  max-width: 800px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.secondary-menu ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.secondary-menu ul li a,
.secondary-menu ul li button {
  color: #333;
  text-decoration: none;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background 0.3s ease, color 0.3s ease;
  cursor: pointer;
  border: none;
  background: none;
}

.secondary-menu ul li a:hover,
.secondary-menu ul li button:hover {
  background: #b7b6b6;
  color: white;
}

.secondary-menu ul li .active {
  background: #7f7f7e;
  color: white;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 4px;
}

.container {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  width: 90%;
  max-width: 800px;
  margin: 5px auto;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.logout-button {
  font-weight: bold;
}
</style>
