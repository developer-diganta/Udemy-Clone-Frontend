import { mount } from "@vue/test-utils";
import AdminNavbar from "../../../../src/components/Navbar/AdminNavbar";

describe("AdminNavbar.vue", () => {
  it("renders the navigation drawer and handles route changes", async () => {
    const wrapper = mount(AdminNavbar, {
      global: {
        mocks: {
          $router: {
            push: jest.fn(), // Mock the router's push method
          },
        },
      },
    });

    // Check if the component exists
    expect(wrapper.exists()).toBe(true);

    // Check if the navigation drawer is initially open
    expect(wrapper.vm.drawer).toBe(true);

    // Find and click on the "Courses" link
    await wrapper.find('[title="Courses"]').trigger("click");

    // Check if the router's push method was called with the correct route
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith("/admin/courses");

    // Click on other links and test them similarly
    await wrapper.find('[title="Instructors"]').trigger("click");
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith("/admin/instructors");
  });
});
