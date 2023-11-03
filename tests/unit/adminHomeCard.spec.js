import { shallowMount, mount } from "@vue/test-utils";
import AdminHomeCard from "@/ui/AdminHomeCard";
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

describe("AdminHomeCard.vue", () => {
  let wrapper = shallowMount(AdminHomeCard, {
    props:{
        cardTitle:"Sample Card",
        cardData:"Sample Card Data"
    }
  });
  it("checks for card title",()=>{
      const title = wrapper.get('[class="text-h6 mb-1"]')
      expect(title.text()).toContain('Sample Card')
  })
  it("checks for card data", ()=> {
    const data = wrapper.get('[class="text-subtitle"')
    expect(data.text().toContain("Sample Card Data"))
  })

});
