<template>
  <v-card
    class="d-flex flex-column mx-auto py-8"
    elevation="10"
    height="auto"
    width="auto"
  >
    <div class="d-flex justify-center mt-auto text-h5">Rating overview</div>

    <div class="d-flex align-center flex-column my-auto">
      <div class="text-h2 mt-5">
        {{ (totalRatings / reviewss.length).toFixed(1) }}
        <span class="text-h6 ml-n3">/5</span>
      </div>

      <v-rating
        :model-value="(totalRatings / reviewss.length).toFixed(1)"
        color="yellow-darken-3"
        half-increments
        readonly
      ></v-rating>
      <div class="px-3">{{ reviewss.length }} ratings</div>
    </div>

    <v-list
      bg-color="transparent"
      class="d-flex flex-column-reverse"
      density="compact"
    >
      <v-list-item v-for="(rating, i) in 5" :key="i">
        <v-progress-linear
          :model-value="rating * 15"
          class="mx-n5"
          color="yellow-darken-3"
          height="20"
          rounded
        ></v-progress-linear>

        <template v-slot:prepend>
          <span>{{ rating }}</span>
          <v-icon icon="mdi-star" class="mx-3"></v-icon>
        </template>

        <template v-slot:append>
          <div class="rating-values">
            <span class="d-flex justify-end"> {{ rating * 224 }} </span>
          </div>
        </template>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <div class="mt-10 text-center">
      <h2 class="mb-5">Leave Your Review</h2>
      <v-form @submit.prevent="submitReview">
        <v-rating
          v-model="givenRating"
          color="yellow-darken-3"
          half-increments
          :item-labels="labels"
          density="compact"
          size="70"
        ></v-rating>

        <v-textarea
          rows="2"
          v-model="personalReview"
          label="Your Review"
        ></v-textarea>
        <v-btn type="submit" block class="mt-2" @click="submitReview"
          >Submit</v-btn
        >
      </v-form>
    </div>
  </v-card>
</template>
<script>
export default {
  props: ["reviews"],
  data() {
    return {
      reviewss: [
        {
          rating: 4,
        },
        {
          rating: 3,
        },
      ],
      givenRating: 0,
      personalReview: "",

      labels: ["bad", "so so", "ok", "good", "great"],
    };
  },
  methods: {
    async submitReview() {
      try {
        await this.$store.dispatch("submitReview", {
          rating: this.givenRating,
          review: this.personalReview,
          courseId: this.$route.query.courseId,
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    totalRatings() {
      return this.reviewss.reduce(
        (rating, review) => rating + review.rating,
        0,
      );
    },
  },
};
</script>
<style scoped>
.rating-values {
  width: 25px;
}
</style>
