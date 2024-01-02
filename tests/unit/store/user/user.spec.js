import axios from "axios";
import { createStore } from "vuex";
import moduleUser from "@/store/modules/user/index.js"; // Import your Vuex module

describe("Vuex Store", () => {
  let store;

  beforeEach(() => {
    // Create a new Vuex store with the module you want to test
    store = createStore(moduleUser);
  });

  it("registers a new student", async () => {
    // Mock the Axios post method
    const axiosPostMock = jest.spyOn(axios, "post");
    const userData = {
      email: "test@example.com",
      name: "Test User",
      password: "testPassword",
    };

    // Define the expected response from the server
    const response = {
      data: {
        _id: "sampleUserId",
        name: "Test User",
        type: "student",
        token: "sampleToken",
        email: "test@example.com",
      },
    };

    axiosPostMock.mockResolvedValue(response);

    // Dispatch the action you want to test
    const result = await store.dispatch("studentSignUp", userData);

    // Assert that the store state has been updated correctly
    expect(store.state.name).toBe("Test User");
    expect(store.state._id).toBe("sampleUserId");
    expect(store.state.type).toBe("student");
    expect(store.state.token).toBe("sampleToken");
    expect(store.state.email).toBe("test@example.com");

    // Also, check that the action returns the response from the server
    expect(result).toEqual(response);

    // Restore the original Axios post method
    axiosPostMock.mockRestore();
  });
  it("registers a new instructor", async () => {
    // Mock the Axios post method
    const axiosPostMock = jest.spyOn(axios, "post");
    const instructorData = {
      email: "instructor@example.com",
      name: "Instructor User",
      password: "instructorPassword",
      // Include other required data for instructor registration
    };

    // Define the expected response from the server
    const response = {
      data: {
        _id: "sampleInstructorId",
        name: "Instructor User",
        type: "instructor",
        token: "sampleToken",
        email: "instructor@example.com",
        // Include other instructor-specific data
      },
    };

    axiosPostMock.mockResolvedValue(response);

    // Dispatch the 'instructorSignUp' action
    const result = await store.dispatch("instructorSignUp", instructorData);

    // Assert that the store state has been updated correctly
    expect(store.state.name).toBe("Instructor User");
    expect(store.state._id).toBe("sampleInstructorId");
    expect(store.state.type).toBe("instructor");
    expect(store.state.token).toBe("sampleToken");
    expect(store.state.email).toBe("instructor@example.com");

    // Restore the original Axios post method
    axiosPostMock.mockRestore();
  });

  it("signs in an existing user", async () => {
    // Mock the Axios post method
    const axiosPostMock = jest.spyOn(axios, "post");
    const userData = {
      email: "test@example.com",
      password: "testPassword",
    };

    // Define the expected response from the server
    const response = {
      data: {
        _id: "sampleUserId",
        name: "Test User",
        type: "student", // User type: student, instructor, admin
        token: "sampleToken",
        email: "test@example.com",
      },
    };

    axiosPostMock.mockResolvedValue(response);

    // Dispatch the 'signInSubmit' action
    const result = await store.dispatch("signInSubmit", {
      ...userData,
      endPoint: "student", // Specify user type
    });

    // Assert that the store state has been updated correctly
    expect(store.state.name).toBe("Test User");
    expect(store.state._id).toBe("sampleUserId");
    expect(store.state.type).toBe("student");
    expect(store.state.token).toBe("sampleToken");
    expect(store.state.email).toBe("test@example.com");

    // Also, check that the action returns the expected result (e.g., 'home')
    expect(result).toBe("home");

    // Restore the original Axios post method
    axiosPostMock.mockRestore();
  });
});
