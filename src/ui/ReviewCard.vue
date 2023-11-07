<template>
  <div class="d-flex mt-10">
    <img
      src="https://studyinfinite.com/wp-content/uploads/avatars/456/avatar-bpfull.jpg"
      style="height: 30px; width: 30px"
    />
    <div class="text-left ml-5">
      <h4 class="text-left" data-value="reviewer">{{ review.reviewer }}</h4>
      <div class="text-left mt-2">
        <v-rating
          readonly
          half-increments
          :model-value="review.rating"
          length="5"
          :size="32"
          color="yellow-darken-3"
          density="compact"
          style="display: inline"
        />
        <p style="display: inline">{{ moment(review.createdOn).fromNow() }}</p>
      </div>
      <p class="mt-2 mb-2">{{ review.review }}</p>
    </div>
  </div>
  <v-divider></v-divider>
</template>
<script>
import moment from "moment";
export default {
  props: ["review"],
  data() {
    return {
      moment,
    };
  },
};
</script>
<style></style>
