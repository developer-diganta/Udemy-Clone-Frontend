<template>
  <div>
    <v-breadcrumbs :items="['admin', 'instructors']"></v-breadcrumbs>
    <v-row class="justify-center mt-4">
      <v-col cols="12" lg="5">
        <v-sheet :elevation="6" class="pb-5" rounded>
          <pie
            :labels="['Verification Left', 'Verification Done']"
            title="Instructor Status"
            :data="[pendingInstructors.length, verifiedInstructors]"
          ></pie>
        </v-sheet>
      </v-col>
      <v-col cols="12" lg="5">
        <v-sheet :elevation="6" class="pt-8 pb-9" rounded>
          <line-graph
            title="Instructors"
            :yearData="monthlyInstructorSignups"
          ></line-graph>
        </v-sheet>
      </v-col>
      <v-col cols="12" lg="5">
        <v-sheet :elevation="6" class="pb-5" rounded>
          <pie
            :labels="instructorCoursesList.map((instructor) => instructor.name)"
            :data="
              instructorCoursesList.map(
                (instructor) => instructor.courses.length,
              )
            "
            title="Instructor/Courses"
          ></pie>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Pie from "@/components/Graphs/Pie.vue";
import LineGraph from "@/components/Graphs/LineGraph.vue";
import AdminHomeCard from "@/ui/AdminHomeCard.vue";
export default {
  components: {
    Pie,
    LineGraph,
    AdminHomeCard,
  },
  data() {
    return {
      instructors: [],
    };
  },
  computed: {
    pendingInstructors() {
      return this.instructors.filter(
        (instructor) => instructor.status === "pending",
      );
    },
    verifiedInstructors() {
      return this.instructors.length - this.pendingInstructors.length;
    },
    monthlyInstructorSignups() {
      const yearData = new Array(12).fill(0);
      for (var i = 0; i < this.instructors.length; i++) {
        if (
          new Date(this.instructors[i].createdAt).getFullYear() ===
          new Date().getFullYear()
        ) {
          yearData[new Date(this.instructors[i].createdAt).getMonth()]++;
        }
      }
      console.log(yearData);
      return yearData;
    },
    instructorCoursesList() {
      return this.instructors.sort(
        (a, b) => b.courses.length - a.courses.length,
      );
    },
  },
  async created() {
    this.instructors = await this.$store.dispatch("getAllInstructors");
  },
};
</script>
<style></style>
