import mutations from "./mutations.js";
import actions from "./actions.js";
// import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      trendingCourses: [],
      singleCourse: [],
      theme:localStorage.getItem("theme") || "light"
    };
  },
  mutations,
  actions,
  //   getters,
};
