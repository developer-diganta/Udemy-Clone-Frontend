<template>
  <v-layout class="layout">
    <v-footer class="footer">
      <v-row justify="center" no-gutters>
        <v-btn
          v-for="link in links"
          :key="link"
          color="white"
          variant="text"
          class="mx-2"
          rounded="xl"
        >
          {{ $t(link) }}
        </v-btn>
        <v-col class="text-center mt-4" cols="12">
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-col>
      </v-row>
      <div class="mx-auto d-block">
        <div class="custom-select">
          <select data-cy="lang" v-model="$i18n.locale">
            <option
              v-for="locale in $i18n.availableLocales"
              :key="`locale-${locale}`"
              :value="locale"
            >
              {{ locale }}
            </option>
          </select>
        </div>
      </div>
    </v-footer>
  </v-layout>
</template>
<script>
export default {
  data: () => ({
    links: ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"],
  }),
};
</script>
<style scoped>
.footer {
  background: #6fbedf;
  padding-top: 5%;
  width: 100%;

  bottom: 0;
}
.layout {
  bottom: 0;
  margin-top: auto !important;
  height: 100%;
}

/* Base styles for the custom select */
.custom-select {
  position: relative;
  padding: 10px;
  margin: 20px;
}

.custom-select select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 100%;
  padding: 5px;
  margin-right: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  background-color: white;
}

/* Arrow icon */
.custom-select::after {
  content: "\25BC"; /* Unicode for down arrow */
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;
}

/* Hover effect */
.custom-select:hover select {
  border-color: #999;
}
</style>
