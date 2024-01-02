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
      // Initializing chart options
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: this.title, // Title for the pie chart
          },
        },
      },
    };
  },
  methods: {
    /**
     * Generates a random color for the pie chart segments
     * @returns {string} - Randomly generated color in hex format
     */
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
    /**
     * Constructs data for the pie chart
     * @returns {Object} - Data for the pie chart
     */
    pieData() {
      // Generating random background colors for segments
      const backgroundColors = this.labels.map(() => this.getRandomColor());

      return {
        labels: this.labels, // Labels for the pie chart segments
        datasets: [
          {
            backgroundColor: backgroundColors, // Background colors for segments
            data: this.data, // Data values for segments
          },
        ],
      };
    },
  },
};
</script>
<style></style>
