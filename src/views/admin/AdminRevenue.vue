<template>
  <div>
    <v-breadcrumbs :items="['admin', 'revenue']"></v-breadcrumbs>

    <admin-home-card
      cardTitle="Total Revenue"
      :cardData="'₹ ' + totalRevenue"
    ></admin-home-card>
    <div
      style="height: 500px; text-align: center; margin: 0 auto"
      class="justify-center d-flex flex-column align-center"
    >
      <h3>Revenue Projections</h3>
      <v-select
        style="width: 200px; font-size: 14px; margin: 0 auto"
        density="compact"
        label="Year"
        v-model="revenueYear"
        :items="[2023, 2022, 2021, 2020, 2019, 2018]"
      ></v-select>

      <line-graph
        title="Revenue Projections (This Year)"
        :yearData="revenueGraphData"
      ></line-graph>
    </div>
  </div>
</template>
<script>
import AdminHomeCard from "@/ui/AdminHomeCard.vue";
import LineGraph from "@/components/Graphs/LineGraph.vue";
export default {
  components: { AdminHomeCard, LineGraph },
  data() {
    return {
      revenue: [],
      revenueYear: 2023,
    };
  },
  methods: {},
  computed: {
    totalRevenue() {
      return this.revenue.reduce(
        (total, revenue) => total + revenue.paymentDetails.price,
        0,
      );
    },
    revenueGraphData() {
      const yearData = new Array(12).fill(0);

      for (var i = 0; i < this.revenue.length; i++) {
        if (
          new Date(this.revenue[i].paymentDetails.createdAt).getFullYear() ===
          this.revenueYear
        ) {
          yearData[
            new Date(this.revenue[i].paymentDetails.createdAt).getMonth()
          ] += this.revenue[i].paymentDetails.price;
        }
        console.log(yearData);
        return yearData;
      }
    },
  },
  async created() {
    await this.$store.dispatch("admin/getRevenue");
    this.revenue = this.$store.state.admin.revenue;
    console.log(this.revenue);
  },
};
</script>
<style></style>
