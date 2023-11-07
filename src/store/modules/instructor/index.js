import mutations from "./mutations.js";
import actions from "./actions.js";
// import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      profile: {},
      lastCourseAdded: {},
      currentCourse: {},
      deletedVideo: {},
      selfCourses: [],
      lastSectionAdded: {},
      deletedSection: {},
      publishedCourse: {},
      editedCourse: {},
      coursePurchases: {},
    };
  },
  mutations,
  actions,
  //   getters,
};
