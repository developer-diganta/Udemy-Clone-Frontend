<template lang="">
  <div>
    <v-snackbar v-model="snackbar" timeout="2000" color="secondaryCoral">
      <p class="text-center text-white" style="font-weight: 700">
        <v-icon style="color: green">mdi-check-circle</v-icon>{{ message }}
      </p>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  props: ["message", "visibility"],
  data() {
    return {
      snackbar: false,
    };
  },
  created() {
    this.snackbar = this.visibility;
  },
};
</script>
<style lang=""></style>
