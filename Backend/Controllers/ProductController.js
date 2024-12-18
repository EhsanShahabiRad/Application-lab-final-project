import ProductModel from "../Models/ProductModel.js";

const ProductController = {
  async getProducts(req, res) {
    try {
      const products = await ProductModel.find();
      return res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  },
};

export default ProductController;
