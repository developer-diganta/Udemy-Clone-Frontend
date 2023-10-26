<template>
  <Pie :data="pieData" :options="options" />
</template>
<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  components: {
    Pie,
  },
  props: ["labels", "data", "title"],
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: this.title,
          },
        },
      },
    };
  },
  methods: {
    getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
  },
  computed: {
    pieData() {
      const backgroundColors = this.labels.map(() => this.getRandomColor());

      return {
        labels: this.labels,
        datasets: [
          {
            backgroundColor: backgroundColors,
            data: this.data,
          },
        ],
      };
    },
  },
};
</script>
<style></style>
