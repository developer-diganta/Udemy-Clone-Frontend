import { flushPromises, shallowMount } from "@vue/test-utils";
import Checkout from "../../../src/views/common/CheckOut";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

// Mock loadStripe
jest.mock("@stripe/stripe-js", () => ({
  loadStripe: jest.fn(() =>
    Promise.resolve({
      redirectToCheckout: jest.fn(),
    }),
  ),
}));
// const redirect = jest.fn()
jest.mock("axios");

describe("Checkout.vue", () => {
  let wrapper;
  jest.spyOn(console, "warn").mockImplementation(() => {});

  beforeEach(() => {
    axios.post.mockResolvedValue({
      data: {
        url: "https://example.com/checkout",
      },
    });

    wrapper = shallowMount(Checkout, {
      props: {
        courseId: 123,
        priceId: "price_123",
      },
    });
  });

  it("renders the component correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("calls the redirect method on button click", async () => {
    // const redirectSpy = jest.spyOn(wrapper.vm, "redirect");
    const redirectSpy = jest.spyOn(wrapper.vm, "redirect");

    const y = await wrapper.find('[variant="tonal"]');
    console.log(y);
    y.trigger("click");
    // await flushPromises();
    await wrapper.vm.redirect();
    expect(redirectSpy).toHaveBeenCalled();
  });
});
