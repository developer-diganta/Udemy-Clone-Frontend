<template>
  <div class="ml-6 p-5 qa" @click="dialog = true">
    <p class="font-weight-bold">{{ questionAnswers.title }}</p>
    <p>By {{ asker }}, {{ dt }}</p>

    <div>
      <v-card-text>
        {{ questionAnswers.description }}
      </v-card-text>
      <div v-if="openReplies">
        <div
          width="500"
          class="m-2 ml-auto mr-auto"
          style="border: 1px solid black"
          v-for="(answer, index) in answers"
          :key="index"
        >
          <v-card-text>
            {{ answer.answer }}
          </v-card-text>
          <v-card-text
            >By {{ answer.answererName }},
            {{ getPeriod(answer.answeredOn) }}</v-card-text
          >
        </div>
      </div>
      <v-form
        @submit.prevent
        v-if="answerFormActivated"
        style="margin-left: 5%; margin-right: 5%"
      >
        <v-textarea v-model="answer" label="Your Answer"></v-textarea>
        <v-btn type="submit" block class="mt-2" @click="submitAnswer"
          >Submit</v-btn
        >
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green-darken-1"
          variant="tonal"
          @click="openReplies = !openReplies"
        >
          <span v-if="!openReplies" data-value="view-replies"
            >View Replies({{ answers.length }})</span
          >
          <span v-if="openReplies" data-value="close-replies">Close</span>
        </v-btn>
        <v-btn
          color="green-darken-1"
          variant="tonal"
          @click="answerFormActivated = true"
          v-if="answerFormActivated === false"
        >
          Answer
        </v-btn>
      </v-card-actions>
    </div>
  </div>
  <v-divider></v-divider>
</template>
<script>
import moment from "moment";
import axios from "axios";
import backend_url from "@/globals/globals";

export default {
  props: ["questionAnswers"],
  emits: ["qa-reloaded"],
  data() {
    return {
      // Data properties initialization
      dt: moment(this.questionAnswers.askedOn).fromNow(),
      dialog: false,
      answer: "",
      answerFormActivated: false,
      openReplies: false,
      asker: "",
      answers: [],
    };
  },
  methods: {
    /**
     * Submits an answer to a question
     */
    async submitAnswer() {
      // Handling submission of an answer
      try {
        // Validating the answer
        if (this.answer.length === 0) {
          this.$store.dispatch("snackbar/showSnackbar", {
            message: "Answer Can't Be Empty",
            type: "Error",
          });
          return;
        }
        // Dispatching action to submit the answer
        const res = await this.$store.dispatch("submitAnswer", {
          answer: this.answer,
          courseId: this.$route.query.courseId,
          questionId: this.questionAnswers._id,
        });
        // Emitting event to reload question and answers data
        this.$emit("qa-reloaded", res.data.questionAnswers);
        this.answerFormActivated = false;
        // Showing success message
        this.$store.dispatch("snackbar/showSnackbar", {
          message: "Answer Submitted",
          type: "Success",
        });
      } catch (error) {
        // Handling errors during answer submission
        if (this.answer.length === 0) {
          this.$store.dispatch("snackbar/showSnackbar", {
            message: "Answer Can't Be Empty",
            type: "Error",
          });
        } else {
          this.$store.dispatch("snackbar/showSnackbar", {
            message:
              "We ran into some glitches. Please check again after sometime",
            type: "Error",
          });
        }
      }
    },
    /**
     * Retrieves the name of the questioner
     * @returns {String} - Name of the questioner
     */
    async getQuestionerName() {
      const res = await axios.get(
        `${backend_url}/student/name?id=${this.questionAnswers.askedBy}`,
      );
      return res.data;
    },
    /**
     * Calculates the period from a given time
     * @param {Date} time - Time to calculate the period from
     * @returns {String} - Period from the given time
     */
    getPeriod(time) {
      return moment(time).fromNow();
    },
  },
  watch: {
    /**
     * Listens for changes in 'dialog' and deactivates 'answerFormActivated' when 'dialog' becomes false
     */
    dialog() {
      if (this.dialog === false) this.answerFormActivated = false;
    },
  },
  computed: {},
  /**
   * Executes when the component is created
   */
  async created() {
    // Retrieves the name of the questioner and initializes 'answers'
    this.asker = await this.getQuestionerName();
    this.answers = this.questionAnswers.answers;
    // Retrieves answerer names for each answer
    for (var i = 0; i < this.answers.length; i++) {
      this.answers[i].answererName = await this.getQuestionerName(
        this.answers[i].answerer,
      );
    }
  },
};
</script>
<style>
.qa {
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
}
</style>
