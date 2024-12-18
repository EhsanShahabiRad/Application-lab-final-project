import { ref } from "vue";

export const isAuthenticated = ref(!!localStorage.getItem("authToken"));
export const isAdmin = ref(localStorage.getItem("role") === "admin");

export function login(token, role) {
  localStorage.setItem("authToken", token);
  localStorage.setItem("role", role); 
  isAuthenticated.value = true;
  isAdmin.value = role === "admin";
}

export function logout() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("role");
  isAuthenticated.value = false;
  isAdmin.value = false;
}
