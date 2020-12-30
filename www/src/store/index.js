import session from './session';
import courses from './courses';
import types from './types';

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    session,
    courses,
    types,
  },
  state: {},
  mutations: {},
  getters: {},
  actions: {},
});
