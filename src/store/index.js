import { createStore } from "vuex";
import actions from "./actions";
import user from "./modules/user/index";
import student from "./modules/student/index";
import common from "./modules/common/index";
const store = createStore({
  modules: {
    user: user,
    student: student,
    common
  },
  actions,
});

export default store;
