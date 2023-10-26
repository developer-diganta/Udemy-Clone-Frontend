import backend_url from "@/globals/globals";
import axios from "axios";

export default {
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
  async studentSignUp({ commit }, { email, name, password }) {
    console.log(name);
    console.log(password);
    try {
      const res = await axios.post(`${backend_url}/student`, {
        name,
        password,
        email,
      });
      return res;
    } catch (error) {
      return error;
    }
  },
  async instructorSignUp({ commit }, data) {
    console.log(data);
    try {
      const res = await axios.post(`${backend_url}/instructor`, {
        ...data,
      });
      return res;
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
  async signInSubmit({ commit }, { email, password, endPoint }) {
    console.log(email);
    try {
      const res = await axios.post(`${backend_url}/${endPoint}/login`, {
        email,
        password,
      });
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  async addCourseInstructor({ commit }, { course }) {
    try {
      const res = await axios.post(`${backend_url}/instructor/course/add`, {
        email: localStorage.getItem("email"),
        _id: localStorage.getItem("_id"),
        token: localStorage.getItem("token"),
        course,
      });
      return res;
    } catch (error) {
      return error;
    }
  },
  async instructorCourseViewOne({ commit }, { courseId, router }) {
    console.log(courseId);
    try {
      const res = await axios.post(`${backend_url}/instructor/course/viewone`, {
        email: localStorage.getItem("email"),
        courseId,
        token: localStorage.getItem("token"),
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
  async deleteVideo(
    { commit },
    { courseId, subsectionToBeUpdated, indexOfVideo },
  ) {
    try {
      await axios.post(`${backend_url}/instructor/videos/delete`, {
        email: localStorage.getItem("email"),
        courseId,
        token: localStorage.getItem("token"),
        subsectionToBeUpdated,
        indexOfVideo,
        intructorId: localStorage.getItem("_id"),
      });
      return res;
    } catch (error) {
      return error;
    }
  },
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
  async fetchSingleCourse({ commit }, { courseId }) {
    try {
      const res = await axios.get(`${backend_url}/course/${courseId}`);
      console.log(res);
      return res.data.course;
    } catch (error) {
      console.log("123", error);
      return error;
    }
  },
  async fetchSelfCourses({ commit }) {
    try {
      const type = localStorage.getItem("type");
      const id = localStorage.getItem("_id");
      const email = localStorage.getItem("email");
      const token = localStorage.getItem("token");
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
  async addSection({ commit }, { index, title, id }) {
    try {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");
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
  async getInstructorProfile({ commit }) {
    console.log("here");
    try {
      const id = localStorage.getItem("_id");
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");
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
  async updateInstructorProfile({ commit }, payload) {
    try {
      const id = localStorage.getItem("_id");
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");
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
  async logout({ commit, state }) {
    try {
      const id = localStorage.getItem("_id");
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");
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
  async fetchEnrolledCourses({ commit }) {
    try {
      const id = localStorage.getItem("_id");
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");
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
  async deleteSection({ commit }, { courseId, sectionId }) {
    try {
      console.log(localStorage.getItem("token"));
      await axios.delete(`${backend_url}/instructor/section/delete`, {
        data: {
          email: localStorage.getItem("email"),
          courseId,
          token: localStorage.getItem("token"),
          sectionId,
          instructorId: localStorage.getItem("_id"),
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
  async updateCompletionStatus({ commit }, { section, videoNumber }) {
    try {
      const res = await axios.patch(`${backend_url}/student/statusupdate`, {
        email: localStorage.getItem("email"),
        section,
        token: localStorage.getItem("token"),
        videoNumber,
        instructorId: localStorage.getItem("_id"),
      });
    } catch (error) {
      console.log(error);
    }
  },
  async getStudentProfile({ commit }) {
    try {
      const res = axios.get(
        `${backend_url}/student?id=${localStorage.getItem("_id")}`,
      );
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  },
  async addQuestion({ commit }, { title, description, courseId }) {
    const res = await axios.patch(`${backend_url}/student/course/question`, {
      email: localStorage.getItem("email"),
      token: localStorage.getItem("token"),
      _id: localStorage.getItem("_id"),
      title,
      description,
      courseId,
    });
  },
  async submitAnswer({ commit }, { answer, courseId, questionId }) {
    try {
      console.log(answer);
      console.log(courseId);
      console.log(questionId);
      const res = await axios.patch(
        `${backend_url}/student/course/question/answer`,
        {
          email: localStorage.getItem("email"),
          token: localStorage.getItem("token"),
          _id: localStorage.getItem("_id"),
          answer,
          courseId,
          questionId,
        },
      );
    } catch (error) {
      console.log(error);
    }
  },
  async submitReview({ commit }, { rating, review, courseId }) {
    try {
      const res = await axios.patch(`${backend_url}/student/course/review`, {
        email: localStorage.getItem("email"),
        token: localStorage.getItem("token"),
        _id: localStorage.getItem("_id"),
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
};
