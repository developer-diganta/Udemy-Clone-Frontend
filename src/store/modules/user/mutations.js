export default {
  setUserName(state, name) {
    console.log("NAME");
    state.name = name;
  },
  setUserId(state, _id) {
    state._id = _id;
  },
  setUserType(state, type) {
    state.type = type;
  },
  setUserToken(state, token) {
    state.token = token;
  },
  setUserEmail(state, email) {
    state.email = email;
  },
  clear(state) {
    (state.name = ""), (state._id = "");
    state.email = "";
    state.token = "";
    state.type = "";
  },
};
