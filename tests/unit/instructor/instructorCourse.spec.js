import CourseDetails from "../../../src/views/instructor/InstructorCourse";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";

describe("CourseDetails.vue", () => {
  let wrapper;
  let store;
  const actions = {
    instructorCourseViewOne: jest.fn(),
    editCourse: jest.fn(),
  };
  beforeEach(() => {
    // Mock the store and its state

    store = new Vuex.Store({
      modules: {
        instructor: {
          namespaced: true,
          state: {
            currentCourse: {
              title: "Sample Course",
              description: "Sample description",
              categories: ["Category 1", "Category 2"],
              price: 100,
              discount: 10,
              thumbnail: "sample_thumbnail_url",
              requirements: ["Requirement 1", "Requirement 2"],
              courseMaterials: [{ name: "Material 1" }, { name: "Material 2" }],
            },
          },
          actions,
        },
      },
    });
    const mockRoute = {
      params: {
        id: 1,
      },
    };

    wrapper = shallowMount(CourseDetails, {
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

  it("should render the course details form with correct data", () => {
    // Check if the component renders correctly with the provided course data
    expect(wrapper.find(".text-center").text()).toContain("Sample Course");
  });

  it("should submit the form and call the editCourse action", async () => {
    // Simulate changes to the form fields
    wrapper.setData({
      title: "Updated Title",
      description: "Updated Description",
      categories: ["Updated Category 1"],
      price: 200,
      discount: 20,
      thumbnail: "updated_thumbnail_url",
      requirements: ["Updated Requirement 1"],
      courseMaterials: [{ name: "Updated Material 1" }],
    });

    // Trigger the form submission
    await wrapper.find("v-form").trigger("submit.prevent");
    const courseId = 1;
    // Check if the editCourse action is called with the updated data
    expect(actions["editCourse"]).toHaveBeenCalledWith(expect.any(Object), {
      courseId,
      updates: {
        title: "Updated Title",
        description: "Updated Description",
        categories: ["Updated Category 1"],
        price: 200,
        discount: 20,
        thumbnail: "updated_thumbnail_url",
        requirements: ["Updated Requirement 1"],
        courseMaterials: [{ name: "Updated Material 1" }],
      },
    });
  });
});
