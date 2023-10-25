<template>
  <div class="ml-6 p-5 qa" @click="dialog = true">
    <p class="font-weight-bold">{{ questionAnswers.title }}</p>
    <p>
      {{
        questionAnswers.description.length > 100
          ? questionAnswers.description.substring(0, 100) + "..."
          : questionAnswers.description
      }}
    </p>
    <p>By {{ questionAnswers.askedBy }}, {{ dt }}</p>
  </div>
  <v-divider></v-divider>
  <v-dialog v-model="dialog" width="auto">
    <v-card>
      <v-card-title>{{ questionAnswers.title }}</v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        {{ questionAnswers.description }}
      </v-card-text>
      <v-card
        width="500"
        class="m-2 ml-auto mr-auto"
        v-for="(answer, index) in questionAnswers.answers"
        :key="index"
      >
        <v-card-text>
          {{ answer.answer }}
        </v-card-text>
        <v-card-text
          >By {{ answer.answerer }},
          {{ getPeriod(answer.answeredOn) }}</v-card-text
        >
      </v-card>
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
          variant="text"
          @click="answerFormActivated = true"
          v-if="answerFormActivated === false"
        >
          <!-- @click="dialog = false" -->
          Answer
        </v-btn>
        <v-btn color="green-darken-1" variant="text" @click="dialog = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import moment from "moment";

export default {
  props: ["questionAnswers"],
  data() {
    return {
      dt: moment(this.questionAnswers.askedOn).fromNow(),
      dialog: false,
      answer: "",
      answerFormActivated: false,
    };
  },
  methods: {
    async submitAnswer() {
      const res = await this.$store.dispatch("submitAnswer", {
        answer: this.answer,
        courseId: this.$route.query.courseId,
        questionId: this.questionAnswers._id,
      });
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
};
</script>
<style>
.qa {
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
}
.qa:hover {
  background-color: rgb(224, 224, 224);
}
</style>
