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
      commit("user/clear");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  },
};