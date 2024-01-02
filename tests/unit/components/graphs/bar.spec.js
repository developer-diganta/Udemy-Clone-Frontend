import { mount } from "@vue/test-utils";
import BarChart from "../../../../src/components/Graphs/Bar"; // Adjust the path to your component

describe("BarChart.vue", () => {
  jest.spyOn(console, "warn").mockImplementation(() => {});

  it("renders the bar chart with the provided data and options", () => {
    const totalCourses = 10;
    const pendingCourses = 3;
    const publishedCourses = 7;

    const wrapper = mount(BarChart, {
      props: {
        totalCourses,
        pendingCourses,
        publishedCourses,
      },
    });

    // Check if the component renders successfully
    expect(wrapper.exists()).toBe(true);

    // Check if the chart has the expected data and options
    const chartData = wrapper.vm.barData;
    const chartOptions = wrapper.vm.options;

    expect(chartData.labels).toEqual([
      "Total Courses",
      "Published Courses",
      "Pending Courses",
    ]);
    expect(chartData.datasets.length).toBe(1);
    expect(chartData.datasets[0].label).toBe("Courses");
    expect(chartData.datasets[0].backgroundColor).toBe("#008080");
    expect(chartData.datasets[0].data).toEqual([
      totalCourses,
      pendingCourses,
      publishedCourses,
    ]);

    expect(chartOptions.responsive).toBe(true);
    expect(chartOptions.maintainAspectRatio).toBe(false);
    expect(chartOptions.options.scales.y.stepSize).toBe(1);
  });

  // Add more test cases for interactions and edge cases if needed
});
