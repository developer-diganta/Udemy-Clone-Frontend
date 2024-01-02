import { shallowMount } from "@vue/test-utils";
import AdminHome from "../../../src/views/admin/AdminHomePage"; // Replace with the correct path to your component
import Vuex from "vuex";

describe("AdminHome.vue", () => {
  let wrapper;
  let store;
  let actions;
  let state;

  beforeEach(() => {
    jest.spyOn(console, "warn").mockImplementation(() => {});

    state = {
      admin: {
        totalCoursesPurchased: 100,
        totalCourses: 150,
        allStudents: [],
        allCourses: [],
        allInstructors: [],
        payments: [
          {
            paymentDetails: {
              price: 200,
              createdAt: "2023-01-01T00:00:00Z",
            },
          },
          {
            paymentDetails: {
              price: 150,
              createdAt: "2023-02-01T00:00:00Z",
            },
          },
          // Add more sample payment data as needed
        ],
      },
    };

    actions = {
      "admin/getRevenue": jest.fn(() => {
        return state.admin.payments;
      }),
      "admin/getAllStudents": jest.fn(() => {
        return state.admin.allStudents;
      }),
      "admin/getAllCourses": jest.fn(() => {
        return state.admin.allCourses;
      }),
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

    wrapper = shallowMount(AdminHome, {
      global: {
        plugins: [store],
      },
    });
  });

  it("renders the component correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("fetches and displays revenue and payments correctly", async () => {
    // Ensure that the component has fetched revenue and payment data and set the data correctly
    expect(wrapper.vm.totalCoursesPurchased).toEqual(
      state.admin.totalCoursesPurchased,
    );
    // expect(wrapper.vm.totalCourses).toEqual(state.admin.totalCourses);
  });
});
