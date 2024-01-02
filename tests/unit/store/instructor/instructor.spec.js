import axios from "axios";
import { createStore } from "vuex";
import moduleInstructor from "@/store/modules/instructor/index";

jest.mock("axios");

describe("Instructor Vuex Store", () => {
  let store;
  let actions;
  const rootState = {
    user: {
      _id: "sampleUserId",
      token: "sampleToken",
      email: "sampleEmail@example.com",
    },
  };

  beforeEach(() => {
    // Clear all mocked functions and instances of axios
    jest.clearAllMocks();

    actions = moduleInstructor.actions;
    store = createStore({
      modules: {
        instructor: {
          ...moduleInstructor,
          state: {
            profile: {},
            lastCourseAdded: {},
            currentCourse: {},
            deletedVideo: {},
            selfCourses: [],
            lastSectionAdded: {},
            deletedSection: {},
            publishedCourse: {},
            editedCourse: {},
            coursePurchases: {},
          },
        },
      },
      state: rootState, // Assign the rootState here
    });
  });

  it("adds a course instructor", async () => {
    // Mock the Axios post method
    const axiosPostMock = jest.spyOn(axios, "post");

    // Define the expected response from the server
    const response = {
      data: "Course instructor added successfully",
    };

    axiosPostMock.mockResolvedValue(response);

    // Dispatch the 'addCourseInstructor' action
    const course = { name: "Sample Course" };
    await store.dispatch("instructor/addCourseInstructor", { course });

    // Assert that the store state has been updated with the last added course information
    expect(store.state.instructor.lastCourseAdded).toEqual(response.data);

    // Restore the original Axios post method
    axiosPostMock.mockRestore();
  });

  it("fetches details of a specific instructor course", async () => {
    // Mock the Axios post method
    const axiosPostMock = jest.spyOn(axios, "post");

    // Define the expected response from the server
    const response = {
      data: { courseId: "sampleCourseId", courseName: "Sample Course" },
    };

    axiosPostMock.mockResolvedValue(response);

    // Dispatch the 'instructorCourseViewOne' action
    const courseId = "sampleCourseId";
    const router = { push: jest.fn() }; // Mock the router for navigation
    await store.dispatch("instructor/instructorCourseViewOne", {
      courseId,
      router,
    });

    // Assert that the store state has been updated with the current course
    expect(store.state.instructor.currentCourse).toEqual(response.data.course);

    // Restore the original Axios post method
    axiosPostMock.mockRestore();
  });

  it("deletes a video from a specific course subsection", async () => {
    // Mock the Axios post method
    const axiosPostMock = jest.spyOn(axios, "post");

    // Define the expected response from the server
    const response = {
      data: "Video deleted successfully",
    };

    axiosPostMock.mockResolvedValue(response);

    // Dispatch the 'deleteVideo' action
    const courseId = "sampleCourseId";
    const subsectionToBeUpdated = "sampleSubsection";
    const indexOfVideo = 1;
    await store.dispatch("instructor/deleteVideo", {
      courseId,
      subsectionToBeUpdated,
      indexOfVideo,
    });

    // Assert that the store state has been updated with information about the deleted video
    expect(store.state.instructor.deletedVideo).toEqual(response.data);

    // Restore the original Axios post method
    axiosPostMock.mockRestore();
  });

  it("fetches a list of self-courses associated with the instructor", async () => {
    // Mock the Axios post method
    const axiosPostMock = jest.spyOn(axios, "post");

    // Define the expected response from the server
    const response = {
      data: ["Course1", "Course2", "Course3"],
    };

    axiosPostMock.mockResolvedValue(response);

    // Dispatch the 'fetchSelfCourses' action
    await store.dispatch("instructor/fetchSelfCourses");

    // Assert that the store state has been updated with the retrieved self-courses information
    expect(store.state.instructor.selfCourses).toEqual(response.data);

    // Restore the original Axios post method
    axiosPostMock.mockRestore();
  });

  it("adds a new section to a course lesson", async () => {
    // Mock the Axios post method
    const axiosPostMock = jest.spyOn(axios, "post");

    // Define the expected response from the server
    const response = {
      data: "Section added successfully",
    };

    axiosPostMock.mockResolvedValue(response);

    // Dispatch the 'addSection' action
    const index = 1;
    const title = "New Section";
    const id = "sampleCourseId";
    await store.dispatch("instructor/addSection", { index, title, id });

    // Assert that the store state has been updated with information about the added section
    expect(store.state.instructor.lastSectionAdded).toEqual(response.data);

    // Restore the original Axios post method
    axiosPostMock.mockRestore();
  });

  it("fetches the profile information of the instructor", async () => {
    // Mock the Axios post method
    const axiosPostMock = jest.spyOn(axios, "post");

    // Define the expected response from the server
    const response = {
      data: { name: "Instructor Name", email: "instructor@example.com" },
    };

    axiosPostMock.mockResolvedValue(response);

    // Dispatch the 'getInstructorProfile' action
    await store.dispatch("instructor/getInstructorProfile");

    // Assert that the store state has been updated with the retrieved profile data
    expect(store.state.instructor.profile).toEqual(response.data);

    // Restore the original Axios post method
    axiosPostMock.mockRestore();
  });

  it("updates the profile information of the instructor", async () => {
    // Mock the Axios patch method
    const axiosPatchMock = jest.spyOn(axios, "patch");

    // Define the expected response from the server
    const response = {
      data: { name: "Updated Name", email: "updated@example.com" },
    };

    axiosPatchMock.mockResolvedValue(response);

    // Dispatch the 'updateInstructorProfile' action
    const updates = { name: "Updated Name", email: "updated@example.com" };
    await store.dispatch("instructor/updateInstructorProfile", updates);

    // Assert that the store state has been updated with the modified profile data
    expect(store.state.instructor.profile).toEqual(response.data);

    // Restore the original Axios patch method
    axiosPatchMock.mockRestore();
  });

  it("deletes a section from a specific course", async () => {
    // Mock the Axios delete method
    const axiosDeleteMock = jest.spyOn(axios, "delete");

    // Define the expected response from the server
    const response = {
      data: "Section deleted successfully",
    };

    axiosDeleteMock.mockResolvedValue(response);

    // Dispatch the 'deleteSection' action
    const courseId = "sampleCourseId";
    const sectionId = "sampleSectionId";
    await store.dispatch("instructor/deleteSection", { courseId, sectionId });

    // Assert that the store state has been updated with information about the deleted section
    expect(store.state.instructor.deletedSection.data).toEqual(response.data);

    // Restore the original Axios delete method
    axiosDeleteMock.mockRestore();
  });

  it("fetches the instructor profile on page load", async () => {
    // Mock the Axios get method
    const axiosGetMock = jest.spyOn(axios, "get");

    // Define the expected response from the server
    const response = {
      data: { name: "Instructor Name" },
    };

    axiosGetMock.mockResolvedValue(response);

    // Dispatch the 'getInstructorProfileOnLoad' action
    await store.dispatch("instructor/getInstructorProfileOnLoad");

    // Restore the original Axios get method
    axiosGetMock.mockRestore();
  });

  it("publishes a course", async () => {
    // Mock the Axios patch method
    const axiosPatchMock = jest.spyOn(axios, "patch");

    // Define the expected response from the server
    const response = {
      data: "Course published successfully",
    };

    axiosPatchMock.mockResolvedValue(response);

    // Dispatch the 'publishCourse' action
    const courseId = "sampleCourseId";
    await store.dispatch("instructor/publishCourse", courseId);

    // Assert that the store state has been updated with information about the published course
    expect(store.state.instructor.publishedCourse).toEqual(response.data);

    // Restore the original Axios patch method
    axiosPatchMock.mockRestore();
  });

  it("edits a course", async () => {
    // Mock the Axios patch method
    const axiosPatchMock = jest.spyOn(axios, "patch");

    // Define the expected response from the server
    const response = {
      data: "Course edited successfully",
    };

    axiosPatchMock.mockResolvedValue(response);

    // Dispatch the 'editCourse' action
    const updates = { name: "Edited Course" };
    const courseId = "sampleCourseId";
    await store.dispatch("instructor/editCourse", { updates, courseId });

    // Assert that the store state has been updated with information about the edited course
    expect(store.state.instructor.editedCourse).toEqual(response.data);

    // Restore the original Axios patch method
    axiosPatchMock.mockRestore();
  });

  it("handles instructor course purchases", async () => {
    // Mock the Axios post method
    const axiosPostMock = jest.spyOn(axios, "post");

    // Define the expected response from the server
    const response = {
      data: "Course purchases recorded successfully",
    };

    axiosPostMock.mockResolvedValue(response);

    // Dispatch the 'instructorCoursePurchase' action
    const courseId = "sampleCourseId";
    await store.dispatch("instructor/instructorCoursePurchase", courseId);

    // Assert that the store state has been updated with information about course purchases
    expect(store.state.instructor.coursePurchases).toEqual(response.data);

    // Restore the original Axios post method
    axiosPostMock.mockRestore();
  });
});
