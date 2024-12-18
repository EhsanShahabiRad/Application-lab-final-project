import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import UserModel from "./Models/UserModel.js";

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("MongoDB Connection Failed:", err);
    process.exit(1);
  }
};

// Function to Add Default Users
const addDefaultUsers = async () => {
  try {
    const adminPassword = bcrypt.hashSync("admin", 10);
    const userPassword = bcrypt.hashSync("user", 10);

    // Add users
    const defaultUsers = [
      {
        username: "admin",
        email: "admin@example.com",
        password: adminPassword,
      },
      {
        username: "user",
        email: "user@example.com",
        password: userPassword,
      },
    ];

    // Save user in the database
    for (const user of defaultUsers) {
      const existingUser = await UserModel.findUserByUsername(user.username);
      if (!existingUser) {
        await UserModel.saveUser(user);
        console.log(`User "${user.username}" added successfully.`);
      } else {
        console.log(`User "${user.username}" already exists.`);
      }
    }

    mongoose.connection.close();
    console.log("Database Connection Closed.");
  } catch (err) {
    console.error("Error adding users:", err);
    mongoose.connection.close();
  }
};


connectDB().then(addDefaultUsers);
