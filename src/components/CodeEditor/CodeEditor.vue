<template>
  <div
    style="margin: 0 auto !important; margin-left: 125px; margin-right: auto"
  >
    <CodeEditor
      z-index="6"
      :languages="[
        ['cpp', 'C++'],
        ['python', 'Python'],
        ['js', 'JS'],
        ['java', 'JAVA'],
      ]"
      :line-nums="true"
      v-model="value"
      border-radius="0px"
      @lang="getLanguage"
      theme="github-dark"
    ></CodeEditor>
    <!-- <v-btn class="bg-primary" style="margin: 10px; width: 10%">Run</v-btn> -->
    <v-btn
      class="bg-primary"
      style="margin: 10px; width: 10%"
      @click="submitCode"
      >Submit</v-btn
    >
    <v-dialog
      v-model="dialog"
      min-width="400"
      persistent
      min-height="400"
      style="min-height: 300px; margin: 0 auto !important"
    >
      <v-card class="p-4" style="padding: 5%">
        <div v-if="loading" class="mx-auto">
          <v-progress-circular
            color="blue-lighten-3"
            class="mx-auto"
            style="left: 30%"
            indeterminate
            :size="53"
          ></v-progress-circular>
          <p class="text-center">Compiling Your Code</p>
        </div>
        <v-card-text v-else>
          <h4 class="text-center">Output:</h4>
          <v-divider></v-divider>
          <p class="text-center">{{ output }}</p>
          <v-divider></v-divider>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false"
            >Close Dialog</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import hljs from "highlight.js";
import CodeEditor from "simple-code-editor";
import { validate } from "vee-validate";
export default {
  components: {
    CodeEditor,
  },
  props: ["questionId", "courseId", "section"],
  data() {
    return {
      value: "",
      language: "nodejs",
      dialog: false,
      loading: false,
      output: "",
    };
  },
  methods: {
    async submitCode() {
      this.loading = true;
      this.dialog = true;
      await this.$store.dispatch("common/submitCode", {
        submission: {
          code: this.value,
          lang: this.language,
        },
        courseId: this.courseId,
        questionId: this.questionId,
        section: this.section,
      });
      this.output = this.$store.state.common.output.output;
      this.result = this.$store.state.common.output.result;
      //if (this.output) {
      //alert("100% AC");
      //} else {
      //alert("WA");
      //}
      this.loading = false;
    },
    getLanguage(lang) {
      switch (lang) {
        case "js":
          this.language = "nodejs";
          break;
        case "python":
          this.language = "python3";
          break;
        case "cpp":
          this.language = "cpp17";
          break;
        case "java":
          this.language = "java";
          break;
      }
    },
  },
};
</script>
<style>
.code-editor {
  height: 300px !important;
}
</style>
