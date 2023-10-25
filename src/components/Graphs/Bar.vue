<template lang="">
  <bar :data="barData" :options="options" />
</template>
<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);
export default {
  components: {
    Bar,
  },
  props: ["totalCourses", "pendingCourses", "publishedCourses"],
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        options: {
          scales: {
            y: {
              stepSize: 1,
            },
          },
        },
      },
    };
  },
  computed: {
    barData() {
      return {
        labels: ["Total Courses", "Published Courses", "Pending Courses"],
        datasets: [
          {
            label: "Courses",
            backgroundColor: "#008080",
            data: [
              this.totalCourses,
              this.pendingCourses,
              this.publishedCourses,
            ],
          },
        ],
      };
    },
  },
};
</script>
