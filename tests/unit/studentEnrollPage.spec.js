import { shallowMount } from "@vue/test-utils";
import StudentEnrollPage from "@/views/student/StudentEnrollPage.vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createStore } from "vuex";
import "video.js/dist/video-js.css";

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

describe("StudentEnrollPage.vue", () => {
  let store;
  let wrapper;

  // Mock actions
  const fetchSingleCourse = jest.fn();

  beforeEach(() => {
    store = createStore({
      modules: {
        common: {
          namespaced: true,
          actions: {
            fetchSingleCourse, // Use the mocked function
          },
        },
      },
    });

    wrapper = shallowMount(StudentEnrollPage, {
      global: {
        plugins: [store],
        mocks: {
          $vuetify: vuetify.framework,
          $route: {
            params: {
              id: "123", // Mock a course ID
            },
            query: {
              payment: "failed", // Mock the query parameter
            },
          },
        },
        stubs: ["video-player"], // Add a stub for VideoPlayer
      },
    });
  });

  it("renders the component correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("calls fetchSingleCourse action", () => {
    expect(fetchSingleCourse).toHaveBeenCalledWith(expect.any(Object), {
      courseId: "123", // Check if the action is called with the correct course ID
    });
  });

  it("displays the payment failure message", () => {
    const paymentFailureMessage = wrapper.find(".paymentFailure");
    expect(paymentFailureMessage.exists()).toBe(true);
  });
});
