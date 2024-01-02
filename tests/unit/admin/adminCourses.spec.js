import { shallowMount } from "@vue/test-utils";
import Dashboard from "../../../src/views/admin/AdminCourses"; // Replace with the correct path to your component
import Vuex from "vuex";

describe("AdminDashboard.vue", () => {
  let wrapper;
  let store;
  let actions;
  let state;

  beforeEach(() => {
    state = {
      admin: {
        allCourses: [
          {
            id: 1,
            status: "pending",
            categories: ["Category1"],
            createdAt: "2023-01-01T00:00:00Z",
          },
          {
            id: 2,
            status: "published",
            categories: ["Category2", "Category3"],
            createdAt: "2023-02-01T00:00:00Z",
          },
        ],
      },
    };

    actions = {
      "admin/getAllCourses": jest.fn(),
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

    wrapper = shallowMount(Dashboard, {
      global: {
        plugins: [store],
      },
    });
  });

  it("renders the component correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("fetches and displays course statistics correctly", async () => {
    // Ensure that the component has fetched course data and set the data correctly
    expect(wrapper.vm.courses).toEqual(state.admin.allCourses);
    expect(wrapper.vm.totalCourses).toBe(state.admin.allCourses.length);
    expect(wrapper.vm.pendingCourses).toBe(
      state.admin.allCourses.filter((course) => course.status === "pending")
        .length,
    );
    expect(wrapper.vm.publishedCourses).toBe(
      state.admin.allCourses.filter((course) => course.status === "published")
        .length,
    );

    // Ensure that category data is processed and set correctly
    const categoryMap = new Map();
    state.admin.allCourses.forEach((course) => {
      course.categories.forEach((category) => {
        if (categoryMap.has(category)) {
          categoryMap.set(category, categoryMap.get(category) + 1);
        } else {
          categoryMap.set(category, 1);
        }
      });
    });

    expect(wrapper.vm.pieLabels).toEqual(Array.from(categoryMap.keys()));
    expect(wrapper.vm.pieData).toEqual(Array.from(categoryMap.values()));

    // Mock some data for the computed property thisYear and ensure it's computed correctly
    const thisYearData = [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    expect(wrapper.vm.thisYear).toEqual(thisYearData);
  });

  // Add more test cases as needed
});
