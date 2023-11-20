<template>
  <h4>Ask your Question</h4>
  <v-form @submit.prevent="addQuestion">
    <v-text-field
      density="compact"
      v-model="title"
      :rules="rules"
      label="Question Title. Keep it brief and to the point"
    ></v-text-field>

    <v-textarea
      v-model="description"
      clearable
      label="Describe your question in detail"
    ></v-textarea>

    <v-btn type="submit" block class="mt-2">Submit</v-btn>
  </v-form>
</template>
<script>
export default {
  props: ["courseId"],
  emits: ["question-submitted"],
  data() {
    return {
      title: "",
      description: "",
    };
  },
  methods: {
    async addQuestion() {
      try{
        await this.$store.dispatch("addQuestion", {
          title: this.title,
          description: this.description,
          courseId: this.courseId,
        });
        this.title = this.description = "";
        this.$emit("question-submitted");
        this.$store.dispatch("snackbar/showSnackbar", {
          message: "Question Submitted",
          type: "Success",
        });
      }catch(error){
        if(this.title.length===0 || this.description.length===0){
          this.$store.dispatch("snackbar/showSnackbar", {
          message: "Question Can't Be Empty",
          type: "Error",
        });
      }else{
        this.$store.dispatch("snackbar/showSnackbar", {
          message: "We ran into some glitches. Please check again after sometime",
          type: "Error",
        });
      }
    }
  }
  },
};
</script>
<style scoped></style>