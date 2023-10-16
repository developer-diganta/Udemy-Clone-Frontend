<template>
  <div>
    <navbar></navbar>
    <v-row class="container-secondary mt-4">
      <v-col cols="12" md="9">
        <video-player
          @video-ended="handleVideoEnded"
          :currentVideo="currentVideo.videoLink"
        ></video-player>

        <v-card class="tab-wrapper rounded-0">
          <v-tabs v-model="tab" bg-color="primaryTheme">
            <v-tab value="overview">Overview</v-tab>
            <v-tab value="qa">Q&A</v-tab>
            <v-tab value="announcements">Announcements</v-tab>
            <v-tab value="reviews">Reviews</v-tab>
          </v-tabs>

          <v-card-text>
            <v-window v-model="tab">
              <v-window-item value="overview" class="p-5 mt-2">
                <p class="text-h4">{{ course.title }}</p>
                <p class="text-body-1">{{ course.description }}</p>

                <div class="d-flex align-center mt-4">
                  <p>
                    <v-tooltip :text="course.rating">
                      <template v-slot:activator="{ props }">
                        <v-text v-bind="props">
                          <v-rating
                            v-model="rating"
                            color="primaryTheme"
                            readonly
                            :model-value="course.rating"
                            density="compact"
                            half-increments
                          ></v-rating>
                        </v-text>
                      </template>
                    </v-tooltip>
                  </p>
                  <p class="" style="margin-left: 30px">
                    <v-icon icon="mdi-account"></v-icon>
                    {{ course.enrollments }} learners
                  </p>

                  <p style="margin-left: 30px">
                    <v-chip
                      class="ml-2"
                      v-for="(category, index) in course.categories"
                      :key="index"
                    >
                      {{ category }}
                    </v-chip>
                  </p>
                </div>
                <div id="instructors" class="mt-5">
                  <p class="text-h5">Instructors</p>
                  <p class="text-subtitle-1 font-weight-bold">
                    {{ instructor.name }}
                  </p>
                  <p class="text-body-2 text-justify">{{ instructor.bio }}</p>
                </div>
              </v-window-item>

              <v-window-item value="qa">
                <question-answer
                  v-for="(questionAnswer, index) in course.questionAnswers"
                  :key="index"
                  :questionAnswers="questionAnswer"
                ></question-answer>
              </v-window-item>

              <v-window-item value="announcements"> Three </v-window-item>
              <v-window-item value="reviews"> Four </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
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

            <!-- :title="i + 1 + '. ' + video.title" -->
            <v-list-item
              v-for="(video, i) in lesson.videos"
              :key="i"
              @click="loadNewLecture(index, i)"
              class="sub-lecture-list"
              density="compact"
              :style="{
                backgroundColor:
                  selectedIndex === index && selectedI === i ? '#6FBEDF' : '',
              }"
            >
              <input type="checkbox" /> {{ i + 1 + ". " + video.title }}
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import VideoPlayer from "@/components/Video/VideoPlayer.vue";
import Navbar from "@/components/Navbar/Navbar.vue";
import QuestionAnswer from "@/components/Course/QuestionAnswer.vue";

export default {
  components: { VideoPlayer, Navbar, QuestionAnswer },
  data() {
    return {
      course: {},
      currentVideo: {
        title: "",
        videoLink: "",
      },
      instructor: "",
      tab: null,
      selectedIndex: 0,
      selectedI: 0,
    };
  },
  methods: {
    async getCourse() {
      const res = await this.$store.dispatch("fetchSingleCourse", {
        courseId: this.$route.query.courseId,
      });
      console.log(res);
      this.currentVideo = res.lessons[0].videos[0];
      return res;
    },
    loadNewLecture(index, i) {
      this.selectedI = i;
      this.selectedIndex = index;
      this.currentVideo = this.course.lessons[index].videos[i];
    },
    handleVideoEnded() {},
  },
  async created() {
    this.course = await this.getCourse();
    this.instructor = this.course.instructor;
  },
};
</script>
<style scoped></style>
