import session from './session';
import courses from './courses';
import types from './types';
import users from './users';

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    session,
    courses,
    types,
    users,
  },
  state: {},
  mutations: {},
  getters: {},
  actions: {},
});
