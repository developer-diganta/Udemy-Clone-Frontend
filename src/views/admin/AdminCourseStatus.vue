<template>
  <div class="container">
    <p class="text-h5">{{ $t("Pending For Review") }}</p>

    <v-divider></v-divider>
    <v-row class="mt-4 mb-4" v-if="!publishedCourses.length">
      <div
        class="d-flex justify-center flex-column align-center items-center text-center mx-auto"
      >
        <v-img
          :src="require('../../assets/no-data.svg')"
          width="200"
          class="mx-auto mt-5 mb-5"
        ></v-img>
        <h3>{{ $t("No Courses Pending For Review!") }}</h3>
      </div>
    </v-row>
    <v-row class="mt-4 mb-4">
      <v-col
        cols="12"
        md="4"
        v-for="(course, index) in publishedCourses"
        :key="index"
      >
        <v-card class="mx-auto" max-width="400" data-cy="course">
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
              {{ $t("Created On:") }}
              {{ moment(course.createdAt).format("DD/MM/YYYY") }}
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="orange" @click="redirect(course._id)">
              {{ $t("View Course") }}
            </v-btn>

            <v-btn color="orange" @click="activate(course._id)" data-cy="act">
              {{ $t("Activate") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <p class="text-h5">{{ $t("Active Courses") }}</p>
    <v-divider></v-divider>
    <v-row class="mt-4 mb-4" v-if="!activeCourses.length">
      <div
        class="d-flex justify-center flex-column align-center items-center text-center mx-auto"
      >
        <v-img
          :src="require('../../assets/no-data.svg')"
          width="200"
          class="mx-auto mt-5 mb-5"
        ></v-img>
        <h3>{{ $t("No Active Courses!") }}</h3>
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
              {{ $t("Created On") }} :
              {{ moment(course.createdAt).format("DD/MM/YYYY") }}
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="orange" @click="redirect(course._id)">
              {{ $t("View Course") }}
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
    /**
     * Fetches all courses from the admin store
     * Sets the local 'allCourses' data property with the retrieved courses
     */
    async fetchAllCourses() {
      // Dispatches an action to retrieve all courses from the admin module
      await this.$store.dispatch("admin/getAllCourses");

      // Updates the local 'allCourses' data property with the fetched courses
      this.allCourses = this.$store.state.admin.allCourses;
    },

    /**
     * Fetches the instructor name using their ID from the admin module
     * @param {string} id - Instructor ID
     * @returns {string} - Instructor's name
     */
    instructorName(id) {
      // Dispatches an action to fetch the instructor's name based on the provided ID
      this.$store.dispatch("admin/fetchInstructorName", id);

      // Returns the instructor's name from the admin store state
      return this.$store.state.admin.instructorName;
    },

    /**
     * Redirects to the admin course page with a specific course ID
     * @param {string} id - Course ID
     */
    redirect(id) {
      // Redirects to the admin course page with the provided course ID as a query parameter
      this.$router.push(`/admin/course?courseId=${id}`);
    },

    /**
     * Activates a course by updating its status in the admin module
     * Fetches all courses after the activation process
     * @param {string} id - Course ID
     */
    async activate(id) {
      // Updates the course status to activate using admin module action
      await this.$store.dispatch(`admin/updateCourseStatus`, { id });

      // Fetches all courses again after the activation for an updated list
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
