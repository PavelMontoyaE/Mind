import axios from 'axios';
import { authHeader } from '../helpers/auth-header';

const courseService = {
  async getAll() {
    const response = await axios.get('http://localhost:3030/api/v2/courses');
    return response.data;
  },
  async findOne(id) {
    const response = await axios.get(
      `http://localhost:3030/api/v2/courses/${id}`,
      authHeader()
    );
    return response.data;
  },
};

export default courseService;
