import { mount, shallowMount } from "@vue/test-utils";
import Footer from "../../../../src/components/Common/Footer";

describe("Footer", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallowMount(Footer);
  });
  it("renders the component with the correct links and copyright year", () => {
    // Check if the component contains the correct number of links
    const links = wrapper.findAll('[rounded="xl"]');
    expect(links.length).toBe(wrapper.vm.links.length);
    console.log(links);
    // Check if each link in the component matches the expected link text
    links.forEach((linkWrapper, index) => {
      expect(linkWrapper.text()).toBe(wrapper.vm.links[index]);
    });

    // Check if the copyright year is correctly displayed
    const currentYear = new Date().getFullYear();
    expect(wrapper.text()).toContain(
      "HomeAbout UsTeamServicesBlogContact Us2023 — Vuetify",
    );
  });

  it("has rounded buttons", () => {
    // Check if all buttons are rounded
    const buttons = wrapper.findAll('[class="mx-2"]');
    buttons.forEach((buttonWrapper) => {
      expect(buttonWrapper.attributes("rounded")).toBe("xl");
    });
  });

  it("has white text color for buttons", () => {
    // Check if all buttons have white text color
    const buttons = wrapper.findAll('[class="mx-2"]');
    buttons.forEach((buttonWrapper) => {
      expect(buttonWrapper.attributes("color")).toBe("white");
    });
  });

  // Add more test cases as needed
});
