<template>
  <div class="ml-6 p-5 qa" @click="dialog = true">
    <p class="font-weight-bold">{{ questionAnswers.title }}</p>
    <!-- <p>
      {{
        questionAnswers.description.length > 100
          ? questionAnswers.description.substring(0, 100) + "..."
          : questionAnswers.description
      }}
    </p> -->
    <p>By {{ asker }}, {{ dt }}</p>

    <div>
      <!-- <v-card-title>{{ questionAnswers.title }}</v-card-title>
      <v-divider></v-divider> -->

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
          <!-- @click="dialog = false" -->
          Answer
        </v-btn>
        <!-- <v-btn color="green-darken-1" variant="text" @click="dialog = false">
          Close
        </v-btn> -->
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
    async submitAnswer() {
      try {
        if (this.answer.length === 0) {
          this.$store.dispatch("snackbar/showSnackbar", {
            message: "Answer Can't Be Empty",
            type: "Error",
          });
          return;
        }
        const res = await this.$store.dispatch("submitAnswer", {
          answer: this.answer,
          courseId: this.$route.query.courseId,
          questionId: this.questionAnswers._id,
        });
        console.log("UPDATE", res.data);
        this.$emit("qa-reloaded", res.data.questionAnswers);
        this.answerFormActivated = false;
        this.$store.dispatch("snackbar/showSnackbar", {
          message: "Answer Submitted",
          type: "Success",
        });
      } catch (error) {
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
    async getQuestionerName() {
      const res = await axios.get(
        `${backend_url}/student/name?id=${this.questionAnswers.askedBy}`,
      );
      return res.data;
    },
    getPeriod(time) {
      return moment(time).fromNow();
    },
  },
  watch: {
    dialog() {
      if (this.dialog === false) this.answerFormActivated = false;
    },
  },
  computed: {},
  async created() {
    this.asker = await this.getQuestionerName();
    this.answers = this.questionAnswers.answers;
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
