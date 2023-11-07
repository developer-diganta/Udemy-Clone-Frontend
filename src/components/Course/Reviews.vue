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
        {{ (totalRatings / reviews.length || 0).toFixed(1) }}
        <span class="text-h6 ml-n3">/5</span>
      </div>
      <v-rating
        :model-value="(totalRatings / reviews.length).toFixed(1)"
        color="yellow-darken-3"
        half-increments
        readonly
      ></v-rating>
      <div class="px-3">{{ reviews.length }} ratings</div>
    </div>
    <v-list
      bg-color="transparent"
      class="d-flex flex-column-reverse"
      density="compact"
    >
      <v-list-item v-for="(rating, i) in ratingsGroup" :key="i">
        <v-progress-linear
          :model-value="(rating / reviews.length) * 100"
          class="mx-n5"
          color="yellow-darken-3"
          height="20"
          rounded
        ></v-progress-linear>

        <template v-slot:prepend>
          <span>{{ i + 1 }}</span>
          <v-icon icon="mdi-star" class="mx-3"></v-icon>
        </template>

        <template v-slot:append>
          <div class="rating-values">
            <span class="d-flex justify-end"> {{ rating }} </span>
          </div>
        </template>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <div class="mt-10 text-center">
      <h2 class="mb-5">Leave Your Review</h2>
      <v-form @submit.prevent="submitReview">
        <v-rating
          v-model="selfReview.rating"
          color="yellow-darken-3"
          half-increments
          :item-labels="labels"
          density="compact"
          size="70"
        ></v-rating>

        <v-textarea
          rows="2"
          v-model="selfReview.review"
          label="Your Review"
        ></v-textarea>
        <v-btn type="submit" block class="mt-2" @click="submitReview"
          >Submit</v-btn
        >
      </v-form>

      <v-divider class="mt-5 mb-5"></v-divider>

      <h3>See what others have to say</h3>

      <div v-for="(review, i) in otherReviews" :key="i">
        <review-card :review="review"></review-card>
      </div>
    </div>
  </v-card>
</template>
<script>
import ReviewCard from "@/ui/ReviewCard.vue";
export default {
  components: { ReviewCard },
  props: ["reviews"],
  emits: ["review-submitted"],
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

      labels: ["bad", "so so", "ok", "good", "great"],
      selfReview: {
        rating: 0,
        review: "",
      },
    };
  },
  methods: {
    async submitReview() {
      try {
        await this.$store.dispatch("student/submitReview", {
          rating: this.selfReview.rating,
          review: this.selfReview.review,
          courseId: this.$route.query.courseId,
        });
        this.$emit("review-submitted", this.selfReview);
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    totalRatings() {
      try {
        return (
          this.reviews.reduce((rating, review) => rating + review.rating, 0) ||
          0
        );
      } catch (error) {
        console.log(error);
      }
    },
    otherReviews() {
      return this.reviews.filter(
        (review) => review.reviewer !== this.$store.state.user._id,
      );
    },

    ratingsGroup() {
      const arr = new Array(5).fill(0);
      this.reviews.map((review) => {
        console.log(Math.ceil(review.rating), "{}");
        arr[Math.ceil(review.rating) > 4 ? 4 : Math.ceil(review.rating) - 1]++;
      });
      return arr;
    },
  },
  created() {
    const selfReview = this.reviews.filter(
      (review) => review.reviewer === this.$store.state.user._id,
    );
    if (selfReview.length) {
      this.selfReview = selfReview[0];
    }
  },
};
</script>
<style scoped>
.rating-values {
  width: 25px;
}
</style>
