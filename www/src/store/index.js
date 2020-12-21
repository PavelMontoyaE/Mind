import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router'
import axios from 'axios';

Vue.use(VueRouter);
Vue.use(Vuex);

const state = {
  courses: [],
};

const getters = {};

const actions = {
  getCourses({ commit }) {
    axios.get('http://localhost:3030/api/course').then((response) => {
      commit('setCourses', response.data);
    });
  },
};

const mutations = {
  setCourses(state, courses) {
    state.courses = courses;
  },
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
