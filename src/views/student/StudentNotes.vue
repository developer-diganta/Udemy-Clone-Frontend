<template>
  <v-sheet width="300" class="mx-auto">
    <v-form fast-fail @submit.prevent="submit">
      <v-text-field v-model="header" label="Heading"></v-text-field>

      <v-textarea v-model="description" label="Description"></v-textarea>

      <v-btn type="submit" block class="mt-2">Submit</v-btn>
    </v-form>
  </v-sheet>
</template>
<script>
export default {
  props: ["course"],
  data: () => ({
    header: "",
    description: "",
  }),
  methods: {
    async submit() {
      await this.$store.dispatch("student/submitnote", {
        header: this.header,
        description: this.description,
        courseId: this.course,
      });
    },
  },
};
</script>
