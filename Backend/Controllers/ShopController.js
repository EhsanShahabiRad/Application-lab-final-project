import ProductModel from "../Models/ProductModel.js";

const ShopController = {
  getCarts: async (req, res) => {
    try {
      const products = await ProductModel.find();
      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  },
  addProduct: async (req, res) => {
    try {
      const { name, price, image, inStock } = req.body;

      if (!name || !price) {
        return res
          .status(400)
          .json({ error: "Name and Price are required fields." });
      }

      // Create a new product
      const newProduct = new ProductModel({
        name,
        price,
        image,
        inStock: inStock !== undefined ? inStock : true, 
      });

      // Save product to the database
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).json({ error: "Failed to add product" });
    }
  },

  updateCart: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedProduct = req.body;

      const result = await ProductModel.findByIdAndUpdate(id, updatedProduct, {
        new: true,
      });

      if (!result) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to update product" });
    }
  },

  deleteCart: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await ProductModel.findByIdAndDelete(id);
      if (!result) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  },
};

export default ShopController;
