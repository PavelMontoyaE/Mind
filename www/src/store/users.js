import userService from '../services/users.service.js';

export default {
  namespaced: true,
  state: {
    user: {},
  },
  actions: {
    async getUser({ commit }) {
      const session = JSON.parse(localStorage.getItem('user'));
      const { user: userSession } = session.data;
      const user = await userService.findOneWithCourses(userSession.id);
      commit('setUser', user);
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
};
