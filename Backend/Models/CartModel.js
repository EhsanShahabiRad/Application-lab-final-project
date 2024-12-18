import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  inStock: { type: Boolean, default: true },
});

const Product = mongoose.model("Product", productSchema);

const CartModel = {
  // Fetch all products to display in the "cart"
  async getAllProductsAsCarts() {
    try {
      console.log("Fetching all products as cart items...");
      const products = await Product.find();
      return products;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },
};

export default CartModel;
