import { shallowMount, mount } from "@vue/test-utils";
import Loader from "@/ui/Loader";
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

describe("Loader.vue", () => {
  let wrapper = shallowMount(Loader, {
    props: {
      message: "Sample Message",
    },
  });
  it("carousel text and subtext", () => {
    const message = wrapper.get('[class="text-align:center"]');
    expect(message.text()).toContain("Sample Message");
  });
});
