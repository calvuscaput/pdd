import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    context: null,
  },
  getters: {
  },
  mutations: {
    SET_CONTEXT(state, context) {
      state.context = context;
    },
  },
  actions: {
    setContext({ commit }, payload) {
      commit('SET_CONTEXT', payload);
    },
  },
  modules: {
  },
});
