export default {
  /**
   * Sorts the revenue data in ascending order based on the 'createdAt' property of payment details.
   *
   * @param {Object} state - The Vuex store state object containing revenue data.
   * @returns {Array} A sorted array of revenue data in ascending order.
   */
  sortedRevenue(state) {
    return state.revenue.sort((a, b) => {
      return (
        new Date(a.paymentDetails.createdAt) -
        new Date(b.paymentDetails.createdAt)
      );
    });
  },
};
