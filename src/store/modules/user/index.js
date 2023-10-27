import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      name: "",
      _id: localStorage.getItem("_id") || "",
      email: localStorage.getItem("email") || "",
      token: localStorage.getItem("token") || "",
      type: localStorage.getItem("type") || "",
    };
  },
  mutations,
  actions,
  getters,
};
