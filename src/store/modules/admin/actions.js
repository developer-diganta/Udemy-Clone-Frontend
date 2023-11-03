import axios from "axios";
import backend_url from "@/globals/globals";

export default {
  /**
   * Fetches and commits the list of all students from the backend API.
   * @param {Object} context - The context object, which includes the commit method.
   */
  async getAllStudents({ commit }) {
    try {
      const students = await axios.post(`${backend_url}/admin/students`,{
        token:localStorage.getItem("token")
      });
      commit("setAllStudents", students.data);
    } catch (error) {
      console.error(error);
    }
  },

  /**
   * Fetches and commits the list of all instructors from the backend API.
   * @param {Object} context - The context object, which includes the commit method.
   */
  async getAllInstructors({ commit }) {
    try {
      const instructors = await axios.post(`${backend_url}/admin/instructors`,{
        token:localStorage.getItem("token")
      });
      commit("setAllInstructors", instructors.data);
    } catch (error) {
      console.error(error);
    }
  },

  /**
   * Fetches and commits the revenue data from the backend API.
   * @param {Object} context - The context object, which includes the commit method.
   */
  async getRevenue({ commit }) {
    try {
      const revenue = await axios.post(`${backend_url}/getpayments`,{
        token:localStorage.getItem("token")
      });
      commit("setRevenue", revenue.data);
    } catch (error) {
      console.error(error);
    }
  },

  /**
   * Fetches and commits the instructor's name by their ID from the backend API.
   * @param {Object} context - The context object, which includes the commit method.
   * @param {string} id - The ID of the instructor.
   */
  async fetchInstructorName({ commit }, id) {
    try {
      const res = await axios.post(`${backend_url}/admin/instructorname/${id}`,{
        token:localStorage.getItem("token")
      });
      commit("setInstructorName", res.data);
    } catch (error) {
      console.error(error);
    }
  },

  /**
   * Updates the status of a course by its ID in the backend API.
   * @param {Object} context - The context object, which includes the commit method.
   * @param {string} id - The ID of the course to be updated.
   */
  async updateCourseStatus({ commit }, id) {
    try {
      const res = await axios.patch(`${backend_url}/admin/course/status`, {
        courseId: id,
        token:localStorage.getItem("token")
      });
      commit("setCourseStatus", res);
    } catch (error) {
      console.error(error);
    }
  },

  /**
   * Fetches and commits the list of all courses from the backend API.
   * @param {Object} context - The context object, which includes the commit method.
   */
  async getAllCourses({ commit }) {
    try {
      const courses = await axios.get(`${backend_url}/courses/all`);
      console.log("))))))))))))))))))))))))",courses)
      commit("setAllCourses", courses.data);
    } catch (error) {
      console.error(error);
    }
  },
};
