import { createStore } from "vuex";
import actions from "./actions";
import user from "./modules/user/index";
import student from "./modules/student/index";
import common from "./modules/common/index";
import instructor from "./modules/instructor/index";
import admin from "./modules/admin/index";
import snackbar from "./modules/snackbar";
const store = createStore({
  modules: {
    user: user,
    student: student,
    common,
    instructor,
    admin,
    snackbar,
  },
  actions,
});

export default store;
