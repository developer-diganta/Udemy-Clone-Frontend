import { shallowMount } from "@vue/test-utils";
import AdminInstructors from "../../../src/views/admin/AdminInstructors";
import Vuex from "vuex";

describe("AdminInstructors.vue", () => {
  let wrapper;
  let store;
  let actions;
  let state;

  beforeEach(() => {
    state = {
      admin: {
        allInstructors: [
          {
            id: 1,
            name: "Instructor 1",
            status: "verified",
            createdAt: "2023-01-01T00:00:00Z",
            courses: [
              { courseId: 1, courseName: "Course 1" },
              { courseId: 2, courseName: "Course 2" },
            ],
          },
          {
            id: 2,
            name: "Instructor 2",
            status: "pending",
            createdAt: "2023-02-01T00:00:00Z",
            courses: [
              { courseId: 3, courseName: "Course 3" },
              { courseId: 4, courseName: "Course 4" },
            ],
          },
        ],
      },
    };

    actions = {
      "admin/getAllInstructors": jest.fn(() => {
        return state.admin.allInstructors;
      }),
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

    wrapper = shallowMount(AdminInstructors, {
      global: {
        plugins: [store],
      },
    });
  });

  it("renders the component correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("displays the correct instructor statistics", async () => {
    // Ensure that the component displays the correct instructor statistics
    expect(wrapper.vm.pendingInstructors.length).toBe(1);
    expect(wrapper.vm.verifiedInstructors).toBe(1);
    expect(wrapper.vm.monthlyInstructorSignups).toEqual([
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]);
    expect(wrapper.vm.instructorCoursesList[0].name).toBe("Instructor 1");
    expect(wrapper.vm.instructorCoursesList[0].courses.length).toBe(2);
    expect(wrapper.vm.instructorCoursesList[1].name).toBe("Instructor 2");
    expect(wrapper.vm.instructorCoursesList[1].courses.length).toBe(2);

    //  Check if the latest signup month is correctly computed
    const latestSignupMonth = wrapper.vm.monthlyInstructorSignups.findIndex(
      (signups) => signups > 0,
    );
    expect(latestSignupMonth).toBe(0);

    //Verify that the sorted instructor list is based on the number of courses
    expect(wrapper.vm.instructorCoursesList[0].name).toBe("Instructor 1");
    expect(wrapper.vm.instructorCoursesList[1].name).toBe("Instructor 2");
  });
});
