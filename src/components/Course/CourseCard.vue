<template>
  <v-card max-width="310">
    <v-img :src="course.thumbnail" height="150px" cover> </v-img>

    <v-card-title>
      <v-tooltip :text="course.title">
        <template v-slot:activator="{ props }">
          <span v-bind="props">{{ course.title }}</span>
        </template>
      </v-tooltip>
    </v-card-title>

    <v-card-subtitle>
      {{ course.instructorName }}
    </v-card-subtitle>

    <v-rating
      :length="5"
      :size="32"
      :model-value="ratings"
      readonly
      half-increments
      active-color="primaryTheme"
      color="primaryTheme"
    />
    <v-card-text style="margin-top: -15px"
      >{{ course.enrollments }} learners</v-card-text
    >
    <v-card-text style="margin-top: -15px">₹ {{ course.price }} </v-card-text>
    <v-card-actions style="margin-top: -15px">
      <v-btn
        v-if="type === 'all'"
        color="primaryTheme"
        variant="tonal"
        @click="enroll"
      >
        Check Course
      </v-btn>

      <v-btn
        v-if="type === 'enrolled'"
        color="primaryTheme"
        variant="tonal"
        @click="goToCourse"
      >
        Go To Course
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="show = !show"
      ></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{ course.description }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>
<script>
export default {
  props: ["course", "type"],
  mounted() {
    console.log(this.course);
  },
  data: () => ({
    show: false,
    ratings: 0,
  }),
  methods: {
    enroll() {
      this.$router.push(`/student/enroll/${this.course._id}`);
    },
    goToCourse() {
      this.$router.push(`/student/learn?courseId=${this.course._id}`);
    },
    ratingsCalculated() {
      if (this.course.reviews) {
        return (
          this.course.reviews.reduce(
            (total, review) => total + review.rating,
            0,
          ) / this.course.reviews.length
        );
      } else return 0;
    },
  },
  created() {
    this.ratings = this.ratingsCalculated();
  },
};
</script>
<style scoped></style>
