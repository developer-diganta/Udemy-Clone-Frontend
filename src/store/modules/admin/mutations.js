export default {
  /**
   * Mutates the state to set the list of all students.
   *
   * @param {Object} state - The Vuex store state object.
   * @param {Array} students - An array containing the list of all students objects.
   */
  setAllStudents(state, students) {
    state.allStudents = students;
  },

  /**
   * Mutates the state to set the list of all instructors.
   *
   * @param {Object} state - The Vuex store state object.
   * @param {Array} instructors - An array containing the list of all instructors objects.
   */
  setAllInstructors(state, instructors) {
    state.allInstructors = instructors;
  },

  /**
   * Mutates the state to set revenue-related data.
   *
   * @param {Object} state - The Vuex store state object.
   * @param {Array} revenue - An array containing revenue-related data objects.
   */
  setRevenue(state, revenue) {
    state.revenue = revenue;
  },

  /**
   * Mutates the state to set the name of an instructor.
   *
   * @param {Object} state - The Vuex store state object.
   * @param {string} instructorName - The name of the instructor.
   */
  setInstructorName(state, instructorName) {
    state.instructorName = instructorName;
  },

  /**
   * Mutates the state to set course status information.
   *
   * @param {Object} state - The Vuex store state object.
   * @param {Object} status - Course status information.
   */
  setCourseStatus(state, status) {
    state.courseStatus = status;
  },

  /**
   * Mutates the state to set the list of all courses.
   *
   * @param {Object} state - The Vuex store state object.
   * @param {Array} courses - An array containing the list of all courses objects.
   */
  setAllCourses(state, courses) {
    state.allCourses = courses;
  },

  logout(state) {
    state.allCourses = [];
    state.allStudents = [];
    state.allInstructors = [];
    state.revenue = [];
    state.instructorName = "";
    state.courseStatus = {};
  },
};
