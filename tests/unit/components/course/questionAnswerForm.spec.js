import { mount } from "@vue/test-utils";
import AskQuestionForm from "../../../../src/components/Course/QuestionAnswerForm"; // Adjust the path to your component
import Vuex from "vuex";

describe("AskQuestionForm.vue", () => {
  jest.spyOn(console, "warn").mockImplementation(() => {});
  const addQuestion = jest.fn();
  const store = new Vuex.Store({
    actions: {
      addQuestion,
    },
  });

  it("submits a question when the form is filled out and submitted", async () => {
    const courseId = "course123";

    const wrapper = mount(AskQuestionForm, {
      props: {
        courseId,
      },
      global: {
        plugins: [store],
      },
    });

    await wrapper.setData({
      question: {
        title: "Sample Question",
        description: "This is a sample question description.",
      },
    });

    await wrapper.find("v-form").trigger("submit");

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted("question-submitted")).toBeTruthy();

    const emittedData = wrapper.emitted("question-submitted")[0][0];
    expect(wrapper.vm.question.title).toBe("Sample Question");
    expect(wrapper.vm.question.description).toBe(
      "This is a sample question description.",
    );
  });
});
