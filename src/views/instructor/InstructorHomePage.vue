<template>
  <div class="container">
    <h2 style="text-align: center; margin-top: 20px; margin-bottom: 40px">
      Hello, {{ userName }} (Instructor)
    </h2>

    <section id="statistics">
      <section v-if="!trendingCourses.length && selfCourses.length">
        <stat-card :stats="trendingCourses" :title="'Trending Courses'"></stat-card>
      </section>
      <section v-if="trendingCourses.length && !selfCourses.length">
        <stat-card :stats="selfCourses" :title="'Your Courses'"></stat-card>
      </section>
      <section id="course-stats"         v-if="trendingCourses.length && selfCourses.length">

        <stat-card
          :stats="trendingCourses"
          :title="'Trending Courses'"
        ></stat-card>

        <stat-card :stats="selfCourses" :title="'Your Courses'"></stat-card>
      </section>
      <section v-if="!selfCourses.length && !trendingCourses.length">
        <v-card class="p-4" style="padding:2%">
        <v-img :src="require('../../assets/void.svg')" class="mx-auto" width="200"></v-img>
          <v-card-title class="text-center">Sorry! We do not have enough data to show now. Create a course to get started!
          </v-card-title>
          <v-card-actions>
            <v-btn color="secondaryCoral" variant="flat" class="mx-auto" @click="$router.push('course/add')">Create a Course</v-btn>
          </v-card-actions>
      </v-card>
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
