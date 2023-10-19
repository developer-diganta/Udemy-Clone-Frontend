<template>
  <div>
    <navbar></navbar>
    <section id="student-homepage">
      <h3 style="text-align: center">Explore the trending courses</h3>
      <v-row no-gutters>
        <v-col
          v-for="(course, index) in trendingCoursesList"
          :key="index"
          cols="12"
          align="center"
          lg="3"
        >
          <v-sheet class="ma-2 pa-2">
            <course-card :course="course" type="all"></course-card>
          </v-sheet>
        </v-col>
      </v-row>

      <h3 style="text-align: center">Your Courses</h3>
      <v-row no-gutters>
        <v-col
          v-for="(course, index) in enrolledCoursesList"
          :key="index"
          cols="12"
          align="center"
          lg="3"
        >
          <v-sheet class="ma-2 pa-2">
            <course-card :course="course" type="enrolled"></course-card>
          </v-sheet>
        </v-col>
      </v-row>
    </section>
  </div>
</template>

<script>
import backend_url from "@/globals/globals";
import Navbar from "../../components/Navbar/Navbar.vue";
import axios from "axios";
import CourseCard from "@/components/Course/CourseCard.vue";

export default {
  components: {
    Navbar,
    CourseCard,
  },
  data() {
    return {
      trendingCoursesList: [],
      enrolledCoursesList: [],
    };
  },
  mounted() {
    this.fetchTrendingCourses();
    this.fetchEnrolledCourses();
  },
  methods: {
    async fetchTrendingCourses() {
      try {
        const response = await this.$store.dispatch("fetchTrendingCourses");
        this.trendingCoursesList = response.data;
        console.log(this.trendingCoursesList);
      } catch (error) {
        console.error("Error fetching trending courses:", error);
      }
    },
    async fetchEnrolledCourses() {
      try {
        const response = await this.$store.dispatch("fetchEnrolledCourses");
        this.enrolledCoursesList = response.data;
        console.log("here");
        console.log(this.enrolledCoursesList);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
