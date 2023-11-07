import { shallowMount } from "@vue/test-utils";
import LineChart from "../../../../src/components/Graphs/LineGraph"; // Adjust the path to your component

describe("LineChart.vue", () => {
  it("renders the line chart with the provided data and options", () => {
    const yearData = [10, 20, 15, 25, 30, 35, 40, 45, 50, 55, 60, 65];
    const title = "Yearly Data";

    const wrapper = shallowMount(LineChart, {
      props: {
        yearData,
        title,
      },
    });

    // Check if the component exists
    expect(wrapper.exists()).toBe(true);

    // Check if the chart data and options are as expected
    const chartData = wrapper.vm.lineData;
    const chartOptions = wrapper.vm.options;

    expect(chartData.labels).toEqual([
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
    ]);
    expect(chartData.datasets.length).toBe(1);
    expect(chartData.datasets[0].label).toBe(title);
    expect(chartData.datasets[0].backgroundColor).toBe("#008080");
    expect(chartData.datasets[0].data).toEqual(yearData);

    expect(chartOptions.responsive).toBe(true);
  });
});
