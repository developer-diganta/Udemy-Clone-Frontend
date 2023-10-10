<template>
  <navbar></navbar>
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

    selfCourses: [
      {
        title: "Introduction to JS",
      },
      {
        title: "Understanding Elastic Search",
      },
      {
        title: "Deep Dive Into DevOps",
      },
      {
        title: "React Masterclass 2023",
      },
    ],
    trendingCourses: [],
  }),
  methods: {
    async fetchTrendingCourses() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/courses?",
        );
        console.log(response.data);
        this.trendingCourses = response.data;
      } catch (error) {
        console.error("Error fetching trending courses:", error);
      }
    },
  },
  computed: {
    userName() {
      return this.$store.state.user.name;
    },
  },
  mounted() {
    this.fetchTrendingCourses();
  },
};
</script>
<style scoped>
#course-stats {
  display: flex;
  justify-content: space-evenly;
}
</style>
