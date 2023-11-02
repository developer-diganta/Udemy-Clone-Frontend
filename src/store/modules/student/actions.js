import axios from "axios";
import backend_url from "@/globals/globals";
export default {
  async searchResultsFromAPI({ commit }, searchKey) {
    console.log("HERE I AM");
    try {
      const res = await axios.get(
        `${backend_url}/courses/fuzzysearch?search=${searchKey}`,
      );
      commit("setSearchResults", res.data);
    } catch (error) {
      return error;
    }
  },
  async fetchEnrolledCourses({ commit, rootState }) {
    try {
      const id = rootState.user._id;
      const token = rootState.user.token;
      const email = rootState.user.email;
      const res = await axios.post(`${backend_url}/student/enrolledcourses`, {
        id,
        token,
        email,
      });
      commit("setEnrolledCourses", res.data);
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * Fetches the student's profile data from the backend and commits it to the store.
   *
   * @param {Object} param0 - An object containing commit and rootState properties.
   * @returns {Promise} A promise that resolves with the fetched student profile data or
   *                    rejects with an error if the request fails.
   */

  async getStudentProfile({ commit, rootState }) {
    try {
      const res = await axios.get(
        `${backend_url}/student?id=${rootState.user._id}`,
      );
      commit("setStudentProfile", res.data);
    } catch (error) {
      return 0;
      console.log(error);
    }
  },
};
