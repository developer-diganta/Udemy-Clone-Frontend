import { shallowMount } from "@vue/test-utils";
import AdminCourseStatus from "../../../src/views/admin/AdminCourseStatus";
import Vuex from "vuex";

describe("AdminCourseStatus.vue", () => {
  let wrapper;
  let store;
  let actions;
  let state;

  beforeEach(() => {
    state = {
      admin: {
        allCourses: [
          {
            _id: "1",
            status: "published",
            thumbnail: "course1.jpg",
            title: "Course 1",
            instructor: { name: "Instructor 1" },
            price: 1000,
            createdAt: "2023-01-01T00:00:00Z",
          },
          {
            _id: "2",
            status: "active",
            thumbnail: "course2.jpg",
            title: "Course 2",
            instructor: { name: "Instructor 2" },
            price: 1500,
            createdAt: "2023-02-01T00:00:00Z",
          },
        ],
      },
    };

    actions = {
      getAllCourses: jest.fn(() => {
        return state.admin.allCourses;
      }),
      fetchInstructorName: jest.fn(),
      updateCourseStatus: jest.fn(),
    };

    store = new Vuex.Store({
      state,
      actions,
      modules: {
        admin: {
          namespaced: true,
          actions,
          state: state.admin,
        },
      },
    });
    const mockRoute = {
      params: {
        id: 1,
      },
    };

    wrapper = shallowMount(AdminCourseStatus, {
      global: {
        plugins: [store],
        mocks: {
          $route: mockRoute,
          $router: {
            push: jest.fn(),
          },
        },
      },
    });
  });

  it("renders the component correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("fetches and displays course statistics correctly", async () => {
    // Ensure that the component has fetched course data and set the data correctly
    expect(wrapper.vm.allCourses).toEqual(state.admin.allCourses);
    const publishedCourses = state.admin.allCourses.filter(
      (course) => course.status === "published",
    );
    const activeCourses = state.admin.allCourses.filter(
      (course) => course.status === "active",
    );
    expect(wrapper.vm.publishedCourses).toEqual(publishedCourses);
    expect(wrapper.vm.activeCourses).toEqual(activeCourses);

    // Test computed properties and methods as needed

    // Test methods for redirection and activation
    const courseId = "1";
    await wrapper.vm.activate(courseId);
    expect(actions["updateCourseStatus"]).toHaveBeenCalledWith(
      expect.any(Object),
      { id: courseId },
    );
    expect(actions["getAllCourses"]).toHaveBeenCalled();

    const courseId2 = "2";
    wrapper.vm.redirect(courseId2);

    // Test instructorName method
    const instructorId = "123";
    await wrapper.vm.instructorName(instructorId);
    expect(actions["fetchInstructorName"]).toHaveBeenCalledWith(
      expect.any(Object),
      instructorId,
    );

    // Add more test cases as needed
  });
});
