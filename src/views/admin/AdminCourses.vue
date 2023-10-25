<template lang="">
  <h1 class="text-center mb-4">Courses</h1>
  <v-row class="justify-center">
    <v-col cols="12" lg="5">
      <pie
        :labels="['Pending Courses', 'Published Courses']"
        :data="[pendingCourses, publishedCourses]"
      ></pie>
    </v-col>

    <v-col cols="12" lg="5">
      <bar
        :totalCourses="totalCourses"
        :pendingCourses="pendingCourses"
        :publishedCourses="publishedCourses"
      ></bar>
    </v-col>

    <v-col cols="12" lg="5">
      <line-graph
        :yearData="thisYear"
        title="Courses Created This Year"
      ></line-graph>
    </v-col>

    <v-col cols="12" lg="5">
      <pie :labels="pieLabels" :data="pieData"></pie>
    </v-col>
  </v-row>
</template>
<script>
import Bar from "../../components/Graphs/Bar.vue";
import Pie from "../../components/Graphs/Pie.vue";
import LineGraph from "../../components/Graphs/LineGraph.vue";

export default {
  components: {
    Pie,
    Bar,
    LineGraph,
  },
  data() {
    return {
      totalCourses: 0,
      pendingCourses: 0,
      publishedCourses: 0,
      courses: 0,
      categoryData: [],
      pieData: [],
      pieLabels: [],
    };
  },
  computed: {
    thisYear() {
      const yearData = new Array(12).fill(0);
      for (var i = 0; i < this.courses.length; i++) {
        if (
          new Date(this.courses[i].createdAt).getFullYear() ===
          new Date().getFullYear()
        ) {
          yearData[new Date(this.courses[i].createdAt).getMonth()]++;
        }
      }
      console.log(yearData);
      return yearData;
    },
  },
  async created() {
    this.courses = await this.$store.dispatch("getAllCourses");
    this.totalCourses = this.courses.length;
    this.pendingCourses = this.courses.filter(
      (course) => course.status === "pending",
    ).length;
    this.publishedCourses = this.courses.filter(
      (course) => course.status === "published",
    ).length;
    const categoryMap = new Map();
    for (var i = 0; i < this.courses.length; i++) {
      for (var j = 0; j < this.courses[i].categories.length; j++) {
        if (categoryMap.has(this.courses[i].categories[j])) {
          categoryMap.set(
            this.courses[i].categories[j],
            categoryMap.get(this.courses[i].categories[j]) + 1,
          );
        } else {
          categoryMap.set(this.courses[i].categories[j], 1);
        }
      }
    }
    console.log(categoryMap);
    this.pieLabels = Array.from(categoryMap.keys());
    this.pieData = Array.from(categoryMap.values());
  },
};
</script>
<style lang=""></style>
