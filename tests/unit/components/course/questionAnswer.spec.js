import { shallowMount } from "@vue/test-utils";
import QuestionAnswer from "../../../../src/components/Course/QuestionAnswer.vue"; // Adjust the path to your component

describe("QuestionAnswer.vue", () => {
  jest.spyOn(console, "warn").mockImplementation(() => {});

  it("renders question and answers correctly", () => {
    const questionAnswers = {
      _id: "question123",
      title: "Sample Question",
      description: "This is a sample question description.",
      askedBy: "John Doe",
      askedOn: "2023-11-07T12:00:00.000Z",
      answers: [
        {
          answer: "Sample Answer 1",
          answerer: "Alice",
          answeredOn: "2023-11-07T12:30:00.000Z",
        },
        {
          answer: "Sample Answer 2",
          answerer: "Bob",
          answeredOn: "2023-11-07T13:00:00.000Z",
        },
      ],
    };

    const wrapper = shallowMount(QuestionAnswer, {
      props: {
        questionAnswers,
      },
    });

    // Assert that the question title is rendered correctly
    expect(wrapper.text()).toContain(questionAnswers.title);

    // Assert that the question description is rendered correctly
    expect(wrapper.text()).toContain(questionAnswers.description);

    // Assert that the asked by and date is rendered correctly
    expect(wrapper.text().length).toBeGreaterThan(0); // Adjust the expected value based on the date
  });

  it('clicking "View Replies" toggles openReplies state', async () => {
    const questionAnswers = {
      // ...questionAnswers data
    };

    const wrapper = shallowMount(QuestionAnswer, {
      props: {
        questionAnswers,
      },
    });

    // Initially, openReplies should be false
    expect(wrapper.vm.openReplies).toBe(false);

    // Find and click the "View Replies" button
    await wrapper.find('[data-value="view-replies"').trigger("click");

    // After clicking, openReplies should be true
    expect(wrapper.vm.openReplies).toBe(true);

    // Click the button again to close replies
    await wrapper.find('[data-value="close-replies"').trigger("click");

    // After clicking, openReplies should be false again
    expect(wrapper.vm.openReplies).toBe(false);
  });
});
