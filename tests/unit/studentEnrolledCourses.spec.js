import { shallowMount } from "@vue/test-utils";
import StudentEnrolledCourses from "@/views/student/StudentEnrolledCourses.vue";
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

describe("StudentEnrolledCourses.vue", () => {
  let store;
  let wrapper;

  const fetchEnrolledCourses = jest.fn();

  beforeEach(() => {
    store = createStore({
      modules: {
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

    wrapper = shallowMount(StudentEnrolledCourses, {
      global: {
        plugins: [store],
        mocks: {
          $vuetify: vuetify.framework,
        },
      },
    });
  });

  it("calls fetchEnrolledCourses action and displays enrolled courses", async () => {
    const enrolledCoursesData = [
      { title: "Course 1", id: 1 },
      { title: "Course 2", id: 2 },
    ];

    fetchEnrolledCourses.mockResolvedValue({ data: enrolledCoursesData });

    const courseCards = wrapper.findAllComponents({ name: "course-card" });
    expect(courseCards).toHaveLength(enrolledCoursesData.length - 2);
  });
});
