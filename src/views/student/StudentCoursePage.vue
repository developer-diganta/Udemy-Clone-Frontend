<template>
  <div>
    <navbar></navbar>
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

      <h2 class="text-h5 mb-6">Payment Successful!</h2>

      <p class="mb-4 text-medium-emphasis text-body-2">
        You have successfully enrolled in this course! Happy Learning!
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
          Done
        </v-btn>
      </div>
    </v-sheet>
    <v-row class="container-secondary mt-4">
      <v-col cols="12" md="9">
        <div id="video-area">
          <video-player
            @video-ended="handleVideoEnded"
            :currentVideo="currentVideo.videoLink"
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

        <v-card class="tab-wrapper rounded-0">
          <v-tabs v-model="tab" bg-color="primaryTheme">
            <v-tab value="overview">Overview</v-tab>
            <v-tab value="qa">Q&A</v-tab>
            <v-tab value="announcements">Announcements</v-tab>
            <v-tab value="reviews">Reviews</v-tab>
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
                <question-answer-form :courseId="course._id"></question-answer-form>

                <h3 class="mt-5">Previously Asked Questions</h3>
                <iterable :items="course.questionAnswers"  page="1" itemsPerPage="3"></iterable> 

              </v-window-item>

              <v-window-item value="announcements"> Three </v-window-item>
              <v-window-item value="reviews"> 
                <reviews :totalRating="course.rating" :reviews="course.reviews"></reviews>  
              </v-window-item>

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
                      <input type="checkbox" /> {{ i + 1 + ". " + video.title }}
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
import QuestionAnswerForm from '@/components/Course/QuestionAnswerForm.vue';
import Iterable from '@/components/Common/Iterable.vue';
import Reviews from '@/components/Course/Reviews.vue';

export default {
  components: { VideoPlayer, Navbar, QuestionAnswer, QuestionAnswerForm, Iterable, Reviews },
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
      coursemap:new Map(),
      page: 1,
    items: Array.from({ length: 15 }, (k, v) => ({
      title: 'Item ' + v + 1,
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!',
    })),
    };
  },
  methods: {
    hideSuccess() {
      this.successMessage = false;
    },
    async getCourse() {
      try{
        const res = await this.$store.dispatch("fetchSingleCourse", {
          courseId: this.$route.query.courseId,
        });
        console.log(res.lessons)
        this.currentVideo = res.lessons[0]?.videos[0];
        this.course = res;
        console.log(this.course);
        // return res;

      }catch(error){
        console.log(error)
      }
    },
    loadNewLecture(index, i) {
      this.selectedI = i;
      this.selectedIndex = index;
      this.currentVideo = this.course.lessons[index].videos[i];
    },
    async handleVideoEnded() {
      this.videoEnded = true;
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
      if(localStorage.getItem("type")==="student"){
        
        const res = await this.$store.dispatch("updateCompletionStatus",{
          section:this.selectedIndex,
          videoNumber:this.selectedI
        })
        console.log("PPPPPPP",res)
      }
    },
  },
  async created() {
    console.log("HERE AM I")
    await this.getCourse();
    console.log(this.course)
    // const student = await 
    // for(var i=0;i<this.student.enrolled.length;i++){
    //   for(var j=0;this.student.enrolled[i].progress.length;j++){
    //     this.coursemap.set(toString(this.course.enrolled[i].progress.section)+","+toString(this.course.enrolled[i].progress.section),1)
    //   }
    // }

    // console.log(this.coursemap)
    this.instructor = this.course.instructor;
    if (this.$route.query.payment === "success") {
      this.successMessage = true;
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
