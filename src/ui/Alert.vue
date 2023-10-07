<template>
  <div>
    <v-alert
      v-model="alert"
      border="start"
      :variant="variant"
      closable
      close-label="Close Alert"
      :color="color"
      :title="title"
    >
      {{ message }}
    </v-alert>

    <div v-if="!alert" class="text-center">
      <v-btn v-if="reset" @click="alert = true"> Reset </v-btn>
    </div>
  </div>
</template>
  <script>
export default {
  data: () => ({
    alert: true,
  }),
  props: ["message", "variant", "title", "reset", "color"],
};
</script>