import axios from "axios";

const BASE_URL = "http://localhost:3000/api/users";

const UserService = {
  async fetchAllUsers() {
    const response = await axios.get(BASE_URL);
    return response.data;
  },

  async addUser(userData) {
    const response = await axios.post(BASE_URL, userData);
    return response.data;
  },

  async updateUser(id, userData) {
    const response = await axios.put(`${BASE_URL}/${id}`, userData);
    return response.data;
  },

  async deleteUser(id) {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  },
};

export default UserService;
