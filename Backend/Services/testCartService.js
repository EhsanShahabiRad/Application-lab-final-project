import CartService from "./CartService.js";

const cartService = new CartService();

cartService
  .getAllCarts()
  .then((carts) => {
    console.log("Carts:", carts);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
