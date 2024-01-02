import { shallowMount } from "@vue/test-utils";
import InstructorProfile from "../../../src/views/instructor/InstructorProfile";
import Vuex from "vuex";

describe("InstructorProfile.vue", () => {
  let wrapper;
  let store;
  let actions;
  let getters;

  beforeEach(() => {
    jest.spyOn(console, "warn").mockImplementation(() => {});

    actions = {
      getInstructorProfile: jest.fn(),
      updateInstructorProfile: jest.fn(),
    };

    getters = {
      currentCourse: () => ({
        title: "Sample Course",
        price: 100,
        discount: 10,
        review: 4.5,
        enrollments: 50,
      }),
    };

    store = new Vuex.Store({
      modules: {
        instructor: {
          namespaced: true,
          actions,
          getters,
          state: {
            profile: {
              instructor: {
                name: "John Doe",
                bio: "Sample Bio",
                profileImage: "sample-image.jpg",
                socialLinks: [
                  { name: "Twitter", link: "https://twitter.com/johndoe" },
                  {
                    name: "LinkedIn",
                    link: "https://www.linkedin.com/in/johndoe",
                  },
                ],
              },
            },
          },
        },
      },
    });

    wrapper = shallowMount(InstructorProfile, {
      data() {
        return { isActive: true };
      },
      global: {
        plugins: [store],
        mocks: {
          $store: store,
        },
      },
    });
  });

  it("renders the component correctly", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("h3").text()).toBe("Your Profile");
  });

  it("loads instructor profile data", () => {
    expect(actions["getInstructorProfile"]).toHaveBeenCalled();
    expect(wrapper.vm.name).toBe("John Doe");
    expect(wrapper.vm.bio).toBe("Sample Bio");
    expect(wrapper.vm.profileImage).toBe("sample-image.jpg");
    expect(wrapper.vm.socialLinks).toEqual([
      { name: "Twitter", link: "https://twitter.com/johndoe" },
      { name: "LinkedIn", link: "https://www.linkedin.com/in/johndoe" },
    ]);
  });

  it("submits form and updates instructor profile", async () => {
    wrapper.setData({
      name: "Updated Name",
      bio: "Updated Bio",
      socialLinks: [
        { name: "Instagram", link: "https://www.instagram.com/johndoe" },
      ],
    });

    await wrapper.vm.submitForm();

    expect(actions["updateInstructorProfile"]).toHaveBeenCalledWith(
      expect.any(Object),
      {
        name: "Updated Name",
        bio: "Updated Bio",
        socialLinks: [
          { name: "Instagram", link: "https://www.instagram.com/johndoe" },
        ],
      },
    );
  });
});
