import StudentProfilePage from "../../../src/views/student/StudentProfilePage.vue";
import { shallowMount } from "@vue/test-utils";
import { createVuetify } from "vuetify/lib/framework.mjs";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import Vuex from "vuex";
const vuetify = createVuetify({
  components: {
    ...components,
  },
  directives,
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primaryTheme: "#008080",
          secondaryCoral: "#6FBEDF",
        },
      },
    },
  },
});

describe("StudentProfilePage.vue", () => {
  let wrapper;
  let store;
  let actions;

  beforeEach(() => {
    actions = {
      getStudentProfile: jest.fn(),
      updateStudentProfile: jest.fn(),
    };
    store = new Vuex.Store({
      modules: {
        student: {
          namespaced: true,
          actions,
          state: {
            profile: {
              name: "John Doe",
              email: "johndoe@example.com",
            },
          },
        },
      },
    });

    wrapper = shallowMount(StudentProfilePage, {
      global: {
        plugins: [store],
        mocks: {
          $vuetify: vuetify.framework,
        },
      },
    });
  });

  it("should render the form and load student profile", () => {
    expect(wrapper.find("v-text-field[label='Name']").exists()).toBe(true);
    expect(wrapper.find("v-text-field[label='email']").exists()).toBe(true);
    expect(wrapper.find("v-btn[type='submit']").exists()).toBe(true);

    expect(wrapper.vm.name).toBe("John Doe");
    expect(wrapper.vm.email).toBe("johndoe@example.com");
  });

  it("should call the getStudentProfile action on created hook", () => {
    expect(actions["getStudentProfile"]).toHaveBeenCalled();
  });

  it("should submit the form and call the updateStudentProfile action", async () => {
    const updatedProfile = {
      name: "New Name",
    };

    wrapper.setData({ name: "New Name" });

    await wrapper.find("v-form").trigger("submit.prevent");

    expect(actions["updateStudentProfile"]).toHaveBeenCalled();
  });
});
