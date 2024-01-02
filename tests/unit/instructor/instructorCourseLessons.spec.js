import CourseDetails from "../../../src/views/instructor/InstructorCourseLessons";
import { shallowMount } from "@vue/test-utils";
import Vuex from "vuex";

describe("CourseDetails.vue", () => {
  let wrapper;
  const mockRoute = {
    params: {
      id: 1,
    },
  };
  const actions = {
    instructorCourseViewOne: jest.fn(),
    editCourse: jest.fn(),
  };

  beforeEach(() => {
    // Create a mock store instance
    const store = new Vuex.Store({
      modules: {
        instructor: {
          namespaced: true,

          actions,
        },
      },
    });
    wrapper = shallowMount(CourseDetails, {
      data() {
        return {
          course: {
            title: "Sample Course",
            description: "Sample description",
            price: 100,
            lessons: [
              {
                title: "Lesson 1",
                videos: [
                  {
                    title: "Video 1",
                    videoLink: "video_link_1",
                  },
                ],
              },
              {
                title: "Lesson 2",
                videos: [
                  {
                    title: "Video 2",
                    videoLink: "video_link_2",
                  },
                ],
              },
            ],
          },
          sectionsList: [
            { index: 0, title: "Section 1" },
            { index: 1, title: "Section 2" },
          ],
          videosList: [
            { i: 0, j: 0, video: { title: "Video 1" } },
            { i: 1, j: 0, video: { title: "Video 2" } },
          ],
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

  it("should render the course title", () => {
    expect(wrapper.find(".text-center").text()).toContain(
      "(Edit Mode: Instructor)",
    );
  });

  it("should delete a video", async () => {
    // Simulate clicking on delete for a video
    await wrapper.vm.deleteVideo(0, 0);

    // Assert the expected behavior after deleting
    expect(wrapper.vm.alertSuccess).toBe(true);
    expect(wrapper.vm.successMessage).toBe("Video Deleted");
    expect(wrapper.vm.initialLoad).toBeTruthy(); // Initial load should be called
    expect(wrapper.vm.resetForm).toBeTruthy(); // Reset form should be called
  });
});
