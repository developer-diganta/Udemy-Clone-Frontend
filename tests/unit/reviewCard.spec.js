import { shallowMount, mount } from "@vue/test-utils";
import ReviewCard from "@/ui/ReviewCard";
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

describe("ReviewCard.vue", () => {
  let wrapper = shallowMount(ReviewCard, {
    props:{
        review:{
            rating:5,
            review:"Good",
            reviewer:"Sample",
            createdOn:"2023-11-03T06:36:04.912+00:00"
        },
    }
  });
  it("carousel text and subtext",()=>{
      const reviewer = wrapper.get('[data-value="reviewer"]')
      expect(reviewer.text()).toContain('Sample')
  })

});
