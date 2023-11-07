import backend_url from "@/globals/globals";
import axios from "axios";

export default {
  async verifyToken({ commit, rootState }) {
    try {
      console.log("[[]", rootState.user);
      const res = await axios.post(
        `${backend_url}/${rootState.user.type}/verify`,
        {
          email: rootState.user.email,
          token: rootState.user.token,
        },
      );
      console.log(res);
      return res;
    } catch (error) {
      console.log("HEREREREERERERERE");
      throw new Error("Not verified");
    }
  },
  // done student
  async searchResultsFromAPI({ commit }, searchKey) {
    console.log;
    try {
      const res = await axios.get(
        `${backend_url}/courses/fuzzysearch?search=${searchKey}`,
      );
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

// async fetchTrendingCourses({ commit }) {
//   try {
//     const res = await axios.get(
//       `${backend_url}/courses?limit=10&sortBy=enrollments&sortOrder=-1`,
//     );
//     return res;
//   } catch (error) {
//     return error;
//   }
// },

// async editCourse({ commit, rootState }, { updates, courseId }) {
//   const res = await axios.patch(`${backend_url}/instructor/editcourse`, {
//     courseId,
//     updates,
//     token: rootState.user.token,
//     email: rootState.user.email,
//     id: rootState.user._id,
//   });
//   console.log(res);
// },

// async instructorCoursePurchase({ commit, rootState }, courseId) {
//   const res = await axios.post(`${backend_url}/instructor/course/purchases`, {
//     courseId,
//     token: rootState.user.token,
//     email: rootState.user.email,
//     id: rootState.user._id,
//   });
//   return res;
// },

// async publishCourse({ commit, rootState }, courseId) {
//   const id = rootState.user._id;
//   const token = rootState.user.token;
//   const email = rootState.user.email;
//   const res = await axios.patch(`${backend_url}/instructor/status`, {
//     id,
//     token,
//     email,
//     courseId: courseId,
//   });
// },

/* video deletion action 
     action that deletes a video from the course based on its position
     accepts courseId, subsection id and the video imdex inside the subsection
  */

// async deleteVideo(
//   { commit, rootState },
//   { courseId, subsectionToBeUpdated, indexOfVideo },
// ) {
//   try {
//     await axios.post(`${backend_url}/instructor/videos/delete`, {
//       email: rootState.user.email,
//       courseId,
//       token: rootState.user.token,
//       subsectionToBeUpdated,
//       indexOfVideo,
//       intructorId: rootState.user._id,
//     });
//     return res;
//   } catch (error) {
//     return error;
//   }
// },

/* action to fetch trending courses */

// async getAllStudents({ commit }) {
//   const students = await axios.get(`${backend_url}/admin/students`);
//   return students.data;
// },
// async getAllInstructors({ commit }) {
//   const instructors = await axios.get(`${backend_url}/admin/instructors`);
//   return instructors.data;
// },
// async getRevenue({ commit }) {
//   const revenue = await axios.post(`${backend_url}/getpayments`);
//   return revenue.data;
// },
// async fetchInstructorName({ commit }, id) {
//   const res = await axios.get(`${backend_url}/admin/instructorname/${id}`);
//   console.log(res.data);
//   return res.data;
// },
// async updateCourseStatus({ commit }, id) {
//   const res = await axios.patch(`${backend_url}/admin/course/status`, {
//     courseId: id,
//   });
//   return res;
// },

// async getTeacherAllCourses({ commit, rootState }) {
//   const courses = await axios.get(
//     `${backend_url}/instructor/courses/all?id=${rootState.user._id}`,
//   );
//   return courses.data;
// },

// async getStudentProfile({ commit, rootState }) {
//   try {
//     const res = await axios.get(
//       `${backend_url}/student?id=${rootState.user._id}`,
//     );
//     console.log(res);
//     return res;
//   } catch (error) {
//     return 0;
//     console.log(error);
//   }
// },
// async getInstructorProfileOnLoad({ commit, rootState }) {
//   try {
//     const res = await axios.get(
//       `${backend_url}/instructor?id=${rootState.user._id}`,
//     );
//     console.log(res);
//     return res;
//   } catch (error) {
//     return 0;
//     console.log(error);
//   }
// },

// async getInstructorProfile({ commit, rootState }) {
//   console.log(rootState.user.token);
//   try {
//     const id = rootState.user._id;
//     const token = rootState.user.token;
//     const email = rootState.user.email;
//     const res = await axios.post(`${backend_url}/instructor/profile`, {
//       token,
//       id,
//       email,
//     });
//     console.log("RRRRRRRR", res);
//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// },
// async updateInstructorProfile({ commit, rootState }, payload) {
//   try {
//     const id = rootState.user._id;
//     const token = rootState.user.token;
//     const email = rootState.user.email;
//     payload.id = id;

//     payload.email = email;
//     const res = await axios.patch(
//       `${backend_url}/instructor/profile/update`,
//       { updates: payload, id, token, email },
//     );

//     commit("user/setUserName", res.data.name, { root: true });
//     commit("user/setUserEmail", res.data.email, { root: true });

//     console.log(rootState.user.name);
//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// },
// async fetchEnrolledCourses({ commit, rootState }) {
//   try {
//     const id = rootState.user._id;
//     const token = rootState.user.token;
//     const email = rootState.user.email;
//     const res = await axios.post(`${backend_url}/student/enrolledcourses`, {
//       id,
//       token,
//       email,
//     });
//     console.log(res);
//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// },
// async deleteSection({ commit, rootState }, { courseId, sectionId }) {
//   try {
//     console.log(rootState.user.token);
//     await axios.delete(`${backend_url}/instructor/section/delete`, {
//       data: {
//         email: rootState.user.email,
//         courseId,
//         token: rootState.user.token,
//         sectionId,
//         instructorId: rootState.user._id,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//   }
// },
