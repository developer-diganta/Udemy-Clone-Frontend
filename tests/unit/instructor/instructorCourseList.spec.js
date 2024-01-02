import { shallowMount } from "@vue/test-utils";
import InstructorCourseList from "../../../src/views/instructor/InstructorCourseList";
import Vuex from "vuex";
import { createVuetify } from "vuetify/lib/framework.mjs";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
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
describe("InstructorCourseList.vue", () => {
  let wrapper;
  const actions = {
    fetchSelfCourses: jest.fn(),
    publishCourse: jest.fn(),
  };
  const getters = {
    selfCourses: () => [
      {
        _id: 1,
        title: "Course 1",
        status: "published",
      },
      {
        _id: 2,
        title: "Course 2",
        status: "pending",
      },
      {
        _id: 3,
        title: "Course 3",
        status: "active",
      },
    ],
    "user/name": () => "John Doe",
  };

  const state = {
    selfCourses: [
      {
        title: "Sample Course 1",
        description: "Sample description 1",
        price: 100,
        discount: 10,
        categories: ["Category 1", "Category 2"],
        instructor: {
          name: "Instructor Name 1",
        },
        status: "pending",
      },
    ],
  };

  beforeEach(() => {
    jest.spyOn(console, "warn").mockImplementation(() => {});

    const store = new Vuex.Store({
      modules: {
        instructor: {
          namespaced: true,
          actions,
          getters,
          state,
        },
        user: {
          namespaced: true,
        },
      },
    });

    wrapper = shallowMount(InstructorCourseList, {
      data() {
        return {
          allCourses: [
            {
              title: "Sample Course 1",
              description: "Sample description 1",
              price: 100,
              discount: 10,
              categories: ["Category 1", "Category 2"],
              instructor: {
                name: "Instructor Name 1",
              },
              status: "pending",
            },
          ],
        };
      },
      global: {
        plugins: [store],
        mocks: {
          $vuetify: vuetify.framework,
        },
      },
    });
  });

  it("renders a list of published courses", () => {
    const publishedCourses = wrapper.findAll('[data-value="publishedCourse"]');
    console.log(publishedCourses);
    expect(publishedCourses.length).toBe(0);
  });

  it("renders a list of pending courses", () => {
    const pendingCourses = wrapper.findAll('[data-value="pending-courses"');
    expect(pendingCourses.length).toBe(1);
  });

  it("renders a list of active courses", () => {
    const activeCourses = wrapper.findAll(".active-courses");
    expect(activeCourses.length).toBe(0);
  });

  it("calls publishCourse action when 'Publish' button is clicked", async () => {
    const publishButtons = wrapper.find('[data-value="publish-course-btn"]');

    console.log(publishButtons);
    publishButtons.trigger("click");
    expect(actions["publishCourse"]).toHaveBeenCalled();
  });
});
