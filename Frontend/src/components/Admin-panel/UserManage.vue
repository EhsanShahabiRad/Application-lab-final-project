<template>
  <div class="user-manage">
    <div class="header-row">
      <h2>Manage Users</h2>

      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search users..."
        class="search-input"
      />
      <button class="add-user-button" @click="openAddModal">+ Add User</button>
    </div>

    <div v-if="filteredUsers.length" class="user-list">
      <div v-for="user in filteredUsers" :key="user._id" class="user-item">
        <p><strong>Username:</strong> {{ user.username }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Role:</strong> {{ user.role }}</p>
        <div class="actions">
          <button class="edit-button" @click="openEditModal(user)">Edit</button>
          <button class="delete-button" @click="deleteUser(user._id)">
            Delete
          </button>
        </div>
      </div>
    </div>
    <p v-else>No users available.</p>

    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal-content">
        <h3>{{ isEditing ? "Edit User" : "Add User" }}</h3>
        <form @submit.prevent="isEditing ? saveUserChanges() : addUser()">
          <label>
            Username:
            <input v-model="currentUser.username" required />
          </label>
          <label>
            Password:
            <input v-model="currentUser.password" required type="password" />
          </label>
          <label>
            Email:
            <input v-model="currentUser.email" required />
          </label>
          <label>
            Role:
            <select v-model="currentUser.role">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <div class="modal-actions">
            <button type="submit">Save</button>
            <button type="button" @click="closeModal">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import UserService from "@/components/Admin-panel/services/UserService.js";

const users = ref([]);
const searchQuery = ref("");
const isModalOpen = ref(false);
const isEditing = ref(false);
const currentUser = ref({
  username: "",
  password: "",
  email: "",
  role: "user",
});

const fetchUsers = async () => {
  users.value = await UserService.fetchAllUsers();
};

const filteredUsers = computed(() => {
  return users.value.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const openAddModal = () => {
  currentUser.value = { username: "", password: "", email: "", role: "user" };
  isEditing.value = false;
  isModalOpen.value = true;
};

const openEditModal = (user) => {
  currentUser.value = { ...user, password: "" };
  isEditing.value = true;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const addUser = async () => {
  await UserService.addUser(currentUser.value);
  closeModal();
  fetchUsers();
};

const saveUserChanges = async () => {
  await UserService.updateUser(currentUser.value._id, currentUser.value);
  closeModal();
  fetchUsers();
};

const deleteUser = async (id) => {
  if (confirm("Are you sure you want to delete this user?")) {
    await UserService.deleteUser(id);
    fetchUsers();
  }
};

onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
.user-manage {
  max-width: 900px;
  margin: 20px auto;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  width: 250px;
}

.user-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.user-item {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
}

.actions button {
  margin-right: 5px;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
}

button {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  font-size: 14px;
}

.edit-button {
  background-color: #4caf50;
  color: white;
  margin-right: 8px;
}

.edit-button:hover {
  background-color: #45a049;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.delete-button {
  background-color: #f44336;
  color: white;
}

.delete-button:hover {
  background-color: #d32f2f;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.add-user-button {
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 16px;
  transition: all 0.3s ease;
}

.add-user-button:hover {
  background-color: #45a049;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
