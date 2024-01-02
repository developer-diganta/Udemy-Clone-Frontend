<template>
  <div class="center-absolute d-flex flex-column align-center">
    <v-progress-circular
      :size="70"
      :width="7"
      color="secondaryCoral"
      indeterminate
    ></v-progress-circular>
    <p class="text-align:center">{{ message }}</p>
  </div>
</template>
<script>
export default {
  props: ["message"],
  data() {
    return {};
  },
};
</script>
<style></style>
