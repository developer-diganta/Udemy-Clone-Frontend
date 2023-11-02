<template lang="">
  <div style="padding: 3%; background: black; color: white" class="mb-5">
    <h1>My Courses</h1>
  </div>
  <div class="container">
    <p class="text-h5">Unpublished Courses</p>
    <v-divider></v-divider>
    <div v-if="!pendingCourses.length" class="text-center">
      Create a New Course
    </div>
    <v-row class="mt-4 mb-4">
      <v-col
        cols="12"
        md="4"
        v-for="(course, index) in pendingCourses"
        :key="index"
      >
        <v-card class="mx-auto" max-width="400">
          <v-img
            class="align-end text-white"
            height="200"
            :src="course.thumbnail"
            cover
          >
            <div class="image-overlay"></div>
            <v-card-title style="word-wrap: break-word"
              ><span class="overlay-text"
                >{{ course.title.substring(0, 30)
                }}{{ course.title.length > 10 ? "..." : "" }}</span
              ></v-card-title
            >
          </v-img>
          <v-card-subtitle class="pt-4">
            {{ course.instructor.name }}
          </v-card-subtitle>

          <v-card-text>
            <div>Rs. {{ course.price }}</div>

            <div>
              Created On : {{ moment(course.createdAt).format("DD/MM/YYYY") }}
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="orange" @click="redirect(course._id)">
              View Course
            </v-btn>

            <v-btn color="orange" @click="publish(course._id)"> Publish </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <p class="text-h5">Pending For Review</p>
    <v-divider></v-divider>
    <div v-if="!publishedCourses.length" class="text-center">
      No Published(Pending for Review) Courses
    </div>
    <v-row class="mt-4 mb-4">
      <v-col
        cols="12"
        md="4"
        v-for="(course, index) in publishedCourses"
        :key="index"
      >
        <v-card class="mx-auto" max-width="400">
          <v-img
            class="align-end text-white"
            height="200"
            :src="course.thumbnail"
            cover
          >
            <div class="image-overlay"></div>
            <v-card-title style="word-wrap: break-word"
              ><span class="overlay-text"
                >{{ course.title.substring(0, 30)
                }}{{ course.title.length > 10 ? "..." : "" }}</span
              ></v-card-title
            >
          </v-img>
          <v-card-subtitle class="pt-4">
            {{ course.instructor.name }}
          </v-card-subtitle>

          <v-card-text>
            <div>Rs. {{ course.price }}</div>

            <div>
              Created On : {{ moment(course.createdAt).format("DD/MM/YYYY") }}
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="orange" @click="redirect(course._id)">
              View Course
            </v-btn>

            <v-btn color="orange" @click="publish(course._id)"> Publish </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <p class="text-h5">Active Courses</p>
    <v-divider></v-divider>

    <v-row class="mt-4 mb-4">
      <v-col
        cols="12"
        md="4"
        v-for="(course, index) in activeCourses"
        :key="index"
      >
        <p v-if="!activeCourses.length">No Active Courses</p>
        <v-card class="mx-auto" max-width="400">
          <v-img
            class="align-end text-white"
            height="200"
            :src="course.thumbnail"
            cover
          >
            <div class="image-overlay"></div>
            <v-card-title style="word-wrap: break-word"
              ><span class="overlay-text"
                >{{ course.title.substring(0, 30)
                }}{{ course.title.length > 10 ? "..." : "" }}</span
              ></v-card-title
            >
          </v-img>
          <v-card-subtitle class="pt-4">
            {{ username }}
          </v-card-subtitle>

          <v-card-text>
            <div>Rs. {{ course.price }}</div>

            <div>
              Created On : {{ moment(course.createdAt).format("DD/MM/YYYY") }}
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="orange" @click="redirect(course._id)">
              View Course
            </v-btn>

            <v-btn color="orange" @click="stats(course._id)">
              View Stats
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Iterable from "@/components/Common/Iterable.vue";
import moment from "moment";
export default {
  components: { Iterable },
  data() {
    return {
      allCourses: [],
      moment,
    };
  },
  computed: {
    publishedCourses() {
      return this.allCourses.filter((course) => course.status === "published");
    },
    activeCourses() {
      return this.allCourses.filter((course) => course.status === "active");
    },
    pendingCourses() {
      return this.allCourses.filter((course) => course.status === "pending");
    },
    username() {
      return this.$store.state.user.name;
    },
  },
  methods: {
    async fetchAllCourses() {
      await this.$store.dispatch("instructor/fetchSelfCourses");
      this.allCourses = this.$store.state.instructor.selfCourses;
    },
    redirect(id) {
      this.$router.push(`/instructor/course/view/${id}`);
    },

    async publish(id) {
      await this.$store.dispatch("instructor/publishCourse", id);
      this.fetchAllCourses();
    },
    stats(id) {
      this.$router.push(`/instructor/course/stat/${id}`);
    },
  },
  async created() {
    await this.fetchAllCourses();
    console.log(this.allCourses);
  },
};
</script>
<style scoped>
.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4); /* Adjust the opacity as needed */
  z-index: 1;
}

.overlay-text {
  position: relative;
  z-index: 9999;

  color: white;
}
</style>
