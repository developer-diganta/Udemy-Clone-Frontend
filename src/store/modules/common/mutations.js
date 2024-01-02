export default {
  setTrendingCourses(state, trendingCourses) {
    state.trendingCourses = trendingCourses;
  },
  setSingleCourse(state, singleCourse) {
    console.log(singleCourse);
    state.singleCourse = singleCourse;
  },
  setTheme(state) {
    if (state.theme === "light") {
      localStorage.setItem("theme", "dark");
      state.theme = "dark";
      document.getElementsByTagName("html")[0].style.backgroundColor = "black";
    } else {
      localStorage.setItem("theme", "light");
      state.theme = "light";
      document.getElementsByTagName("html")[0].style.backgroundColor = "white";
    }
  },
  setOutput(state, output) {
    state.output = output;
  },
  setCategories(state, categories) {
    state.categories = categories;
  },
};
