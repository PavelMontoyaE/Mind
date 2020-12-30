import typeService from '../services/types.service.js';

export default {
  namespaced: true,
  state: {
    types: [],
    type: {},
    loading: false,
    typeDrawer: false,
    successMessage: '',
    errorMessage: '',
  },
  actions: {
    async getTypes({ commit }) {
      const types = await typeService.getAll();
      commit('setTypes', types);
    },
    async getTypeById({ commit }, id) {
      const type = await typeService.findOne(id);
      commit('setType', type);
    },
    async updateType({ commit, dispatch }, payload) {
      commit('setLoading', true);
      const response = await typeService.update(payload);
      dispatch('manageResponse', response);
    },
    async deleteType({ commit, dispatch }, id) {
      commit('setLoading', true);
      const response = await typeService.delete(id);
      dispatch('manageResponse', response);
    },
    async createType({ commit, dispatch }, payload) {
      commit('setLoading', true);
      const response = await typeService.create(payload);
      if (response.id) {
        await dispatch('getTypes');
        commit('setSuccessMessage', `Type "${response.name}" was created.`);
        commit('setTypeDrawer', false);
      }
    },
    async manageResponse({ commit, dispatch }, response) {
      if (response.message) {
        await dispatch('getTypes');
        commit('setSuccessMessage', response.message);
        commit('setTypeDrawer', false);
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
    setTypes(state, types) {
      state.types = types;
    },
    setType(state, type) {
      state.type = type;
    },
    setLoading(state, value) {
      state.loading = value;
    },
    setTypeDrawer(state, value) {
      state.typeDrawer = value;
    },
    setSuccessMessage(state, value) {
      state.successMessage = value;
    },
    setErrorMessage(state, value) {
      state.successMessage = value;
    },
    cleanStates(state) {
      state.type = {};
      state.loading = false;
      state.typeDrawer = false;
      state.successMessage = '';
      state.errorMessage = '';
    },
  },
};
