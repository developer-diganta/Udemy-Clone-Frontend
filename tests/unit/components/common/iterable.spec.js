import { mount, shallowMount } from "@vue/test-utils";
import Iterable from "../../../../src/components/Common/Iterable";

// Helper function to create a shallow wrapper
const createWrapper = (propsData) => {
  return shallowMount(Iterable, {
    props: {
      items: ["abc"], // Provide your items data here
      itemsPerPage: 5,
      ...propsData,
      type: propsData.type,
    },
  });
};
jest.spyOn(console, "warn").mockImplementation(() => {});

describe("Iterable", () => {
  it('renders the component with the correct elements when type is "qa"', () => {
    const wrapper = createWrapper({ type: "qa" });

    // Check if the appropriate elements are present when type is "qa"
    expect(wrapper.find(".iterable-buttons").exists()).toBe(true);
    console.log(wrapper.find('[data-value="qa"]'));
    expect(wrapper.find('[data-value="qa"]').exists()).toBe(true);
  });

  it('renders the component with the correct elements when type is "search"', () => {
    const wrapper = createWrapper({ type: "search" });

    // Check if the appropriate elements are present when type is "search"
    expect(wrapper.find(".iterable-buttons").exists()).toBe(true);
    expect(wrapper.find('[data-value="search"]').exists()).toBe(true);
  });

  it("correctly sorts items when sorting is invoked", () => {
    const wrapper = createWrapper({ type: "qa" });

    // Set up initial items
    wrapper.setData({
      itemsCopy: [{ askedOn: "2023-01-01" }, { askedOn: "2022-01-01" }],
    });

    // Invoke sorting
    wrapper.vm.sortItems(1, "askedOn");

    // Check if the items are sorted in ascending order
    expect(wrapper.vm.itemsCopy[0].askedOn).toBe("2022-01-01");
    expect(wrapper.vm.itemsCopy[1].askedOn).toBe("2023-01-01");
  });

  // Add more test cases to cover your component's functionality
});
