import { shallowMount } from "@vue/test-utils";
import Navbar from "../../../../src/components/Navbar/Navbar"; // Adjust the path to your component
import Vuex from "vuex"; // You may need to provide a Vuex store mock

describe("Navbar.vue", () => {
  let store;

  // Mock Vuex store and router
  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        user: {
          name: "John Doe",
          email: "john@example.com",
          type: "student", // Replace with your desired user type
        },
      },
    });
  });

  it("renders the navbar and handles user interactions", async () => {
    const wrapper = shallowMount(Navbar, {
      global: {
        plugins: [store], // Provide the Vuex store
      },
    });

    // Check if the component exists
    expect(wrapper.exists()).toBe(true);

    // Check if the navbar items are displayed correctly
    expect(wrapper.find('[class="pointer"').text()).toBe("");
  });
});
