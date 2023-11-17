<template>
  <div>
    <v-row class="justify-center d-flex">
      <v-col cols="12" md="8">
        <v-row>
          <admin-home-card
            cardTitle="Total Courses Purchased"
            :cardData="totalCoursesPurchased"
            redirect="courses"
          ></admin-home-card>

          <admin-home-card
            cardTitle="Total Courses"
            :cardData="$store.state.admin.allCourses.length"
            redirect="courses"
          ></admin-home-card>

          <admin-home-card
            cardTitle="Pending For Review"
            :cardData="pending.length"
            redirect="coursestatus"
          ></admin-home-card>

          <admin-home-card
            cardTitle="Total Instructors"
            :cardData="$store.state.admin.allInstructors.length"
            redirect="instructors"
          ></admin-home-card>

          <admin-home-card
            cardTitle="Total Students"
            :cardData="$store.state.admin.allStudents.length"
            redirect="instructors"
          ></admin-home-card>

          <admin-home-card
            cardTitle="Total Revenue"
            :cardData="'₹'+totalRevenue"
            redirect="revenue"
          ></admin-home-card>
        </v-row>
      </v-col>

      <v-col
        cols="12"
        md="3"
        height="auto"
        class="mt-2"
        style="margin-left: -30px; width: 100%"
      >
        <v-sheet :elevation="6" class="text-center" rounded>
          <h4 class="text-h5">Latest Transactions</h4>
          <v-divider></v-divider>
          <div v-for="(transaction, index) in payments" :key="index">
            <div class="padd">
              ₹ {{ transaction.paymentDetails.price }} at
              {{ new Date(transaction.paymentDetails.createdAt) }}
            </div>
            <v-divider></v-divider>
          </div>
        </v-sheet>
      </v-col>
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
      totalCoursesPurchased: 0,
      totalCourses: 0,
      payments: [],
      totalRevenue:0,
      pending:0
    };
  },
  methods: {
    async fetchPayments() {
      try {
        await this.$store.dispatch("admin/getRevenue");
        this.payments = this.$store.getters["admin/sortedRevenue"];
        // sort(
        //   (a, b) =>
        //     new Date(a.paymentDetails.createdAt) -
        //     new Date(b.paymentDetails.createdAt),
        // );
        console.log(this.payments);
      } catch (error) {
        console.log("error");
      }
    },
  },
  async created() {
    await this.fetchPayments();
    await this.$store.dispatch("admin/getAllStudents")
    await this.$store.dispatch("admin/getAllInstructors")
    await this.$store.dispatch("admin/getAllCourses")
    this.totalRevenue = this.$store.state.admin.revenue.reduce((t,x)=>t+x.paymentDetails.price,0)
    this.pending = this.$store.state.admin.allCourses.filter((x)=>x.status==='published')
    this.totalCoursesPurchased = this.$store.state.admin.revenue.length
  },
};
</script>
<style scoped>
.padd {
  padding: 5%;
}
</style>
