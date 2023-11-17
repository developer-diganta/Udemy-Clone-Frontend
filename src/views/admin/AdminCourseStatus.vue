<template>
  <div class="container">
    <p class="text-h5">Pending For Review</p>

    <v-divider></v-divider>
    <v-row class="mt-4 mb-4" v-if="!publishedCourses.length">
      <div class="d-flex justify-center flex-column align-center items-center text-center mx-auto">
        <v-img
          :src="require('../../assets/no-data.svg')"
          width="200"
          class="mx-auto mt-5 mb-5"
        ></v-img>
        <h3>No Courses Pending For Review!</h3>

      </div>
    </v-row>
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

            <v-btn color="orange" @click="activate(course._id)">
              Activate
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <p class="text-h5">Active Courses</p>
    <v-divider></v-divider>
    <v-row class="mt-4 mb-4" v-if="!activeCourses.length">
      <div class="d-flex justify-center flex-column align-center items-center text-center mx-auto">
        <v-img
          :src="require('../../assets/no-data.svg')"
          width="200"
          class="mx-auto mt-5 mb-5"
        ></v-img>
        <h3>No Active Courses!</h3>

      </div>
    </v-row>
    <v-row class="mt-4 mb-4" v-else>
      <v-col
        cols="12"
        md="4"
        v-for="(course, index) in activeCourses"
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
  },
  methods: {
    async fetchAllCourses() {
      await this.$store.dispatch("admin/getAllCourses");
      this.allCourses = this.$store.state.admin.allCourses;
    },
    instructorName(id) {
      this.$store.dispatch("admin/fetchInstructorName", id);
      return this.$store.state.admin.instructorName;
    },
    redirect(id) {
      this.$router.push(`/admin/course?courseId=${id}`);
    },
    async activate(id) {
      await this.$store.dispatch(`admin/updateCourseStatus`, {
        id,
      });
      this.fetchAllCourses();
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
