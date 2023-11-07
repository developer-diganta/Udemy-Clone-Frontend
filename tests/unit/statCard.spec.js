import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import StatCard from "@/ui/StatCard.vue"; // Replace with your component path

describe("StatCard.vue", () => {
  it("renders the component with the provided props", () => {
    const stats = [
      { _id: 1, title: "Course 1" },
      { _id: 2, title: "Course 2" },
    ];
    const title = "Trending Courses";
    const mockRouter = {
      push: jest.fn(),
    };

    const wrapper = shallowMount(StatCard, {
      propsData: {
        stats,
        title,
      },
      mocks: {
        $router: mockRouter,
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });

    const titleElement = wrapper.find('[prepend-icon="mdi-arrow-top-right"]');
    expect(titleElement.text()).toBe("Course 1Course 2");

    const statElements = wrapper.findAll(".trending-course-list");
    expect(statElements.length).toBe(stats.length);
    stats.forEach((stat, index) => {
      expect(statElements.at(index).text()).toBe(stat.title);
    });
  });

  //   it("navigates to the correct course when a stat item is clicked", async () => {

  //     const courseId = 1;
  //     const $router = {
  //       push: jest.fn(),
  //     };

  //     const wrapper = shallowMount(StatCard, {
  //       propsData: {
  //         stats: [{ _id: courseId, title: "Course 1" }],
  //         title: "Trending Courses",
  //       },
  //       mocks: {
  //         $router,
  //       },
  //       stubs: {
  //         RouterLink: RouterLinkStub,
  //       },
  //     });

  //     const listItem = wrapper.find("li");

  //     await listItem.trigger("click");

  //     expect($router.push).toHaveBeenCalledWith(`/instructor/course/view/${courseId}`);
  //   });
});
