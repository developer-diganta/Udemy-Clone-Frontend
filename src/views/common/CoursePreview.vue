<template>
  <v-sheet
    elevation="12"
    max-width="600"
    rounded="lg"
    width="100%"
    class="pa-4 text-center mx-auto paymentFailure"
    v-if="failureMessage"
  >
    <v-icon
      class="mb-5"
      color="error"
      icon="mdi-close-circle"
      size="112"
    ></v-icon>

    <h2 class="text-h5 mb-6">Payment Failed!</h2>

    <p class="mb-4 text-medium-emphasis text-body-2">
      Oops! An error occurred during the transaction. In case any funds were
      deducted, it would be refunded within 72 hours.
    </p>

    <v-divider class="mb-4"></v-divider>

    <div class="text-end">
      <v-btn
        class="text-none"
        color="error"
        rounded
        variant="flat"
        width="90"
        @click="hideFailure"
      >
        Close
      </v-btn>
    </div>
  </v-sheet>
  <v-row class="container-secondary">
    <v-col cols="12" md="8" v-if="currentVideo">
      <div class="mt-3">
        <video-player :currentVideo="currentVideo?.videoLink"></video-player>
      </div>
      <h2>{{ currentVideo?.title }} (Preview)</h2>

      <p class="text-h6 mt-4">Course Curriculam</p>

      <v-list
        v-for="(lesson, index) in course.lessons"
        :key="index"
        :class="`elevation-${2}`"
        density="compact"
      >
        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              :title="index + 1 + '. ' + lesson.title"
            ></v-list-item>
          </template>

          <v-list-item
            v-for="(video, i) in lesson.videos"
            :key="i"
            :title="i + 1 + '. ' + video.title"
            :prepend-icon="icon"
            :value="video.title"
          ></v-list-item>
        </v-list-group>
      </v-list>
    </v-col>
    <v-col cols="12" md="8" v-else>
      <h3 class="">NO VIDEOS/LESSON CONTENT AVAILABLE</h3>
    </v-col>
    <v-col cols="12" md="4">
      <v-card :loading="loading" class="mx-auto my-4" max-width="374">
        <template v-slot:loader="{ isActive }">
          <v-progress-linear
            :active="isActive"
            color="deep-purple"
            height="4"
            indeterminate
          ></v-progress-linear>
        </template>

        <v-img cover height="250" :src="course.thumbnail"></v-img>

        <v-card-item>
          <v-card-title>{{ course.title }}</v-card-title>

          <v-card-subtitle>
            <span class="me-1">{{ instructor.name }}</span>

            <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
          </v-card-subtitle>
        </v-card-item>

        <v-card-text>
          <v-row align="center" class="mx-0">
            <v-rating
              :model-value="course.rating"
              color="amber"
              density="compact"
              half-increments
              readonly
              size="small"
            ></v-rating>

            <div class="text-grey ms-4">
              {{ course.rating }} ({{ course.enrollments }} learners)
            </div>
          </v-row>

          <div class="my-4 text-subtitle-1">
            <div v-if="!course.discount" class="font-weight-black">
              ₹ {{ course.price }}
            </div>
            <div v-else>
              <span class="font-weight-black">₹ {{ currentPrice + " " }} </span
              ><span class="text-decoration-line-through">
                {{ course.price }}</span
              >{{ " (" + this.course.discount + "%)" }}
            </div>

            <div>{{ course.description }}</div>
          </div>
        </v-card-text>

        <v-divider class=""></v-divider>

        <v-card-title>Categories</v-card-title>

        <div class="px-4">
          <v-chip-group>
            <v-chip
              v-for="(category, index) in course.categories"
              :key="index"
              >{{ category }}</v-chip
            >
          </v-chip-group>
        </div>
        <v-card-actions v-if="$store.state.user.type === 'student'">
          <check-out
            :courseId="course._id"
            :priceId="course.stripePriceId"
          ></check-out>
        </v-card-actions>
        <v-card-actions v-if="$store.state.user._id === instructor._id">
          <v-btn
            variant="tonal"
            color="primaryTheme"
            prepend-icon="mdi-pencil"
            @click="$router.push(`/instructor/course/view/${course._id}`)"
            >Edit</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import Navbar from "@/components/Navbar/Navbar.vue";
import VideoPlayer from "@/components/Video/VideoPlayer.vue";
import CheckOut from "../common/CheckOut.vue";
export default {
  components: { Navbar, VideoPlayer, CheckOut },
  data() {
    return {
      course: {},
      loading: false,
      selection: 1,
      instructor: {},
      currentVideo: {},
      stripe: null,
      failureMessage: false,
      insId: "",
    };
  },
  methods: {
    hideFailure() {
      this.failureMessage = false;
    },
    async getCourse() {
      await this.$store.dispatch("common/fetchSingleCourse", {
        courseId: this.$route.params.id,
      });

      return this.$store.state.common.singleCourse;
    },
  },
  computed: {
    currentPrice() {
      return (
        this.course.price -
        ((this.course.price / 100) * this.course.discount).toFixed(2)
      );
    },
  },
  async created() {
    this.course = await this.getCourse();
    this.instructor = this.course.instructor;
    this.currentVideo = this.course.lessons[0]?.videos[0];
    if (this.$route.query.payment === "failed") {
      this.failureMessage = true;
    }
  },
};
</script>
<style scoped>
.paymentFailure {
  position: absolute;
  z-index: 99999;
  left: 50%;
  transform: translateX(-50%);
  top: 20%;
}
</style>
