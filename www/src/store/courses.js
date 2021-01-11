import courseService from '../services/courses.service.js';

export default {
  namespaced: true,
  state: {
    courses: [],
    course: {},
    loading: false,
    courseDrawer: false,
    drawerType: '',
    successMessage: '',
    errorMessage: '',
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
    async updateCourse({ commit, dispatch }, payload) {
      commit('setLoading', true);
      const response = await courseService.update(payload);
      dispatch('manageResponse', response);
    },
    async deleteCourse({ commit, dispatch }, id) {
      commit('setLoading', true);
      const response = await courseService.delete(id);
      dispatch('manageResponse', response);
    },
    async createCourse({ commit, dispatch }, payload) {
      commit('setLoading', true);
      const response = await courseService.create(payload);
      if (response.id) {
        await dispatch('getCourses');
        commit('setSuccessMessage', `Course "${response.name}" was created.`);
        commit('setCourseDrawer', false);
      }
    },
    async assignUser({ commit, dispatch, state }, payload) {
      commit('setLoading', true);
      const response = await courseService.assignUser(state.course.id, payload);
      dispatch('manageResponse', response);
    },
    async unassignUser({ commit, dispatch, state }, userId) {
      commit('setLoading', true);
      const response = await courseService.unassignUser(
        state.course.id,
        userId
      );
      dispatch('manageResponse', response);
    },
    async updateCourseUser({ commit, dispatch, state }, { userId, payload }) {
      commit('setLoading', true);
      const response = await courseService.updateCourseUser(
        state.course.id,
        userId,
        payload
      );
      dispatch('manageResponse', response);
    },
    async manageResponse({ commit, dispatch }, response) {
      if (response.message) {
        await dispatch('getCourses');
        commit('setSuccessMessage', response.message);
        commit('setCourseDrawer', false);
      } else if (response.error) {
        const { message } = response.error;
        commit('setErrorMessage', message);
      }
      commit('setLoading', false);
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
    setCourseDrawer(state, value) {
      state.courseDrawer = value;
    },
    setDrawerType(state, value) {
      state.drawerType = value;
    },
    setSuccessMessage(state, value) {
      state.successMessage = value;
    },
    setErrorMessage(state, value) {
      state.successMessage = value;
    },
    cleanStates(state) {
      state.course = {};
      state.loading = false;
      state.courseDrawer = false;
    },
  },
};
