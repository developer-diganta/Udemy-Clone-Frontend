import backend_url from "@/globals/globals";
import axios from "axios";

export default {
  async verifyToken({ commit, rootState }, user) {
    console.log("[[]", user);
    try {
      const res = await axios.post(`${backend_url}/${user.type}/verify`, {
        email: rootState.user.email,
        token: rootState.user.token,
      });
      console.log(res);
      return res;
    } catch (error) {
      console.log("HEREREREERERERERE");
      console.log(error);
      throw new Error("Not verified");
    }
  },
  // done student
  async searchResultsFromAPI({ commit }, { searchKey, category }) {
    console.log;
    try {
      console.log(category, "??????????????////??//");
      let res;
      if (category)
        res = await axios.get(
          `${backend_url}/courses/fuzzysearch?search=${searchKey}&type=category`,
        );
      else
        res = await axios.get(
          `${backend_url}/courses/fuzzysearch?search=${searchKey}`,
        );
      console.log(res);
      return res.data;
    } catch (error) {
      return error;
    }
  },

  async emailFormSubmit({ commit }, { email }) {
    console.log("P", email);
    try {
      const res = await axios.post(`${backend_url}/otp`, {
        email,
      });
      console.log(res);
      return res;
    } catch (error) {
      return error;
    }
  },
  async otpValidate({ commit }, { otp, email, type }) {
    console.log(type);
    try {
      const res = await axios.post(`${backend_url}/otp/verify`, {
        otp,
        email,
        type,
      });
      console.log(res);
      commit("user/setUserToken", res.headers.authorization.split(" ")[1]);
      return res;
    } catch (error) {
      return error;
    }
  },

  async updateCompletionStatus(
    { commit, rootState },
    { section, videoNumber, courseId },
  ) {
    try {
      const res = await axios.patch(`${backend_url}/student/statusupdate`, {
        email: rootState.user.email,
        section,
        token: rootState.user.token,
        videoNumber,
        instructorId: rootState.user._id,
        courseId,
      });
    } catch (error) {
      console.log(error);
    }
  },

  async addQuestion({ commit, rootState }, { title, description, courseId }) {
    const res = await axios.patch(`${backend_url}/student/course/question`, {
      email: rootState.user.email,
      token: rootState.user.token,
      _id: rootState.user._id,
      title,
      description,
      courseId,
    });
  },
  async submitAnswer({ commit, rootState }, { answer, courseId, questionId }) {
    try {
      console.log(answer);
      console.log(courseId);
      console.log(questionId);
      const res = await axios.patch(
        `${backend_url}/student/course/question/answer`,
        {
          email: rootState.user.email,
          token: rootState.user.token,
          _id: rootState.user._id,
          answer,
          courseId,
          questionId,
        },
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  },

  async adminSignIn({ commit }, { userName, password }) {
    const res = await axios.post(`${backend_url}/admin/signin`, {
      userName,
      password,
    });
    return res.data;
  },

  async verifyCourseOwnership({ commit, rootState }, courseId) {
    try {
      const res = await axios.post(`${backend_url}/instructor/courseverify`, {
        courseId,
        token: rootState.user.token,
        email: rootState.user.email,
        id: rootState.user._id,
      });
      if (res.data === "allowed") return 1;
      else return 0;
    } catch (error) {
      return 0;
    }
  },
};
