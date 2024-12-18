import express from "express";
import UserController from "../Controllers/UserController.js";

const router = express.Router();

router.get("/users", UserController.getAllUsers);
router.post("/users", UserController.addUser);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

export default router;
