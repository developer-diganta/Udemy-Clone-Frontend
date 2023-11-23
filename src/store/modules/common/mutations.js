export default {
  setTrendingCourses(state, trendingCourses) {
    state.trendingCourses = trendingCourses;
  },
  setSingleCourse(state, singleCourse) {
    console.log(singleCourse);
    state.singleCourse = singleCourse;
  },
  setTheme(state){
    if(state.theme==="light"){
      localStorage.setItem("theme","dark")
      state.theme="dark"
    }else{
      localStorage.setItem("theme","light")
      state.theme="light"
    }
  }
};
