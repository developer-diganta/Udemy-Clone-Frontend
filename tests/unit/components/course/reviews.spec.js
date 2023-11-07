import { shallowMount } from "@vue/test-utils";
import RatingOverview from "../../../../src/components/Course/Reviews";
import Vuex from "vuex";

describe("RatingOverview.vue", () => {
  // Mock the store actions and getters as needed
  const addReview = jest.fn();
  const user = {
    _id: "user123",
  };
  jest.spyOn(console, "warn").mockImplementation(() => {});

  const store = new Vuex.Store({
    state: { user },
    actions: {
      "student/submitReview": addReview,
    },
    getters: {
      // Define your getters as needed
    },
  });

  it("calculates the total rating correctly", () => {
    const reviews = [{ rating: 4 }, { rating: 3 }, { rating: 5 }];

    const wrapper = shallowMount(RatingOverview, {
      props: {
        reviews,
      },
      global: {
        plugins: [store],
      },
    });

    const totalRating = wrapper.vm.totalRatings;
    expect(totalRating).toBe(12); // 4 + 3 + 5
  });

  it("filters self review correctly", () => {
    const reviews = [
      { reviewer: "user123", rating: 4 },
      { reviewer: "user456", rating: 3 },
      { reviewer: "user789", rating: 5 },
    ];

    const wrapper = shallowMount(RatingOverview, {
      props: {
        reviews,
      },
      global: {
        plugins: [store],
      },
    });

    const otherReviews = wrapper.vm.otherReviews;
    expect(otherReviews).toHaveLength(2);

    // Make sure the self review is filtered out
    expect(otherReviews.some((review) => review.reviewer === "user123")).toBe(
      false,
    );
  });

  it("calculates ratings group correctly", () => {
    const reviews = [
      { rating: 4.2 },
      { rating: 3.8 },
      { rating: 2.4 },
      { rating: 4.9 },
    ];

    const wrapper = shallowMount(RatingOverview, {
      props: {
        reviews,
      },
      global: {
        plugins: [store],
      },
    });

    const ratingsGroup = wrapper.vm.ratingsGroup;
    expect(ratingsGroup).toEqual([0, 0, 1, 1, 2]);
  });
});
