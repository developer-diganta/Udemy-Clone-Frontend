<template>
  <div>
    <v-carousel hide-delimiters>
      <v-carousel-item
        src="https://images.unsplash.com/photo-1587691592099-24045742c181?auto=format&fit=crop&q=80&w=1473&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        cover
      >
        <!-- <div class="overlay">
          <carousel-text
            text="Learn Anytime,Anywhere"
            subtext="Flexible Learning, Anytime, Anywhere, Unlock Your Potential."
            class="c-text"
          ></carousel-text>
        </div> -->
      </v-carousel-item>

      <v-carousel-item
        src="https://images.unsplash.com/photo-1659301254614-8d6a9d46f26a?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVhY2hlcnxlbnwwfHwwfHx8MA%3D%3D"
        cover
      >
        <div class="overlay"></div>
      </v-carousel-item>

      <v-carousel-item
        src="https://images.unsplash.com/photo-1536337005238-94b997371b40?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzQ2fHx0ZWFjaGVyfGVufDB8fDB8fHww"
        cover
      >
        <div class="overlay"></div>
      </v-carousel-item>
    </v-carousel>

    <section id="student-homepage" class="container mt-4">
      <h3  v-if="trendingCoursesList.length" style="text-align: center">{{$t("Explore the trending courses")}}</h3>
      <v-divider v-if="trendingCoursesList.length" ></v-divider>
      <v-row no-gutters v-if="trendingCoursesList.length" >
        <v-col
          v-for="(course, index) in trendingCoursesList"
          :key="index"
          cols="12"
          align="center"
          lg="4"
        >
          <v-sheet class="ma-2 pa-2">
            <course-card :course="course" type="all"></course-card>
          </v-sheet>
        </v-col>
      </v-row>

      <h3 style="text-align: center">{{$t("Your Courses")}}</h3>
      <v-divider></v-divider>
      <div v-if="!enrolledCoursesList.length" class="mt-2">
        <v-img :src="require('../../assets/no-data.svg')" width="150" class="mx-auto"></v-img>
        <p class="text-center mt-3">{{$t("You have not enrolled in any course")}}</p>
        <v-btn @click="$router.push(`search?searchQuery=`)" class="mx-auto d-block mt-3" variant="flat" color="secondaryCoral" style="color:white !important">{{$t("Enroll Now")}}</v-btn>
      </div>

      <v-row no-gutters>
        <v-col
          v-for="(course, index) in enrolledCoursesList"
          :key="index"
          cols="12"
          align="center"
          lg="4"
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
import CarouselText from "@/ui/CarouselText.vue";

export default {
  components: {
    Navbar,
    CourseCard,
    CarouselText,
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
    /**
     * Fetch trending courses and update the trendingCoursesList.
     */
    async fetchTrendingCourses() {
      try {
        const response = await this.$store.dispatch(
          "common/fetchTrendingCourses",
        );
        this.trendingCoursesList = this.$store.state.common.trendingCourses;
        console.log(this.trendingCoursesList, "Trending Courses List");
      } catch (error) {
        console.log(error);
        // Handle errors if the fetch fails
        // alert("Sorry, we ran into an error");
      }
    },

    /**
     * Fetch enrolled courses and update the enrolledCoursesList.
     */
    async fetchEnrolledCourses() {
      try {
        const response = await this.$store.dispatch(
          "student/fetchEnrolledCourses",
        );
        this.enrolledCoursesList = this.$store.state.student.enrolledCourses;
      } catch (error) {
        // Handle errors if the fetch fails
        // alert("Sorry, we ran into an error");
      }
    },
  },
};
</script>

<style>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* Adjust the opacity as needed */
  z-index: 1; /* Ensure it's on top of the image */
}

.c-text {
  z-index: 99999;
}
</style>
