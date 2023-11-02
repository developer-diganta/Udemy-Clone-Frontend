export default {
  setSearchResults(state, searchResults) {
    state.searchResults = searchResults;
  },
  /**
   * Sets enrolled courses of the student in the state.
   * @param {Object} state - The state object to update.
   * @param {Array} enrolledCourses - An array of courses to set as enrolled.
   */
  setEnrolledCourses(state, enrolledCourses) {
    state.enrolledCourses = enrolledCourses;
  },

  /**
   * Sets the student profile
   * @param {Object} state - The state of object to update
   * @param {Object} studentProfile - An object containing the student profile details
   */

  setStudentProfile(state, studentProfile) {
    state.profile = studentProfile;
  },
};
