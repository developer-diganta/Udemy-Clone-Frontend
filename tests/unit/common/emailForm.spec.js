import { shallowMount } from "@vue/test-utils";
import EmailForm from "../../../src/views/common/EmailForm";

describe("EmailForm.vue", () => {
  let wrapper;
  const mockRoute = {
    params: {
      id: 1,
    },
  };
  beforeEach(() => {
    jest.spyOn(console, "warn").mockImplementation(() => {});

    wrapper = shallowMount(EmailForm, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: {
            push: jest.fn(),
          },
          $store: {
            dispatch: jest.fn((action, payload) => {
              if (action === "otpValidate" && payload.otp === "123456") {
                return Promise.resolve({
                  headers: {
                    authorization: "Bearer token123",
                  },
                  data: {
                    _id: "user123",
                  },
                });
              }
            }),
          },
        },
      },
      data() {
        return {
          otpSent: true, // Simulate OTP sent
          otp: "",
          type: "instructor",
          email: "test@example.com", // Set your desired email
          otpValidationError: false,
          otpValidationSuccess: false,
        };
      },
    });
  });

  it("renders the component correctly", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("h3").text()).toBe(
      "OTP Has Been Sent To Your email address! Please enter your OTP to continue",
    );
  });

  it("calls the otpValidate method on form submit with valid OTP", async () => {
    const otpValidateSpy = jest.spyOn(wrapper.vm, "otpValidate");

    const submitForm = jest.spyOn(wrapper.vm, "otpValidate");
    wrapper.setData({ otp: "123456" }); // Set a valid OTP

    await wrapper.find('[ data-value="form"]').trigger("submit.prevent");
    await wrapper.vm.otpValidate();

    expect(otpValidateSpy).toHaveBeenCalled();
    expect(wrapper.vm.otpValidationSuccess).toBe(true);
    expect(localStorage.getItem("otpValidation")).toBe("1");
  });

  it("shows an error message for an invalid OTP", async () => {
    const otpValidateSpy = jest.spyOn(wrapper.vm, "otpValidate");

    wrapper.setData({ otp: "invalidOTP" }); // Set an invalid OTP

    await wrapper.find('[ data-value="form"]').trigger("submit.prevent");
    await wrapper.vm.otpValidate();
    expect(otpValidateSpy).toHaveBeenCalled();

    expect(wrapper.vm.otpValidationError).toBe(true);
  });
});
