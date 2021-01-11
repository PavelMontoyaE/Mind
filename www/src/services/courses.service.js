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
  async update(course) {
    const response = await axios.put(
      `http://localhost:3030/api/v2/courses/${course.id}`,
      course,
      authHeader()
    );
    return response.data;
  },
  async delete(id) {
    const response = await axios.delete(
      `http://localhost:3030/api/v2/courses/${id}`,
      authHeader()
    );
    return response.data;
  },
  async create(course) {
    const response = await axios.post(
      'http://localhost:3030/api/v2/courses',
      course,
      authHeader()
    );
    return response.data;
  },
  async assignUser(id, user) {
    const response = await axios.post(
      `http://localhost:3030/api/v2/courses/${id}/user`,
      user,
      authHeader()
    );
    return response.data;
  },
  async unassignUser(id, userId) {
    const response = await axios.delete(
      `http://localhost:3030/api/v2/courses/${id}/user/${userId}`,
      authHeader()
    );
    return response.data;
  },
  async updateCourseUser(id, userId, payload) {
    const response = await axios.put(
      `http://localhost:3030/api/v2/courses/${id}/user/${userId}`,
      payload,
      authHeader()
    );
    return response.data;
  },
};

export default courseService;
