import User from "../Models/UserModel.js";
import bcrypt from "bcryptjs";

const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  },

  addUser: async (req, res) => {
    try {
      const { username, password, email, role } = req.body;
      const hashedPassword = bcrypt.hashSync(password, 10);

      const newUser = new User({
        username,
        password: hashedPassword,
        email,
        role: role || "user",
      });

      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error adding user:", error);
      res.status(500).json({ error: "Failed to add user" });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;

      if (updatedData.password) {
        updatedData.password = bcrypt.hashSync(updatedData.password, 10);
      }

      const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Failed to update user" });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Failed to delete user" });
    }
  },
};

export default UserController;
