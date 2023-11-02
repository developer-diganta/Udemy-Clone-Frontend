export default {
  setTrendingCourses(state, trendingCourses) {
    state.trendingCourses = trendingCourses;
  },
  setSingleCourse(state, singleCourse) {
    console.log(singleCourse);
    state.singleCourse = singleCourse;
  },
};
