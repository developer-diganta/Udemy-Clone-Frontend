import { shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import AdminStudents from "../../../src/views/admin/AdminStudents.vue";

describe("AdminStudents.vue", () => {
  let actions;
  let store;

  beforeEach(() => {
    actions = {
      getAllStudents: jest.fn(),
    };
    store = new Vuex.Store({
      modules: {
        admin: {
          namespaced: true,
          actions,
          state: {
            allStudents: [],
          },
        },
      },
    });
  });

  it("displays the correct number of pending students", async () => {
    store.state.admin.allStudents = [
      { status: "pending" },
      { status: "pending" },
      { status: "registered" },
    ];

    const wrapper = shallowMount(AdminStudents, {
      global: {
        plugins: [store],
      },
    });

    // Wait for the component to fetch students
    await wrapper.vm.$nextTick();

    // Ensure that the component displays the correct number of pending students
    const pendingStudents = wrapper.vm.pendingStudents.length;
    expect(pendingStudents).toBe(2);
  });

  it("displays the correct number of verified students", async () => {
    store.state.admin.allStudents = [
      { status: "pending" },
      { status: "pending" },
      { status: "registered" },
    ];

    const wrapper = shallowMount(AdminStudents, {
      global: {
        plugins: [store],
      },
    });

    // Wait for the component to fetch students
    await wrapper.vm.$nextTick();

    // Ensure that the component displays the correct number of verified students
    const verifiedStudents = wrapper.vm.verifiedStudents.length;
    expect(verifiedStudents).toBe(1);
  });

  it("displays the correct monthly student signups data", async () => {
    // Mock your student data with createdAt values for different months
    store.state.admin.allStudents = [
      { createdAt: "2023-01-15" },
      { createdAt: "2023-02-10" },
      { createdAt: "2023-02-20" },
      { createdAt: "2022-11-05" },
    ];

    const wrapper = shallowMount(AdminStudents, {
      global: {
        plugins: [store],
      },
    });

    // Wait for the component to fetch students
    await wrapper.vm.$nextTick();

    // Ensure that the component calculates the monthly signups correctly
    const monthlySignups = wrapper.vm.monthlyStudentSignups;
    expect(monthlySignups).toEqual([1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  });
});
