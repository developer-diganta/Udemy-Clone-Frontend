<template>
  <div>
    <v-sheet
      elevation="12"
      max-width="600"
      rounded="lg"
      width="100%"
      class="pa-4 text-center mx-auto paymentSuccess"
      v-if="successMessage"
    >
      <v-icon
        class="mb-5"
        color="success"
        icon="mdi-check-circle"
        size="112"
      ></v-icon>

      <h2 class="text-h5 mb-6">{{$t("Payment Successful!")}}</h2>

      <p class="mb-4 text-medium-emphasis text-body-2">
        {{$t("You have successfully enrolled in this course! Happy Learning!")}}
      </p>

      <v-divider class="mb-4"></v-divider>

      <div class="text-end">
        <v-btn
          class="text-none"
          color="success"
          rounded
          variant="flat"
          width="90"
          @click="hideSuccess"
        >
          {{$t("Done")}}
        </v-btn>
      </div>
    </v-sheet>
    <v-row class="container-secondary mt-4">
      <v-col cols="12" md="9">
        <div id="video-area" v-if="!courseComplete">
          <video-player
            @video-ended="handleVideoEnded"
            :currentVideo="currentVideo?.videoLink"
          >
          </video-player>
          <div class="loader" v-if="videoEnded">
            <v-progress-circular
              color="blue-lighten-3"
              indeterminate
              :width="6"
              :height="10"
            ></v-progress-circular>
            <p>Loading Next Video In {{ timeToNextVideo }}</p>
          </div>
        </div>
        <div v-else>
          <v-card class="d-flex justify-center align-center flex-column">
            <v-img
              :src="require('../../assets/complete.svg')"
              width="300"
            ></v-img>
            <v-card-title>Course Completed!</v-card-title>
          </v-card>
        </div>

        <v-card class="tab-wrapper rounded-0">
          <v-tabs v-model="tab" bg-color="primaryTheme">
            <v-tab value="overview">Overview</v-tab>
            <v-tab value="qa">Q&A</v-tab>
            <v-tab value="reviews">Reviews</v-tab>
            <v-tab value="notes">Notes</v-tab>
            <v-tab class="d-md-none" value="coursecontents"
              >Course Contents</v-tab
            >
          </v-tabs>

          <v-card-text>
            <v-window v-model="tab">
              <v-window-item value="overview" class="p-5 mt-2">
                <p class="text-h4">{{ course.title }}</p>
                <p class="text-body-1">{{ course.description }}</p>

                <div class="d-flex align-center mt-4">
                  <p>
                    <!-- <v-tooltip :text="course.rating">
                      <template v-slot:activator="{ props }">
                        <v-text v-bind="props">
                          <v-rating
                            v-model="rating"
                            color="primaryTheme"
                            readonly
                            :model-value="ratings"
                            density="compact"
                            half-increments
                          ></v-rating>
                        </v-text>
                      </template>
                    </v-tooltip> -->
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
                <question-answer-form
                  :courseId="course._id"
                  @question-submitted="reloadQs"
                ></question-answer-form>

                <h3 class="mt-5">Previously Asked Questions</h3>
                <div v-for="(qa, index) in questionAnswers" :key="index">
                  <question-answer
                    :questionAnswers="qa"
                    @qa-reloaded="handleQAChange"
                  ></question-answer>
                </div>
                <!-- <iterable
                  :items="questionAnswers"
                  page="1"
                  itemsPerPage="3"
                  type="qa"
                  @qa-fresh="handleQAChange"
                  :key="questionAnswers"
                ></iterable> -->
              </v-window-item>

              <v-window-item value="reviews">
                <reviews
                  @review-submitted="reloadCourse"
                  :totalRating="course.rating"
                  :reviews="course.reviews"
                ></reviews>
              </v-window-item>

              <v-window-item value="notes">
       
                <v-card v-for="(note, index) in notes" :key="index">
                  <v-card style="margin:10px;padding:15px">
                    <v-card-title>{{note.header}}</v-card-title>
                    <v-card-subtitle>{{note.description}}</v-card-subtitle>
                    <v-card-actions class="mt-2" style="display:float;float:right">
                      <v-btn icon="mdi-delete" @click="deleteNote(index)" variant="flat" size="x-small" color="primaryTheme"></v-btn>
                      <!-- <v-btn icon="mdi-pen" variant="flat" size="x-small" color="primaryTheme"></v-btn> -->

                    </v-card-actions>
                  </v-card>
                </v-card>

                <student-notes :course="course._id"></student-notes>
              </v-window-item>

              <!-- @review-submitted="reloadCourse"
              :totalRating="course.rating"
              :reviews="course.reviews" -->
              <v-window-item value="coursecontents">
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
                          selectedIndex === index && selectedI === i
                            ? '#6FBEDF'
                            : '',
                      }"
                    >
                      <input
                        type="checkbox"
                        :checked="
                          courseContentsCompleted.includes(index + ',' + i)
                        "
                      />
                      {{ i + 1 + ". " + video.title }}
                    </v-list-item>
                  </v-list-group>
                </v-list>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="3" class="d-none d-md-block">
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
              <input
                type="checkbox"
                :checked="courseContentsCompleted.includes(index + ',' + i)"
              />
              {{ i + 1 + ". " + video.title }}
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
import QuestionAnswerForm from "@/components/Course/QuestionAnswerForm.vue";
import Iterable from "@/components/Common/Iterable.vue";
import Reviews from "@/components/Course/Reviews.vue";
import StudentNotes from "@/views/student/StudentNotes.vue";
export default {
  components: {
    VideoPlayer,
    Navbar,
    QuestionAnswer,
    QuestionAnswerForm,
    Iterable,
    Reviews,
    StudentNotes,
  },
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
      timeToNextVideo: 5,
      interval: {},
      videoEnded: false,
      successMessage: false,
      coursemap: new Map(),
      page: 1,
      questionAnswers: [],
      courseContentsCompleted: [],
      notes: [],
      courseComplete: false,
      dialog: false,
      dialogActive: false,
      ratings: 0,
    };
  },
  methods: {
    async deleteNote(id){
      await this.$store.dispatch("student/deleteNote", {course:this.course._id,noteId:id})
      await this.getNotes();
    },
    async getNotes() {
      await this.$store.dispatch("student/getNotes",this.course._id);
      this.notes = this.$store.state.student.notes;

    },
    /**
     * Reload the course details.
     */
    async reloadCourse() {
      this.getCourse(this.course._id);
    },

    /**
     * Handle changes in the question and answer data.
     * @param {Array} data - New question and answer data.
     */
    async handleQAChange(data) {
      this.questionAnswers = await data;
    },

    /**
     * Reload the questions and answers for the course.
     */
    reloadQs() {
      this.getCourse();
    },

    /**
     * Hide the success message.
     */
    hideSuccess() {
      this.successMessage = false;
    },

    /**
     * Get course details.
     */
    async getCourse() {
      try {
        await this.$store.dispatch("common/fetchSingleCourse", {
          courseId: this.$route.query.courseId,
        });
        this.currentVideo =
          this.$store.state.common.singleCourse.lessons[0]?.videos[0];

        this.course = this.$store.state.common.singleCourse;
        this.questionAnswers = this.course.questionAnswers;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Load a new lecture video.
     * @param {number} index - Index of the lesson.
     * @param {number} i - Index of the video within the lesson.
     */
    loadNewLecture(index, i) {
      this.selectedI = i;
      this.selectedIndex = index;
      if (this.courseComplete) {
        this.courseComplete = false;
      }
      if (i >= this.course.lessons[index].videos.length) {
        this.selectedIndex = index = index + 1;
        this.selectedI = i = 0;
      }
      this.currentVideo = this.course.lessons[index].videos[i];
    },

    /**
     * Handle the event when a video ends.
     */
    async handleVideoEnded() {
      this.videoEnded = true;
      this.courseContentsCompleted.push(
        this.selectedIndex + "," + this.selectedI,
      );

      if (this.selectedIndex + 1 >= this.course.lessons.length && !this.course.lessons[this.selectedIndex].videos[this.selectedI+1]) {
        this.courseComplete = true;
        if (!this.dialogActive) {
          this.dialog = true;
          this.dialogActive = true;
        }
        return;
      }
      if (!this.courseComplete) {
        this.interval = setInterval(() => {
          if (this.timeToNextVideo === 0) {
            clearInterval(this.interval);
            this.timeToNextVideo = 5;
            this.videoEnded = false;
            this.loadNewLecture(this.selectedIndex, this.selectedI + 1);
            return;
          }
          this.timeToNextVideo -= 1;
        }, 1000);
      }
      if (localStorage.getItem("type") === "student") {
        const res = await this.$store.dispatch("updateCompletionStatus", {
          section: this.selectedIndex,
          videoNumber: this.selectedI,
          courseId: this.course._id,
        });
      }
    },
    ratingsCalculated() {
      return (
        this.course.reviews.reduce(
          (total, review) => total + review.rating,
          0,
        ) / this.course.reviews.length
      );
    },
  },

  async created() {
    try {
      await this.getCourse();
      const student = this.$store.state.student.profile;
      const completionStatus = student.enrolled;
      const courseStatus = completionStatus?.filter(
        (status) => status.id === this.course._id,
      );
      this.courseContentsCompleted = courseStatus[0]?.progress.map(
        (p) => `${p.section},${p.videoNumber}`,
      ) || [""];

      this.instructor = this.course.instructor;
      if (this.$route.query.payment === "success") {
        this.successMessage = true;
      }
      await this.getNotes();
      this.ratings = this.ratingsCalculated();
    } catch (error) {
      this.$store.dispatch("snackbar/showSnackbar", {
        message:
          "Oops! Something went wrong. Please reload or wait for some time",
        type: "Error",
      });
    }
  },
};
</script>
<style scoped>
.video-area {
  position: relative;
}
.loader {
  color: blue;
  text-align: center;
  position: absolute;
  z-index: 9999;
  top: 40%;
  left: 33%;
}
.v-progress-circular {
  margin: 1rem;
}
.paymentSuccess {
  position: absolute;
  z-index: 99999;
  left: 50%;
  transform: translateX(-50%);
  top: 20%;
}
</style>
