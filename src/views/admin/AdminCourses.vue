<template lang="">
  <v-breadcrumbs :items="['admin', 'courses']"></v-breadcrumbs>
  <v-row class="justify-center">
    <!-- <v-col cols="12" lg="5">
      <v-sheet :elevation="6" class="pb-5" rounded>
        <pie
          :labels="['Pending Courses', 'Published Courses']"
          :data="[pendingCourses, publishedCourses]"
          title="Course Status"
        ></pie>
      </v-sheet>
    </v-col> -->

    <v-col cols="12" lg="12">
      <v-sheet :elevation="6" class="pt-16 pb-16" rounded>
        <bar
          :totalCourses="totalCourses"
          :pendingCourses="pendingCourses"
          :publishedCourses="publishedCourses"
        ></bar>
      </v-sheet>
    </v-col>

    <v-col cols="12" lg="5">
      <v-sheet :elevation="6" class="pt-8 pb-9" rounded>
        <line-graph
          :yearData="thisYear"
          title="Courses Created This Year"
        ></line-graph>
      </v-sheet>
    </v-col>

    <v-col cols="12" lg="5">
      <v-sheet :elevation="6" class="pb-5" rounded>
        <pie
          :labels="pieLabels"
          :data="pieData"
          title="Category Distribution"
        ></pie>
      </v-sheet>
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
    await this.$store.dispatch("admin/getAllCourses");
    this.courses = this.$store.state.admin.allCourses;
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
