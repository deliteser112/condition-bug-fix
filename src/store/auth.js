import service from "@/services/service.js";

export default {
  namespaced: true,
  state: {
    token: "",
  },
  getters: {
    authenticaded(state) {
      return state.token;
    },
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
  },
  actions: {
    async logIn({ dispatch }, credentials) {
      let response = await service.post("api/login_check", credentials);
      return dispatch("attempt", response.data.token);
    },
    async attempt({ commit }, token) {
      if (token) {
        commit("SET_TOKEN", token);
      }
    },
  },
};
