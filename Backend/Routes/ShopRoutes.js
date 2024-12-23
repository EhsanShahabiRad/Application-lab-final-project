import express from "express";
import ShopController from "../Controllers/ShopController.js";
import PayPalController from "../Controllers/PayPalController.js";
import authenticateUser from "../Middleware/authMiddleware.js";

const router = express.Router();


router.get("/carts", ShopController.getCarts);
router.put("/carts/:id", ShopController.updateCart);
router.delete("/carts/:id", ShopController.deleteCart);
router.post("/carts", ShopController.addProduct);
router.post("/paypal/create-order", PayPalController.createOrder);
router.post("/orders/save-order", authenticateUser, PayPalController.saveOrder);
export default router;
