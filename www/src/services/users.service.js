import axios from 'axios';
import { authHeader } from '../helpers/auth-header';

const userService = {
  async getAll() {
    const response = await axios.get('http://localhost:3030/api/v2/users');
    return response.data;
  },
  async findOne(id) {
    const response = await axios.get(
      `http://localhost:3030/api/v2/users/${id}`,
      authHeader()
    );
    return response.data;
  },
  async findOneWithCourses(id) {
    const response = await axios.get(
      `http://localhost:3030/api/v2/users/${id}/courses`,
      authHeader()
    );
    return response.data;
  },
  async update(user) {
    const response = await axios.put(
      `http://localhost:3030/api/v2/users/${user.id}`,
      user,
      authHeader()
    );
    return response.data;
  },
  async delete(id) {
    const response = await axios.delete(
      `http://localhost:3030/api/v2/users/${id}`,
      authHeader()
    );
    return response.data;
  },
  async create(user) {
    const response = await axios.post(
      'http://localhost:3030/api/v2/users',
      user,
      authHeader()
    );
    return response.data;
  },
};

export default userService;
