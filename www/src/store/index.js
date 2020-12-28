import session from './session';
import courses from './courses';

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    session,
    courses,
  },
  state: {},
  mutations: {},
  getters: {},
  actions: {},
});
