import { shallowMount, mount } from "@vue/test-utils";
import Alert from "@/ui/Alert";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { VDataIterator } from "vuetify/labs/VDataIterator";
import { createStore } from "vuex";
import common from "@/store/modules/common/index.js";
const vuetify = createVuetify({
  components: {
    VDataIterator,
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

describe("Alert.vue", () => {
  let wrapper = shallowMount(Alert, {
    data: () => ({
      alert: false,
    }),
    props: {
      message: "Sample Alert",
      variant: "success",
      title: "Sample Title",
      reset: true,
      color: "green",
    },
  });
  //   "message", "variant", "title", "reset", "color"
  it("checks for alert message", () => {
    const alert = wrapper.get('[close-label="Close Alert"]');
    expect(alert.text()).toContain("Sample Alert");
    const title = alert.attributes("title");
    expect(title).toContain("Sample Title");
    const color = alert.attributes("color");
    expect(color).toContain("green");
    const variant = alert.attributes("variant");
    expect(variant).toContain("success");
  });
  it("checks for reset", async () => {
    wrapper.setData({ alert: false });
    const resetButton = wrapper.get('[data-value="reset"]');
    expect(resetButton.exists()).toBe(true);
  });
});
