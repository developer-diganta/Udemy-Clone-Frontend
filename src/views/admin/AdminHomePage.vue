<template>
  <div>
    <v-row class="justify-center d-flex">
      <v-col cols="12" md="8">
        <v-row>
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
      totalCoursesPurchased: 100,
      totalCourses: 150,
      payments: [],
    };
  },
  methods: {
    async fetchPayments() {
      const res = await this.$store.dispatch("getRevenue");
      this.payments = res.sort(
        (a, b) =>
          new Date(a.paymentDetails.createdAt) -
          new Date(b.paymentDetails.createdAt),
      );
      console.log(this.payments);
    },
  },
  async created() {
    await this.fetchPayments();
  },
};
</script>
<style scoped>
.padd {
  padding: 5%;
}
</style>
