import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    context: {
      query: {
        ticket: [],
        topic: [],
      },
      filters: {
        // Убрать успешные вопросы
        skipSuccess: false,
        // Убрать Неизвестные вопросы
        skipDontTouched: false,
        // Убрать Убрать неуспешные вопросы
        skipErrors: false,
      },
      sorting: {
        errorsInStockCountDescending: true,
        shuffle: false,
      },
      mode: {
        saveProgress: true,
        infinity: false,
      },
    },
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
