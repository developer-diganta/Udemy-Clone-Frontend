<template>
  <Line :data="lineData" :options="options" />
</template>

<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export default {
  components: {
    Line,
  },
  props: ["yearData", "title"],
  data() {
    return {
      options: {
        responsive: true,
        // maintainAspectRatio: false,
      },
    };
  },
  computed: {
    lineData() {
      console.log(this.yearData);
      return {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: this.title,
            backgroundColor: "#008080",
            data: this.yearData,
          },
        ],
      };
    },
  },
};
</script>
