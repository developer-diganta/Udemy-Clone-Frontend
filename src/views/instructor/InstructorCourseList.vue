<template lang="">
  <div style="padding: 3%; background: black; color: white" class="mb-5">
    <h1>{{ $t("My Courses") }}</h1>
  </div>
  <div class="container">
    <p class="text-h5">{{ $t("Unpublished Courses") }}</p>
    <v-divider></v-divider>
    <div v-if="!pendingCourses.length" class="text-center mt-2">
      "{{ $t("Create a New Course") }}"
      <v-btn
        variant="flat"
        color="secondaryCoral"
        class="d-block mx-auto"
        style="color: white !important"
        @click="$router.push('course/add')"
        >{{ $t("Create Now") }}</v-btn
      >
    </div>
    <v-row class="mt-4 mb-4">
      <v-col
        cols="12"
        md="4"
        v-for="(course, index) in pendingCourses"
        :key="index"
      >
        <v-card class="mx-auto" max-width="400" data-value="pending-courses">
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
              {{ $t("View Course") }}
            </v-btn>

            <v-btn
              color="orange"
              @click="publish(course._id)"
              data-value="publish-course-btn"
            >
              "{{ $t("Publish") }}"
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <p class="text-h5">{{ $t("Pending For Review") }}</p>
    <v-divider></v-divider>
    <div v-if="!publishedCourses.length" class="text-center">
      <v-img
        :src="require('../../assets/no-data.svg')"
        height="200"
        width="150"
        class="mx-auto"
      />
      {{ $t("No Published(Pending for Review) Courses") }}
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
              {{ $t("View Course") }}
            </v-btn>

            <v-btn color="orange" @click="publish(course._id)"> Publish </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <p class="text-h5">{{ $t("Active Courses") }}</p>
    <v-divider></v-divider>
    <div v-if="!activeCourses.length" class="text-center">
      <v-img
        :src="require('../../assets/no-data.svg')"
        height="200"
        width="150"
        class="mx-auto"
      />
      {{ $t("No Active Courses") }}
    </div>

    <v-row class="mt-4 mb-4">
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
              {{ $t("View Course") }}
            </v-btn>

            <v-btn color="orange" @click="stats(course._id)">
              {{ $t("View Stats") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
  <div class="mt-5">
    <Footer />
  </div>
</template>
<script>
import Iterable from "@/components/Common/Iterable.vue";
import moment from "moment";
import Footer from "@/components/Common/Footer.vue";

export default {
  components: { Iterable, Footer },
  data() {
    return {
      allCourses: [],
      moment,
    };
  },
  computed: {
    publishedCourses() {
      console.log(
        this.allCourses.filter((course) => course.status === "published"),
      );
      return this.allCourses.filter((course) => course.status === "published");
    },
    activeCourses() {
      console.log(this.allCourses);
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
      this.$router.push(`/instructor/coursepreview/${id}`);
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
