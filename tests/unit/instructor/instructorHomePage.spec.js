import { shallowMount } from "@vue/test-utils";
import InstructorHomePage from "../../../src/views/instructor/InstructorHomePage";
import Vuex from "vuex";

describe("InstructorHomePage.vue", () => {
  let wrapper;
  let store;
  let actionsCommon;
  let actionsInstructor;

  beforeEach(() => {
    jest.spyOn(console, "warn").mockImplementation(() => {});

    actionsCommon = {
      fetchTrendingCourses: jest.fn(),
    };
    actionsInstructor = {
      fetchSelfCourses: jest.fn(),
    };
    store = new Vuex.Store({
      modules: {
        common: {
          namespaced: true,
          actions: actionsCommon,
          state: {
            trendingCourses: [
              {
                title: "Course 1",
                price: 100,
              },
              {
                title: "Course 2",
                price: 80,
              },
            ],
          },
        },
        instructor: {
          namespaced: true,
          actions: actionsInstructor,
          state: {
            selfCourses: [
              {
                title: "My Course 1",
                price: 120,
              },
              {
                title: "My Course 2",
                price: 90,
              },
            ],
          },
        },
      },
    });

    wrapper = shallowMount(InstructorHomePage, {
      global: {
        plugins: [store],
        mocks: {
          $store: store,
        },
      },
    });
  });

  it("renders the component correctly", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("h2").text()).toBe("Hello, John Doe (Instructor)");
  });

  it("fetches trending courses and self courses", async () => {
    expect(actionsCommon["fetchTrendingCourses"]).toHaveBeenCalled();
    expect(actionsInstructor["fetchSelfCourses"]).toHaveBeenCalled();
  });
});
