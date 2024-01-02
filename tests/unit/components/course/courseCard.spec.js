import { mount } from "@vue/test-utils";
import CourseCard from "../../../../src/components/Course/CourseCard";

describe("CourseCard.vue", () => {
  jest.spyOn(console, "warn").mockImplementation(() => {});

  it("renders course information correctly", () => {
    const course = {
      _id: "course123",
      thumbnail: "course-thumbnail-url",
      title: "Sample Course",
      instructorName: "John Doe",
      rating: 4.5,
      enrollments: 100,
      description: "This is a sample course description.",
    };
    const wrapper = mount(CourseCard, {
      props: {
        course,
        type: "all",
      },
    });

    expect(wrapper.text()).toContain(
      "John Doe100 learners₹  Check Course This is a sample course description.",
    );
  });

  it("enroll button click navigates to the correct route", () => {
    const course = {
      _id: "course123",
    };
    const wrapper = mount(CourseCard, {
      props: {
        course,
        type: "all",
      },
      global: {
        mocks: {
          $router: {
            push: jest.fn(),
          },
        },
      },
    });
    wrapper.find("v-btn").trigger("click");

    // Assert that the router was called with the correct route
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(
      `/student/enroll/${course._id}`,
    );
  });
});
