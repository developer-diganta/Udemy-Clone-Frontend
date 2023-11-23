import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { VDataIterator } from "vuetify/labs/VDataIterator";
import { createI18n } from 'vue-i18n'
// import messages from "../src/utils/i18/messages"
import en from './utils/i18/en.json';
import es from './utils/i18/es.json';
import ne from './utils/i18/ne.json';
import bn from './utils/i18/bn.json';
import hi from './utils/i18/hi.json';
import cy from './utils/i18/cy.json';
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


const messages = {
  English:en,
  Bengali: bn,
  Hindi: hi,

};

const i18n = createI18n({
  locale: 'English', // set locale
  fallbackLocale: 'Hindi', // set fallback locale
  messages,
})

createApp(App).use(i18n).use(store).use(router).use(vuetify).mount("#app");
