import { shallowMount } from "@vue/test-utils";
import StudentHomePage from "@/views/student/StudentHomePage.vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createStore } from "vuex";

const vuetify = createVuetify({
  components: {
    ...components,
  },
  directives,
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primaryTheme: "#008080",
          secondaryCoral: "#6FBEDF",
        },
      },
    },
  },
});

describe("StudentHomePage.vue", () => {
  let store;
  let wrapper;

  // Mock actions
  const fetchTrendingCourses = jest.fn();
  const fetchEnrolledCourses = jest.fn();

  beforeEach(() => {
    store = createStore({
      modules: {
        common: {
          namespaced: true,
          state: {
            trendingCourses: [],
          },
          actions: {
            fetchTrendingCourses, // Use the mocked function
          },
        },
        student: {
          namespaced: true,
          state: {
            enrolledCourses: [],
          },
          actions: {
            fetchEnrolledCourses,
          },
        },
      },
    });

    wrapper = shallowMount(StudentHomePage, {
      global: {
        plugins: [store],
        mocks: {
          $vuetify: vuetify.framework,
        },
      },
    });
  });

  it("calls fetchTrendingCourses and fetchEnrolledCourses actions", () => {
    expect(fetchTrendingCourses).toHaveBeenCalled();
    expect(fetchEnrolledCourses).toHaveBeenCalled();
  });
});
