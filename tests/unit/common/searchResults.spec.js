import { shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import SearchResults from "../../../src/views/common/SearchResultsPage";

describe("SearchResultsPage.vue", () => {
  let wrapper;
  let store;
  let actions;
  let state;

  beforeEach(() => {
    jest.spyOn(console, "warn").mockImplementation(() => {});

    state = {
      user: {
        type: "student", // Change this to the appropriate user type
      },
    };

    actions = {
      searchResultsFromAPI: jest.fn(),
    };

    store = new Vuex.Store({
      state,
      actions,
      modules: {
        student: {
          namespaced: true,
          actions,
          state: {
            searchResults: [
              { item: { id: 1, name: "Course 1" } },
              { item: { id: 2, name: "Course 2" } },
            ],
          },
        },
      },
    });

    wrapper = shallowMount(SearchResults, {
      global: {
        plugins: [store],
        mocks: {
          $route: {
            query: {
              searchQuery: "example", // Set your desired search query
            },
          },
        },
      },
    });
  });

  it("renders the component correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("fetches search results and displays them", async () => {
    expect(wrapper.vm.loading).toBe(false);
    expect(wrapper.vm.searchQuery).toBe("example"); // Check if searchQuery is set correctly
    expect(actions["searchResultsFromAPI"]).toHaveBeenCalledWith(
      expect.any(Object),
      "example",
    );
    expect(wrapper.vm.searchResults).toEqual([
      { id: 1, name: "Course 1" },
      { id: 2, name: "Course 2" },
    ]);
  });

  // Add more test cases as needed
});
