import { shallowMount } from "@vue/test-utils";
import AdminRevenue from "../../../src/views/admin/AdminRevenue"; // Replace with the correct path to your component
import Vuex from "vuex";

describe("AdminRevenue.vue", () => {
  let wrapper;
  let store;
  let actions;
  let state;

  beforeEach(() => {
    state = {
      admin: {
        revenue: [
          {
            id: 1,
            paymentDetails: {
              price: 100,
              createdAt: "2023-01-01T00:00:00Z",
            },
          },
          {
            id: 2,
            paymentDetails: {
              price: 150,
              createdAt: "2022-02-01T00:00:00Z",
            },
          },
          // Add more sample revenue data as needed
        ],
      },
    };

    actions = {
      getRevenue: jest.fn(() => {
        return state.admin.revenue;
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

    wrapper = shallowMount(AdminRevenue, {
      global: {
        plugins: [store],
      },
    });
  });

  it("renders the component correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("displays the correct total revenue", async () => {
    // Ensure that the component displays the correct total revenue
    expect(wrapper.vm.totalRevenue).toBe(250);

    // Check if the revenue data is correctly filtered for the selected year
    wrapper.setData({ revenueYear: 2023 });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.revenueGraphData).toEqual([
      100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]);

    // Check the default revenue data for a different year
    wrapper.setData({ revenueYear: 2020 });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.revenueGraphData).toEqual([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]);
  });
});
