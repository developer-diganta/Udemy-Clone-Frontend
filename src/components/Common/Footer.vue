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
          {{ link }}
        </v-btn>
        <v-col class="text-center mt-4" cols="12">
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-col>
      </v-row>
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
  background: #008080;
  padding-top: 5%;
  width: 100%;

  bottom: 0;
}
.layout {
  bottom: 0;
  margin-top: auto !important;
  height: 100%;
}
</style>
