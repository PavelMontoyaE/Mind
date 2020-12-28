import courseService from '../services/courses.service.js';

export default {
  namespaced: true,
  state: {
    courses: [],
    course: {},
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
    cleanStates({ commit }) {
      commit('cleanStates');
    },
  },
  mutations: {
    setCourses(state, courses) {
      state.courses = courses;
    },
    serCourse(state, course) {
      state.course = course;
    },
    cleanStates(state) {
      state.course = {};
    },
  },
};
