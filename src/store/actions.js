import backend_url from "@/globals/globals";
import axios from "axios";

export default {
  async verifyToken({commit,rootState}){
    try{
      
      const res = await axios.post(`${backend_url}/${rootState.user.type}/verify`,{
        email:rootState.user.email,
        token:rootState.user.token
      })
      return res;
    }catch(error){
      return error
    }
  },
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
      return res;
    } catch (error) {
      return error;
    }
  },

  /* adds course by instructor action
     accepts course details (apart from lesson materials)
  */

  async addCourseInstructor({ commit, rootState }, { course }) {
    try {
      const res = await axios.post(`${backend_url}/instructor/course/add`, {
        email: rootState.user.email,
        _id: rootState.user._id,
        token: rootState.user.token,
        course,
      });
      return res;
    } catch (error) {
      return error;
    }
  },

  /* single course view action for instructor
    fetches a course using course id from backend
    accepts courseId
  */

  async instructorCourseViewOne({ commit, rootState }, { courseId, router }) {
    try {
      const res = await axios.post(`${backend_url}/instructor/course/viewone`, {
        email: rootState.user.email,
        courseId,
        token: rootState.user.token,
      });
      return res;
    } catch (error) {
      if (error.response.data.error === "Please authenticate.") {
        console.log(error);
        alert("session expired");
        router.push("/signin/instructor");
      }
      return error;
    }
  },

  /* video deletion action 
     action that deletes a video from the course based on its position
     accepts courseId, subsection id and the video imdex inside the subsection
  */

  async deleteVideo(
    { commit, rootState },
    { courseId, subsectionToBeUpdated, indexOfVideo },
  ) {
    try {
      await axios.post(`${backend_url}/instructor/videos/delete`, {
        email: rootState.user.email,
        courseId,
        token: rootState.user.token,
        subsectionToBeUpdated,
        indexOfVideo,
        intructorId: rootState.user._id,
      });
      return res;
    } catch (error) {
      return error;
    }
  },

  /* action to fetch trending courses */

  async fetchTrendingCourses({ commit }) {
    try {
      const res = await axios.get(
        `${backend_url}/courses?limit=10&sortBy=enrollments&sortOrder=-1`,
      );
      return res;
    } catch (error) {
      return error;
    }
  },

  /*action to fetch single course
    accepts courseId
  */
  async fetchSingleCourse({ commit }, { courseId }) {
    try {
      const res = await axios.get(`${backend_url}/course/${courseId}`);

      return res.data.course;
    } catch (error) {
      return error;
    }
  },

  /* action to fetch the courses of an instructor 
     
  */

  async fetchSelfCourses({ commit, rootState }) {
    try {
      const type = rootState.user.type;
      const id = rootState.user._id;
      const email = rootState.user.email;
      const token = rootState.user.token;
      const response = await axios.post(
        `${backend_url}/instructor/selfcourses`,
        {
          type,
          id,
          email,
          token,
        },
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  /* action to add a section to a course
    accepts index, title and the course id
  */
  async addSection({ commit, rootState }, { index, title, id }) {
    try {
      const token = rootState.user.token;
      const email = rootState.user.email;
      const response = await axios.post(
        `${backend_url}/instructor/course/lesson/section/add`,
        {
          token,
          email,
          id,
          index,
          title,
        },
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },
  async getInstructorProfile({ commit, rootState }) {
    console.log("here");
    try {
      const id = rootState.user._id;
      const token = rootState.user.token;
      const email = rootState.user.email;
      const res = await axios.post(`${backend_url}/instructor/profile`, {
        token,
        id,
        email,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  },
  async updateInstructorProfile({ commit, rootState }, payload) {
    try {
      const id = rootState.user._id;
      const token = rootState.user.token;
      const email = rootState.user.email;
      payload.id = id;
      payload.token = token;
      payload.email = email;
      const res = await axios.patch(
        `${backend_url}/instructor/profile/update`,
        { updates: payload, id, token, email },
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  },
  async logout({ commit, rootState }) {
    try {
      const id = rootState.user._id;
      const token = rootState.user.token;
      const email = rootState.user.email;
      const r = await axios.patch(`${backend_url}/instructor/logout`, {
        id,
        token,
        email,
      });
      localStorage.clear();
    } catch (error) {
      console.log(error);
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
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  },
  async deleteSection({ commit, rootState }, { courseId, sectionId }) {
    try {
      console.log(rootState.user.token);
      await axios.delete(`${backend_url}/instructor/section/delete`, {
        data: {
          email: rootState.user.email,
          courseId,
          token: rootState.user.token,
          sectionId,
          instructorId: rootState.user._id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
  async updateCompletionStatus(
    { commit, rootState },
    { section, videoNumber },
  ) {
    try {
      const res = await axios.patch(`${backend_url}/student/statusupdate`, {
        email: rootState.user.email,
        section,
        token: rootState.user.token,
        videoNumber,
        instructorId: rootState.user._id,
      });
    } catch (error) {
      console.log(error);
    }
  },
  async getStudentProfile({ commit, rootState }) {
    try {
      const res = axios.get(`${backend_url}/student?id=${rootState.user._id}`);
      console.log(res);
      return res;
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
  async submitReview({ commit, rootState }, { rating, review, courseId }) {
    try {
      const res = await axios.patch(`${backend_url}/student/course/review`, {
        email: rootState.user.email,
        token: rootState.user.token,
        _id: rootState.user._id,
        rating,
        courseId,
        review,
      });
    } catch (error) {
      console.log(error);
    }
  },
  async getAllCourses({ commit }) {
    const courses = await axios.get(`${backend_url}/courses/all`);
    return courses.data;
  },
  async getAllStudents({ commit }) {
    const students = await axios.get(`${backend_url}/admin/students`);
    return students.data;
  },
  async getAllInstructors({ commit }) {
    const instructors = await axios.get(`${backend_url}/admin/instructors`);
    return instructors.data;
  },
  async getRevenue({ commit }) {
    const revenue = await axios.post(`${backend_url}/getpayments`);
    return revenue.data;
  },
  async adminSignIn({ commit }, { userName, password }) {
    const res = await axios.post(`${backend_url}/admin/signin`, {
      userName,
      password,
    });
    return res.data;
  },
  async fetchInstructorName({commit},id){
    const res = await axios.get(`${backend_url}/admin/instructorname/${id}`)
    console.log(res.data)
    return res.data;
  },
  async updateCourseStatus({commit}, id){
    const res = await axios.patch(`${backend_url}/admin/course/status`,{
      courseId:id
    })
    return res
  },
  async publishCourse({commit, rootState}, courseId){
    const id = rootState.user._id;
    const token = rootState.user.token;
    const email = rootState.user.email;
    const res = await axios.patch(`${backend_url}/instructor/status`,{
      id,
      token,
      email,
      courseId:courseId
    })
  }
};
