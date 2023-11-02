export default {
  setLastCourseAdded(state, course) {
    state.lastCourseAdded = course;
  },
  setCurrentCourse(state, course) {
    state.currentCourse = course.data.course;
  },
  setDeletedVideo(state, deletedVideo) {
    state.deletedVideo = deletedVideo;
  },
  setSelfCourses(state, courses) {
    state.selfCourses = courses;
  },
  setSectionAdd(state,section){
    state.lastSectionAdded=section;
  },
  setProfile(state,profile){
    state.profile=profile;
  },
  setDeletedSection(state,section){
    state.deletedSection = section;
  },
  setPublishedCourse(state,course){
    state.publishedCourse = course;
  },
  setEditedCourse(state,course){
    state.editedCourse = course;
  },
  setCoursePurchases(state,coursePurchases){
    console.log("??????", coursePurchases)
    state.coursePurchases = coursePurchases;
  }
};
