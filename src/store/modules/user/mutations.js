export default {
  setUserName(state, payload) {
    console.log("here");
    state.name = payload.name;
    console.log(state.name, ":", payload.name);
  },
  setUserId(state){
    state.id = localStorage.getItem('_id');
  }
};
