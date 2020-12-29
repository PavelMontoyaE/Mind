import courseService from '../services/courses.service.js';

export default {
  namespaced: true,
  state: {
    courses: [],
    course: {},
    loading: false,
  },
  actions: {
    async getCourses({ commit }) {
      const courses = await courseService.getAll();
      commit('setCourses', courses);
    },
    async getCourseById({ commit }, id) {
      const course = await courseService.findOne(id);
      commit('setCourse', course);
    },
    async updateCourse({ commit }, payload) {
      commit('setLoading', true);
      const update = await courseService.update(payload);
      if (update) {
        commit('setLoading', false);
        console.log(update);
      }
    },
    cleanStates({ commit }) {
      commit('cleanStates');
    },
  },
  mutations: {
    setCourses(state, courses) {
      state.courses = courses;
    },
    setCourse(state, course) {
      state.course = course;
    },
    setLoading(state, value) {
      state.loading = value;
    },
    cleanStates(state) {
      state.course = {};
    },
  },
};
