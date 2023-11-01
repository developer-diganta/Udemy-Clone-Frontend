<template>
  <div>
    <div style="padding: 3%; background: black; color: white">
      <h1>Course Stats</h1>
    </div>
    <div>
      <v-tabs v-model="tab" bg-color="black" fixed-tabs>
        <v-tab value="one">Stats</v-tab>
        <v-tab value="two">Projections</v-tab>
      </v-tabs>

      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="one">
            <v-table class="container">
              <tbody>
                <tr v-for="(entry, key) in courseStats" :key="key">
                  <td>{{ key.toUpperCase() }}</td>
                  <td>{{ entry }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-window-item>

          <v-window-item value="two">
            <v-select
              label="Year"
              v-model="year"
              :items="[2018, 2019, 2020, 2021, 2022, 2023]"
              style="width: 40%"
              class="mx-auto"
              density="compact"
            ></v-select>
            <v-row class="container pb-5 mt-3">
              <v-col cols="12" md="6">
                <v-sheet :elevation="6" class="pt-16 pb-16" rounded>
                  <line-graph
                    :yearData="revenueYear"
                    title="Revenue Per Month"
                  ></line-graph>
                </v-sheet>
              </v-col>
              <v-col cols="12" md="6">
                <v-sheet :elevation="6" class="pt-16 pb-16" rounded>
                  <line-graph
                    :yearData="studentsEnrolled"
                    title="Students Enrolled Per Month"
                  ></line-graph>
                </v-sheet>
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
      </v-card-text>
    </div>
  </div>
</template>

<script>
import LineGraph from "@/components/Graphs/LineGraph.vue";
export default {
  components: { LineGraph },
  data() {
    return {
      course: null,
      route: this.$route,
      tab: null,
      courseStats: null,
      totalPurchases: [],
      year: 2023,
    };
  },
  methods: {
    async initialLoad() {
      const res = await this.$store.dispatch("instructorCourseViewOne", {
        courseId: this.$route.params.id,
        router: this.$router,
      });
      this.course = res.data.course;
      this.courseStats = {
        title: this.course.title,
        price: this.course.price,
        discount: this.course.discount,
        review: this.course.review,
        enrollments: this.course.enrollments,
      };
    },
    async loadCourseStats() {
      const totalPurchases = await this.$store.dispatch(
        "instructorCoursePurchase",
        this.$route.params.id,
      );
      console.log(totalPurchases);
      this.totalPurchases = totalPurchases.data;
    },
  },
  computed: {
    revenueYear() {
      console.log(this.totalPurchases);
      const months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (var i = 0; i < this.totalPurchases.length; i++) {
        if (
          new Date(
            this.totalPurchases[i].paymentDetails.createdAt,
          ).getFullYear() === this.year
        ) {
          const month = new Date(
            this.totalPurchases[i].paymentDetails.createdAt,
          ).getMonth();
          months[month - 1] += this.totalPurchases[i].paymentDetails.price;
        }
      }
      return months;
    },
    studentsEnrolled() {
      const months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (var i = 0; i < this.totalPurchases.length; i++) {
        if (
          new Date(
            this.totalPurchases[i].paymentDetails.createdAt,
          ).getFullYear() === this.year
        ) {
          const month = new Date(
            this.totalPurchases[i].paymentDetails.createdAt,
          ).getMonth();
          months[month - 1]++;
        }
      }
      return months;
    },
  },
  async created() {
    await this.initialLoad();
    this.loadCourseStats();
  },
};
</script>

<style></style>
