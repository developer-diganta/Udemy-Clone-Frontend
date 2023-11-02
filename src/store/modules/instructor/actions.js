import axios from "axios";
import backend_url from "@/globals/globals";
export default {
  /**
   * Adds a course instructor by making a POST request to the backend API and
   * updates the store with the last added course information.
   *
   * @param {Object} param0 - An object containing commit and rootState properties.
   * @param {Object} param1 - An object containing course information to be added.
   */
  async addCourseInstructor({ commit, rootState }, { course }) {
    try {
      const res = await axios.post(`${backend_url}/instructor/course/add`, {
        email: rootState.user.email,
        _id: rootState.user._id,
        token: rootState.user.token,
        course,
      });
      commit("setLastCourseAdded", res.data);
    } catch (error) {
      return error;
    }
  },
  /**
   * Fetches details of a specific instructor course from the backend API and updates the store.
   *
   * @param {Object} param0 - An object containing commit and rootState properties.
   * @param {Object} param1 - An object containing the courseId and router for navigation.
   */
  async instructorCourseViewOne({ commit, rootState }, { courseId, router }) {
    try {
      const res = await axios.post(`${backend_url}/instructor/course/viewone`, {
        email: rootState.user.email,
        courseId,
        token: rootState.user.token,
      });
      commit("setCurrentCourse", res);
    } catch (error) {
      //   if (error.response.data.error === "Please authenticate.") {
      //     console.log(error);
      //     alert("session expired");
      //     router.push("/signin/instructor");
      //   }
      //   return error;
    }
  },
  /**
   * Deletes a video from a specific course subsection by making a request to the backend API
   * and updates the store with information about the deleted video.
   *
   * @param {Object} param0 - An object containing commit and rootState properties.
   * @param {Object} param1 - An object containing courseId, subsectionToBeUpdated, and indexOfVideo.
   */
  async deleteVideo(
    { commit, rootState },
    { courseId, subsectionToBeUpdated, indexOfVideo },
  ) {
    try {
      const res = await axios.post(`${backend_url}/instructor/videos/delete`, {
        email: rootState.user.email,
        courseId,
        token: rootState.user.token,
        subsectionToBeUpdated,
        indexOfVideo,
        intructorId: rootState.user._id,
      });
      commit("setDeletedVideo", res.data);
    } catch (error) {
      //   return error;
    }
  },
  /**
   * Fetches a list of courses associated with the authenticated user (instructor)
   * and updates the store with the retrieved self-courses information.
   *
   * @param {Object} param0 - An object containing commit and rootState properties.
   */
  async fetchSelfCourses({ commit, rootState }) {
    try {
      const type = rootState.user.type;
      const id = rootState.user._id;
      const email = rootState.user.email;
      const token = rootState.user.token;
      const res = await axios.post(`${backend_url}/instructor/selfcourses`, {
        type,
        id,
        email,
        token,
      });
      commit("setSelfCourses", res.data);
    } catch (error) {
      console.log(error);
    }
  },
/**
 * Adds a new section to a course lesson by making a POST request to the backend API
 * and updates the store with information about the added section.
 *
 * @param {Object} param0 - An object containing commit and rootState properties.
 * @param {Object} param1 - An object containing the index, title, and id of the section to be added.
 */
  async addSection({ commit, rootState }, { index, title, id }) {
    try {
      const token = rootState.user.token;
      const email = rootState.user.email;
      const res = await axios.post(
        `${backend_url}/instructor/course/lesson/section/add`,
        {
          token,
          email,
          id,
          index,
          title,
        },
      );
      commit("setSectionAdd",res.data)
    } catch (error) {
      console.log(error);
    }
  },

/**
 * Fetches the profile information of the authenticated instructor from the backend API
 * and updates the store with the retrieved profile data.
 *
 * @param {Object} param0 - An object containing commit and rootState properties.
 */
  async getInstructorProfile({ commit, rootState }) {
    console.log(rootState.user.token);
    try {
      const id = rootState.user._id;
      const token = rootState.user.token;
      const email = rootState.user.email;
      const res = await axios.post(`${backend_url}/instructor/profile`, {
        token,
        id,
        email,
      });
      console.log("RRRRRRRR", res);
      commit("setProfile", res.data)
    } catch (error) {
      console.log(error);
    }
  },
/**
 * Updates the profile information of the authenticated instructor by making a PATCH request
 * to the backend API and updates the store with the modified profile data.
 *
 * @param {Object} param0 - An object containing commit and rootState properties.
 * @param {Object} payload - An object containing the updates to be applied to the instructor's profile.
 */
  async updateInstructorProfile({ commit, rootState }, payload) {
    try {
      const id = rootState.user._id;
      const token = rootState.user.token;
      const email = rootState.user.email;
      payload.id = id;

      payload.email = email;
      const res = await axios.patch(
        `${backend_url}/instructor/profile/update`,
        { updates: payload, id, token, email },
      );

      commit("user/setUserName", res.data.name, { root: true });
      commit("user/setUserEmail", res.data.email, { root: true });
      console.log(res)
      commit("setProfile",res.data);

      console.log(rootState.user.name);

    } catch (error) {
      console.log(error);
    }
  },
/**
 * Deletes a section from a specific course by making a DELETE request to the backend API
 * and updates the store with information about the deleted section.
 *
 * @param {Object} param0 - An object containing commit and rootState properties.
 * @param {Object} param1 - An object containing courseId and sectionId to identify the section to be deleted.
 */

  async deleteSection({ commit, rootState }, { courseId, sectionId }) {
    try {
      console.log(rootState.user.token);
      const res = await axios.delete(`${backend_url}/instructor/section/delete`, {
        data: {
          email: rootState.user.email,
          courseId,
          token: rootState.user.token,
          sectionId,
          instructorId: rootState.user._id,
        },
      });
      commit("setDeletedSection",res)
    } catch (error) {
      console.log(error);
    }
  },
/**
 * Fetches the profile information of the authenticated instructor when the page loads
 * and updates the root store with the instructor's name.
 *
 * @param {Object} param0 - An object containing commit and rootState properties.
 * @returns {Promise} A promise that resolves with the retrieved instructor's profile data
 *                    or rejects with an error if the request fails.
 */
  async getInstructorProfileOnLoad({ commit, rootState }) {
    try {
      const res = await axios.get(
        `${backend_url}/instructor?id=${rootState.user._id}`,
      );
      console.log(res);
      commit("user/setUserName",res.data.name, { root: true });
    } catch (error) {
      return 0;
      console.log(error);
    }
  },


async publishCourse({ commit, rootState }, courseId) {
    const id = rootState.user._id;
    const token = rootState.user.token;
    const email = rootState.user.email;
    const res = await axios.patch(`${backend_url}/instructor/status`, {
      id,
      token,
      email,
      courseId: courseId,
    });
    commit("setPublishedCourse", res.data)
  },

  async editCourse({ commit, rootState }, { updates, courseId }) {
    const res = await axios.patch(`${backend_url}/instructor/editcourse`, {
      courseId,
      updates,
      token: rootState.user.token,
      email: rootState.user.email,
      id: rootState.user._id,
    });
    commit("setEditedCourse", res.data);
  },

  async instructorCoursePurchase({ commit, rootState }, courseId) {
    const res = await axios.post(`${backend_url}/instructor/course/purchases`, {
      courseId,
      token: rootState.user.token,
      email: rootState.user.email,
      id: rootState.user._id,
    });
    commit("setCoursePurchases", res.data);
  },
};
