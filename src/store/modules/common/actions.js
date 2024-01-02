import axios from "axios";
import backend_url from "@/globals/globals";
export default {
  /**
   * fetches trending courses based on number of enrollments
   * @param {*} param0
   * @returns
   */
  async fetchTrendingCourses({ commit }) {
    try {
      const res = await axios.get(
        `${backend_url}/courses?limit=10&sortBy=enrollments&sortOrder=-1`,
      );
      console.log(res.data);

      commit("setTrendingCourses", res.data);
    } catch (error) {
      return error;
    }
  },
  async fetchSingleCourse({ commit }, { courseId }) {
    try {
      const res = await axios.get(`${backend_url}/course/${courseId}`);
      commit("setSingleCourse", res.data.course);
    } catch (error) {
      return error;
    }
  },
  async logout({ commit, rootState }, router) {
    try {
      const id = rootState.user._id;
      const token = rootState.user.token;
      const email = rootState.user.email;
      const r = await axios.patch(
        `${backend_url}/${rootState.user.type}/logout`,
        {
          id,
          token,
          email,
        },
      );
      localStorage.clear();
      commit("user/clear", { root: true });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  },
  async submitCode(
    { commit, rootState },
    { submission, courseId, questionId, section },
  ) {
    try {
      const code = submission.code;
      const lang = submission.lang;

      const res = await axios.post(
        `${backend_url}/courses/code?courseId=${courseId}&questionId=${questionId}&section=${section}`,
        {
          code: code,
          language: lang,
        },
      );
      console.log(res);
      commit("setOutput", res.data);
    } catch (error) {}
  },
  async getCategories({ commit, rootState }) {
    const response = await axios.get(`${backend_url}/courses/categories`);
    commit("setCategories", response.data);
  },
};
