<template>
  <div>
    <v-breadcrumbs :items="['admin', 'students']"></v-breadcrumbs>

    <v-row class="justify-center mt-4">
      <v-col cols="12" lg="5">
        <v-sheet :elevation="6" class="pb-5" rounded>
          <pie
            :labels="['Verification Left', 'Verification Done']"
            title="Student Status"
            :data="[pendingStudents.length, verifiedStudents.length]"
          ></pie>
        </v-sheet>
      </v-col>
      <v-col cols="12" lg="5">
        <v-sheet :elevation="6" class="pt-8 pb-9" rounded>
          <line-graph
            title="Students"
            :yearData="monthlyStudentSignups"
          ></line-graph>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Pie from "@/components/Graphs/Pie.vue";
import LineGraph from "@/components/Graphs/LineGraph.vue";
export default {
  components: { Pie, LineGraph },
  data() {
    return {
      students: [],
    };
  },
  computed: {
    pendingStudents() {
      return this.students.filter((student) => student.status === "pending");
    },
    verifiedStudents() {
      return this.students.filter((student) => student.status === "registered");
    },
    monthlyStudentSignups() {
      const yearData = new Array(12).fill(0);
      for (var i = 0; i < this.students.length; i++) {
        if (
          new Date(this.students[i].createdAt).getFullYear() ===
          new Date().getFullYear()
        ) {
          yearData[new Date(this.students[i].createdAt).getMonth()]++;
        }
      }
      console.log(yearData);
      return yearData;
    },
  },
  async created() {
    await this.$store.dispatch("admin/getAllStudents");
    this.students = this.$store.state.admin.allStudents;
    console.log(this.students);
  },
};
</script>
<style></style>
