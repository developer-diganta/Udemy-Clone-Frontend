<template>
  <div class="container">
    <h2 style="text-align: center; margin-top: 20px; margin-bottom: 40px">
      Hello, {{ userName }} (Instructor)
    </h2>
    <section id="statistics">
      <section id="course-stats">
        <stat-card
          :stats="trendingCourses"
          :title="'Trending Courses'"
        ></stat-card>
        <stat-card :stats="selfCourses" :title="'Your Courses'"></stat-card>
      </section>
    </section>
  </div>
</template>
<script>
import StatCard from "@/ui/StatCard.vue";
import Navbar from "../../components/Navbar/Navbar.vue";
import axios from "axios";
export default {
  components: {
    Navbar,
    StatCard,
  },
  data: () => ({
    userName: "John Doe",

    selfCourses: [],
    trendingCourses: [],
  }),
  methods: {
    async fetchTrendingCourses() {
      try {
        const response = await this.$store.dispatch(
          "common/fetchTrendingCourses",
        );
        this.trendingCourses = this.$store.state.common.trendingCourses;
      } catch (error) {
        console.error("Error fetching trending courses:", error);
      }
    },
    async fetchSelfCourse() {
      try {
        await this.$store.dispatch("instructor/fetchSelfCourses");
        console.log(this.$store.state.instructor.selfCourses);
        this.selfCourses = this.$store.state.instructor.selfCourses;
      } catch (error) {
        console.error(error);
      }
    },
  },
  computed: {
    userName() {
      return this.$store.state.user.name;
    },
  },
  created() {
    this.fetchTrendingCourses();
    this.fetchSelfCourse();
  },
};
</script>
<style scoped>
#course-stats {
  display: flex;
  justify-content: space-evenly;
}
@media only screen and (max-width: 792px) {
  #course-stats {
    flex-direction: column;
  }
}
</style>
