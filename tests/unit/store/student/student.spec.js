import axios from "axios";
import { createStore } from "vuex";
import moduleStudent from "@/store/modules/student/index"; // Import your Vuex module
// import moduleStudent from '@/store/modules/student/index'; // Import your Vuex module

describe("Student Vuex Store", () => {
  let store;
  let actions;
  const rootState = {
    user: {
      _id: "sampleUserId",
      token: "sampleToken",
      email: "sampleEmail@example.com",
      name: "Sample Name",
    },
  };

  const commits = {
    setUserName: (name) => rootState.user.name,
  };
  beforeEach(() => {
    // Create a new Vuex store with the module you want to test
    jest.spyOn(console, "warn").mockImplementation(() => {});

    actions = moduleStudent.actions;
    store = createStore({
      modules: {
        student: {
          ...moduleStudent,
          state: {
            searchResults: [],
            enrolledCourses: [],
            profile: {},
          },
        },
        user: {
          namespaced: true, // Make sure the module is namespaced
          mutations: commits, // Include mutations for the user module
          state: {
            // You can add user module state here if needed
          },
        },
      },
      state: rootState.user, // Assign the rootState here
    });
  });

  it("fetches search results from the API", async () => {
    // Mock the Axios get method
    const axiosGetMock = jest.spyOn(axios, "get");
    const searchKey = "sampleSearchKey";

    // Define the expected response from the server
    const response = {
      data: ["result1", "result2", "result3"], // Sample search results
    };

    axiosGetMock.mockResolvedValue(response);

    // Dispatch the 'searchResultsFromAPI' action
    await store.dispatch("student/searchResultsFromAPI", searchKey);

    // Assert that the store state has been updated with the search results
    expect(store.state.student.searchResults).toEqual(response.data);

    // Restore the original Axios get method
    axiosGetMock.mockRestore();
  });

  it("fetches enrolled courses for a student", async () => {
    // await actions.fetchEnrolledCourses({ commit: store.commit, rootState: rootState });

    // Mock the Axios post method
    const axiosPostMock = jest.spyOn(axios, "post");
    // Define the expected response from the server
    const response = {
      data: ["course1", "course2", "course3"], // Sample enrolled courses
    };

    axiosPostMock.mockResolvedValue(response);

    // Dispatch the 'fetchEnrolledCourses' action
    await store.dispatch("student/fetchEnrolledCourses");

    // Assert that the store state has been updated with the enrolled courses
    expect(store.state.student.enrolledCourses).toEqual(response.data);

    // Restore the original Axios post method
    axiosPostMock.mockRestore();
  });

  it("fetches student profile data from the API", async () => {
    // Mock the Axios get method
    const axiosGetMock = jest.spyOn(axios, "get");

    // Define the expected response from the server
    const response = {
      data: {
        name: "Student Name",
        email: "student@example.com",
        // Include other student profile data
      },
    };

    axiosGetMock.mockResolvedValue(response);

    // Dispatch the 'getStudentProfile' action
    await store.dispatch("student/getStudentProfile");

    // Assert that the store state has been updated with the student profile
    expect(store.state.student.profile).toEqual(response.data);

    // Restore the original Axios get method
    axiosGetMock.mockRestore();
  });

  it("submits a review for a course", async () => {
    // Mock the Axios patch method
    const axiosPatchMock = jest.spyOn(axios, "patch");

    // Define the expected response from the server
    const response = {
      data: "Review submitted successfully", // Sample response
    };

    axiosPatchMock.mockResolvedValue(response);

    // Dispatch the 'submitReview' action
    const reviewData = {
      rating: 5,
      review: "Great course!",
      courseId: "sampleCourseId",
    };
    await store.dispatch("student/submitReview", reviewData);

    // Restore the original Axios patch method
    axiosPatchMock.mockRestore();
  });

  it("updates the student profile", async () => {
    // Mock the Axios patch method
    const axiosPatchMock = jest.spyOn(axios, "patch");

    // Define the expected response from the server (if needed)

    axiosPatchMock.mockResolvedValue({});

    // Dispatch the 'updateStudentProfile' action
    const updates = {
      name: "Updated Name",
      // Include other profile updates
    };
    await store.dispatch("student/updateStudentProfile", updates);

    // Assert that the student profile has been updated in the store state
    expect(store.state.student.profile.name).toBe("Updated Name");
    console.log(store);
    axiosPatchMock.mockRestore();
  });
});
