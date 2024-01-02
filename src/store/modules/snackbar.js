const state = {
  snackbar: {
    visible: false,
    message: "",
    type: "",
  },
};

const mutations = {
  showSnackbar(state, { message, type }) {
    state.snackbar.visible = true;
    state.snackbar.message = message;
    state.snackbar.type = type;
  },

  hideSnackbar(state) {
    state.snackbar.visible = false;
    state.snackbar.type = "";
    state.snackbar.message = "";
  },
};

const actions = {
  showSnackbar({ commit }, { message, type }) {
    commit("showSnackbar", { message, type });
    setTimeout(() => {
      commit("hideSnackbar");
    }, 2000);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
