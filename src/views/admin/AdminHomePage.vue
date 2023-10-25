<template>
  <div>
    <h1 class="mb-4">STATS</h1>
    <v-row class="justify-center">
      <admin-home-card
        cardTitle="Total Courses Purchased"
        :cardData="totalCoursesPurchased"
      ></admin-home-card>

      <admin-home-card
        cardTitle="Total Courses"
        :cardData="totalCourses"
      ></admin-home-card>

      <admin-home-card
        cardTitle="Pending For Review"
        cardData="8"
      ></admin-home-card>

      <admin-home-card
        cardTitle="Total Instructors"
        cardData="70"
      ></admin-home-card>

      <admin-home-card
        cardTitle="Total Students"
        cardData="1500"
      ></admin-home-card>

      <admin-home-card
        cardTitle="Total Revenue"
        cardData="152000"
      ></admin-home-card>
    </v-row>
  </div>
</template>
<script>
import AdminNavbar from "@/components/Navbar/AdminNavbar.vue";
import AdminHomeCard from "@/ui/AdminHomeCard.vue";
export default {
  components: { AdminNavbar, AdminHomeCard },
  data() {
    return {
      drawer: true,
      rail: true,
      totalCoursesPurchased: 100,
      totalCourses: 150,
    };
  },
};
</script>
<style></style>
