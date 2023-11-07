import { shallowMount } from "@vue/test-utils";
import CreateCourse from "../../../src/views/instructor/InstructorAddCourse";
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
describe("CreateCourse.vue", () => {
  let wrapper;

  let store;
  let actions;

  beforeEach(() => {
    actions = {
      addCourseInstructor: jest.fn(),
    };
    store = new Vuex.Store({
      modules: {
        instructor: {
          namespaced: true,
          actions,
        },
      },
    });

    wrapper = shallowMount(CreateCourse, {
      global: {
        plugins: [store],
        mocks: {
          $vuetify: vuetify.framework,
        },
      },
    });
  });

  it("renders the component correctly", () => {
    expect(wrapper.exists()).toBe(true);

    expect(wrapper.find("h1").text()).toBe("Create Course");
  });

  it("adds a new category when the 'addCategory' method is called", () => {
    // Set an initial category
    wrapper.setData({ singleCategory: "Category 1" });

    // Trigger the 'addCategory' method
    wrapper.vm.addCategory();

    // Check if the category was added to the 'categories' data property
    expect(wrapper.vm.categories).toEqual(["Category 1"]);
    // Check if the 'singleCategory' was cleared after adding
    expect(wrapper.vm.singleCategory).toBe("");
  });

  it("calls the 'addCourse' method and dispatches 'instructor/addCourseInstructor'", async () => {
    // Set some data values
    wrapper.setData({
      title: "Sample Course",
      description: "Sample description",
      price: 100,
      discount: 10,
      categories: ["Category 1", "Category 2"],
    });

    // Trigger the 'addCourse' method
    await wrapper.vm.addCourse();

    // Check if the 'instructor/addCourseInstructor' action was dispatched
    expect(actions["addCourseInstructor"]).toHaveBeenCalledWith(
      expect.any(Object),
      {
        course: {
          title: "Sample Course",
          description: "Sample description",
          price: 100,
          discount: 10,
          categories: ["Category 1", "Category 2"],
        },
      },
    );
  });
});
