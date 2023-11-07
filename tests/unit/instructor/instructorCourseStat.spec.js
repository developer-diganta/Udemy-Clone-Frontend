import { shallowMount, createLocalVue } from "@vue/test-utils";
import InstructorCourseStat from "../../../src/views/instructor/InstructorCourseStat";
import Vuex from "vuex";

describe("InstructorCourseStat.vue", () => {
  let wrapper;
  let store;
  let actions;
  let getters;

  beforeEach(() => {
    jest.spyOn(console, "warn").mockImplementation(() => {});

    actions = {
      instructorCourseViewOne: jest.fn(),
      instructorCoursePurchase: jest.fn(),
    };

    getters = {
      currentCourse: () => ({
        title: "Sample Course",
        price: 100,
        discount: 10,
        review: 4.5,
        enrollments: 50,
      }),
      coursePurchases: () => [
        {
          paymentDetails: {
            createdAt: "2023-01-15T10:00:00Z",
            price: 100,
          },
        },
        {
          paymentDetails: {
            createdAt: "2023-01-20T15:00:00Z",
            price: 80,
          },
        },
      ],
    };

    store = new Vuex.Store({
      modules: {
        instructor: {
          namespaced: true,
          actions,
          getters,
          state: {
            currentCourse: {
              title: "Sample Course",
              price: 100,
              discount: 10,
              review: 4.5,
              enrollments: 50,
            },
            coursePurchases: [
              {
                paymentDetails: {
                  createdAt: "2023-01-15T10:00:00Z",
                  price: 100,
                },
              },
              {
                paymentDetails: {
                  createdAt: "2023-01-20T15:00:00Z",
                  price: 80,
                },
              },
            ],
          },
        },
      },
    });
    const mockRoute = {
      params: {
        id: 1,
      },
    };

    wrapper = shallowMount(InstructorCourseStat, {
      data() {
        return {
          course: {
            title: "Sample Course",
            price: 100,
            discount: 10,
            review: 4.5,
            enrollments: 50,
          },
        };
      },
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
    expect(wrapper.find("h1").text()).toBe("Course Stats");
  });

  it("loads course stats", async () => {
    expect(actions["instructorCourseViewOne"]).toHaveBeenCalled();
    expect(actions["instructorCoursePurchase"]).toHaveBeenCalled();
  });
});
