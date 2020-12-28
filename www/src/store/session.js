import router from '../router';
import sessionService from '../services/session.service';

export default {
  namespaced: true,
  state: {
    loading: false,
    userSession: {},
    loginError: '',
  },
  actions: {
    getSession({ commit }) {
      const session = sessionService.getSession();
      commit('setSession', session);
    },
    login({ commit }, payload) {
      sessionService
        .login(payload)
        .then(() => {
          const session = sessionService.getSession();
          commit('setSession', session);
          commit('setLoginError', '');
          router.push('/');
        })
        .catch((err) => {
          const { response } = err;
          if (response && response.data) {
            const { msg } = response.data;
            commit('setLoginError', msg);
          } else if (err) {
            console.log(err);
            commit('setLoginError', 'Oops! something happened');
          }
        });
      commit('setLoading');
    },
    logout({ commit }) {
      commit('setSession', {});
      sessionService.logout();
    },
  },
  mutations: {
    setLoading(state) {
      state.loading = true;
    },
    setSession(state, session) {
      state.userSession = session;
    },
    setLoginError(state, message) {
      state.loading = false;
      state.loginError = message;
    },
  },
};
