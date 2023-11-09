<template>
  <div style="padding: 3%; background: black; color: white" class="mb-5">
    <h1>My Courses</h1>
  </div>
  <div class="container">
    <v-divider></v-divider>
    <v-row class="mt-10">
      <v-col
        cols="12"
        md="4"
        class="d-flex justify-center"
        v-for="(course, index) in enrolledCourses"
        :key="index"
      >
        <course-card type="enrolled" :course="course"></course-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import CourseCard from "@/components/Course/CourseCard.vue";
export default {
  components: { CourseCard },
  data() {
    return {
      enrolledCourses: [],
    };
  },
  methods: {
    async fetchEnrolledCourses() {
      const res = await this.$store.dispatch("student/fetchEnrolledCourses");
      this.enrolledCourses = this.$store.state.student.enrolledCourses;
    },
  },

  async created() {
    await this.fetchEnrolledCourses();
  },
};
</script>
<style></style>
