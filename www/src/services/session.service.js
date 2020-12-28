import axios from 'axios';
import router from '../router';

const sessionService = {
  getSession() {
    const session = JSON.parse(localStorage.getItem('user'));
    if (session && session.data) {
      return session.data.user;
    }
    return {};
  },
  async login(payload) {
    const sessionData = await axios.post(
      `http://localhost:3030/api/v2/session`,
      payload
    );
    localStorage.setItem('user', JSON.stringify(sessionData));
  },
  logout() {
    localStorage.removeItem('user');
    router.push('home');
  },
};

export default sessionService;
