import mongoose from "mongoose";

// Define Product 
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  inStock: { type: Boolean, default: true },
});

const ProductModel = mongoose.model("Product", ProductSchema);
export default ProductModel;
