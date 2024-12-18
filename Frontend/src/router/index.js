import { createRouter, createWebHistory } from "vue-router";
import About from "../components/About.vue";
import Projects from "../components/Projects.vue";
import Contact from "@/components/Contact.vue";
import Shop from "@/components/Shop.vue";
import Login from "@/components/Login.vue";
import Checkout from "@/components/Checkout.vue";
import AdminPanel from "@/components/Admin-panel/AdminPanel.vue";
import { isAuthenticated, isAdmin } from "../store/auth.js";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Shop,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/projects",
    name: "Projects",
    component: Projects,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/shop",
    name: "Shop",
    component: Shop,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
  },
  {
    path: "/admin",
    name: "AdminPanel",
    component: AdminPanel,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated.value && isAdmin.value) {
        next();
      } else {
        next({ name: "Login" });
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === "Checkout" && !isAuthenticated.value) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
