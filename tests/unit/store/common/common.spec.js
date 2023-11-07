import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { createStore } from "vuex";
import moduleCommon from "@/store/modules/common/index.js";
describe("Vuex Store - Module User Actions", () => {
  let store;
  let mockAxios;

  beforeEach(() => {
    store = createStore(moduleCommon);
    mockAxios = new MockAdapter(axios);
  });

  it("fetches trending courses", async () => {
    // Mock the Axios get method
    const axiosGetMock = jest.spyOn(axios, "get");
    const responseData = {
      data: {
        _id: "sampleCourseId",
        title: "Sample Course",
        description: "This is a sample course description.",
        price: 29.99,
        instructor: {
          _id: "instructorId",
          name: "Instructor Name",
        },
        status: "published",
        createdAt: "2023-11-04T10:00:00Z",
        thumbnail: "https://example.com/sample-thumbnail.jpg",
      },
    };

    axiosGetMock.mockResolvedValue(responseData);

    // Dispatch the action you want to test
    await store.dispatch("fetchTrendingCourses");

    // Assert that the state has been updated correctly
    expect(store.state.trendingCourses).toEqual(responseData.data);

    // Restore the original Axios get method
    axiosGetMock.mockRestore();
  });
  it("fetches a single course", async () => {
    // Mock the Axios get method
    const axiosGetMock = jest.spyOn(axios, "get");
    const courseId = "sampleCourseId";

    // Define the sample course data
    const sampleCourse = {
      _id: courseId,
      title: "Sample Course",
      description: "This is a sample course description.",
      price: 29.99,
      instructor: {
        _id: "instructorId",
        name: "Instructor Name",
      },
      status: "published",
      createdAt: "2023-11-04T10:00:00Z", // Use a valid date
      thumbnail: "https://example.com/sample-thumbnail.jpg",
    };

    // Define the expected response data
    const responseData = {
      data: { course: sampleCourse },
    };

    axiosGetMock.mockResolvedValue(responseData);

    // Dispatch the action with the course ID
    await store.dispatch("fetchSingleCourse", { courseId });

    // Assert that the state has been updated correctly
    expect(store.state.singleCourse).toEqual(sampleCourse);

    // Restore the original Axios get method
    axiosGetMock.mockRestore();
  });
});
