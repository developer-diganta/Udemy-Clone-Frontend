import { mount } from "@vue/test-utils";
import Pie from "../../../../src/components/Graphs/Pie";

describe("Pie.vue", () => {
  it("renders the pie chart with the provided data and options", () => {
    const labels = ["Category A", "Category B", "Category C"];
    const data = [25, 40, 35];
    const title = "Pie Chart Example";

    const wrapper = mount(Pie, {
      props: {
        labels,
        data,
        title,
      },
    });

    expect(wrapper.exists()).toBe(true);

    const chartData = wrapper.vm.pieData;
    const chartOptions = wrapper.vm.options;

    expect(chartData.labels).toEqual(labels);
    expect(chartData.datasets.length).toBe(1);
    expect(chartData.datasets[0].backgroundColor).toHaveLength(data.length);
    expect(chartData.datasets[0].data).toEqual(data);

    expect(chartOptions.responsive).toBe(true);
    expect(chartOptions.maintainAspectRatio).toBe(false);
    expect(chartOptions.plugins.title.display).toBe(true);
    expect(chartOptions.plugins.title.text).toBe(title);
  });
});
