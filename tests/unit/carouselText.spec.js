import { shallowMount, mount } from "@vue/test-utils";
import CarouselText from "@/ui/CarouselText";
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

describe("CarouselText.vue", () => {
  let wrapper = shallowMount(CarouselText, {
    props: {
      text: "Sample Text",
      subtext: "Sample Subtext",
    },
  });
  it("carousel text and subtext", () => {
    const text = wrapper.get('[class="d-none d-lg-block text-h2 font-weight-black"]');
    expect(text.text()).toContain("Sample Text");
    const subtext = wrapper.get('[class="text-body"]');
    expect(subtext.text()).toContain("Sample Subtext");
  });
});
