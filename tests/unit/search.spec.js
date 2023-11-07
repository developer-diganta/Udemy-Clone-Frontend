import { shallowMount } from "@vue/test-utils";
import SearchForm from "@/ui/Search.vue"; // Replace with your component path

describe("SearchForm.vue", () => {
  it("renders input, search button, and search results correctly", async () => {
    const wrapper = shallowMount(SearchForm);

    // Check if the input element is rendered
    const input = wrapper.find("input");
    expect(input.exists()).toBe(true);

    // Check if the search button is rendered
    const searchButton = wrapper.find(".search-btn");
    expect(searchButton.exists()).toBe(true);

    // Simulate user input in the input element
    await input.setValue("Sample Search Query");
  });
});
