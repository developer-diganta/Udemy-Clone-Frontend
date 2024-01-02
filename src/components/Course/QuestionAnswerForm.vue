<template>
  <h4>Ask your Question</h4>
  <v-form @submit.prevent="addQuestion">
    <v-text-field
      density="compact"
      v-model="title"
      :rules="rules"
      label="Question Title. Keep it brief and to the point"
      data-cy="question"
    ></v-text-field>

    <v-textarea
      v-model="description"
      clearable
      data-cy="answer"
      label="Describe your question in detail"
    ></v-textarea>

    <v-btn type="submit" block class="mt-2" data-cy="submitqa">Submit</v-btn>
  </v-form>
</template>
<script>
export default {
  props: ["courseId"],
  emits: ["question-submitted"],
  data() {
    return {
      // Initializing data properties
      title: "",
      description: "",
    };
  },
  methods: {
    /**
     * Adds a question for the course
     */
    async addQuestion() {
      try {
        // Dispatching action to add a question
        await this.$store.dispatch("addQuestion", {
          title: this.title,
          description: this.description,
          courseId: this.courseId,
        });
        // Clearing input fields and emitting 'question-submitted' event
        this.title = this.description = "";
        this.$emit("question-submitted");
        // Showing success message
        this.$store.dispatch("snackbar/showSnackbar", {
          message: "Question Submitted",
          type: "Success",
        });
      } catch (error) {
        // Handling errors during question submission
        if (this.title.length === 0 || this.description.length === 0) {
          // Handling empty question or description
          this.$store.dispatch("snackbar/showSnackbar", {
            message: "Question Can't Be Empty",
            type: "Error",
          });
        } else {
          // Displaying error message for glitches
          this.$store.dispatch("snackbar/showSnackbar", {
            message:
              "We ran into some glitches. Please check again after sometime",
            type: "Error",
          });
        }
      }
    },
  },
};
</script>
<style scoped></style>
