import fs from "node:fs/promises";

class CartService {
  constructor() {
    this.dataPath = "../backend/data/ShoppingCarts.json";
  }

  async getAllCarts() {
    try {
      const data = await fs.readFile(this.dataPath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      throw new Error(`Failed to read cart data: ${error.message}`);
    }
  }
}

export default CartService;
