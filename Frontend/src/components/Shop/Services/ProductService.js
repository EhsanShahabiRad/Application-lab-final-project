export default class ProductService {
  constructor(apiEndpoint) {
    this.apiEndpoint = apiEndpoint;
  }

  async fetchAllProducts() {
    try {
      const response = await fetch(`${this.apiEndpoint}/api/carts`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching products:", error.message);
      return [];
    }
  }

  calculateSubtotal(products) {
    return products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  }
}
