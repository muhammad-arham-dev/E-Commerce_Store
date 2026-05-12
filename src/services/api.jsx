import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

const api = {
  // Fetch all products (used in Products.jsx)
  getAllProducts: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/products?limit=100`);
      console.log("API Response:", response.data); // Debug log
      return response.data.products;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  // Fetch all categories (used in Products.jsx)
  getCategories: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/products/categories`);
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  // Fetch a single product by ID (used in ProductDetail.jsx)
  getProductById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  }
};

export default api;