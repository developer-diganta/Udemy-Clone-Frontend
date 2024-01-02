<template>
  <div>
    <v-snackbar
      v-model="snackbar.visible"
      timeout="2000"
      color="secondaryCoral"
    >
      <p class="text-center text-white" style="font-weight: 700">
        <v-icon v-if="snackbar.type === 'Error'" style="color: red"
          >mdi-close-circle</v-icon
        >
        <v-icon v-else style="color: green">mdi-check-circle</v-icon>
        {{ snackbar.message }}
      </p>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("snackbar", ["snackbar"]),
  },
  created() {},
};
</script>
