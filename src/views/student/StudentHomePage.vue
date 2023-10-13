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
            <course-card :course="course"></course-card>
          </v-sheet>
        </v-col>
      </v-row>

      <h3 style="text-align: center">Your Courses</h3>
      <v-row no-gutters>
        <v-col
          v-for="(course, index) in trendingCoursesList"
          :key="index"
          cols="12"
          align="center"
          lg="3"
        >
          <v-sheet class="ma-2 pa-2">
            <course-card :course="course"></course-card>
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
    };
  },
  mounted() {
    this.fetchTrendingCourses();
  },
  methods: {
    async fetchTrendingCourses() {
      try {
        const response = await this.$store.dispatch("fetchTrendingCourses")
        this.trendingCoursesList = response.data;
        console.log(this.trendingCoursesList);
      } catch (error) {
        console.error("Error fetching trending courses:", error);
      }
    },
  },
};
</script>

<style></style>
