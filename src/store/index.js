import { createStore } from "vuex";
import actions from "./actions";
import user from "./modules/user/index";
const store = createStore({
  modules: {
    user: user,
  },
  actions,
});

export default store;
