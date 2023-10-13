import backend_url from "@/globals/globals";
import axios from "axios";

export default {
  async searchResultsFromAPI({ commit }, searchKey) {
    try {
      const res = await axios.get(
        `${backend_url}/courses/fuzzysearch?search=${searchKey}`,
      );
      return res.data;
    } catch (error) {
      return error;
    }
  },
  async studentSignUp({ commit }, { name, password }) {
    console.log(name);
    console.log(password);
    try {
      const res = await axios.post(`${backend_url}/student`, {
        name,
        password,
        token: localStorage.getItem("signUpEmailToken"),
      });
      return res;
    } catch (error) {
      return error;
    }
  },
  async instructorSignUp({ commit }, { name, password }) {
    console.log(name);
    console.log(password);
    try {
      const res = await axios.post(`${backend_url}/instructor`, {
        name,
        password,
        token: localStorage.getItem("signUpEmailToken"),
      });
      return res;
    } catch (error) {
      return error;
    }
  },
  async emailFormSubmit({ commit }, { email }) {
    try {
      const res = await axios.post(`${backendUrl}/otp`, {
        email,
      });
      return res;
    } catch (error) {
      return error;
    }
  },
  async otpValidate({ commit }, { token, otp }) {
    try {
      const res = await axios.post(`${backendUrl}/otp/verify`, {
        token,
        otp,
      });
      return res;
    } catch (error) {
      return error;
    }
  },
  async signInSubmit({ commit }, { email, password, endPoint }) {
    console.log(email)
    try {
      const res = await axios.post(`${backend_url}/${endPoint}/login`, {
        email,
        password,
      });
      console.log(res)
      return res;
    } catch (error) {
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
  async instructorCourseViewOne({ commit }, { courseId }) {
    try {
      const res = await axios.post(`${backend_url}/instructor/course/viewone`, {
        email: localStorage.getItem("email"),
        courseId,
        token: localStorage.getItem("token"),
      });
      return res;
    } catch (error) {
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
  async fetchTrendingCourses({commit}){
    try{
        const res = await axios.get(
            `${backend_url}/courses?limit=10&sortBy=enrollments&sortOrder=-1`
          );
        return res;
    }catch(error){
        return error;
    }
  },
  async fetchSingleCourse({commit},{courseId}){
    try{    
        const res = await axios.get(`${backend_url}/course/${courseId}`)
        console.log(res)
        return res.data.course;
    }catch(error){
        return error;
    }
  }
};
