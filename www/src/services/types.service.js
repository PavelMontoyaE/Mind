import axios from 'axios';
import { authHeader } from '../helpers/auth-header';

const typeService = {
  async getAll() {
    const response = await axios.get(
      'http://localhost:3030/api/v2/types',
      authHeader()
    );
    return response.data;
  },
  async findOne(id) {
    const response = await axios.get(
      `http://localhost:3030/api/v2/types/${id}`,
      authHeader()
    );
    return response.data;
  },
  async update(type) {
    const response = await axios.put(
      `http://localhost:3030/api/v2/types/${type.id}`,
      type,
      authHeader()
    );
    return response.data;
  },
  async delete(id) {
    const response = await axios.delete(
      `http://localhost:3030/api/v2/types/${id}`,
      authHeader()
    );
    return response.data;
  },
  async create(type) {
    const response = await axios.post(
      'http://localhost:3030/api/v2/types',
      type,
      authHeader()
    );
    return response.data;
  },
};

export default typeService;
