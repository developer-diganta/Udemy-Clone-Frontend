<template>
  <div class="d-flex mt-10">
    <img
      src="https://studyinfinite.com/wp-content/uploads/avatars/456/avatar-bpfull.jpg"
      style="height: 30px; width: 30px"
    />
    <div class="text-left ml-5">
      <h4 class="text-left" data-value="reviewer">{{ name }}</h4>
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
import axios from "axios";
import backend_url from "@/globals/globals";
export default {
  props: ["review"],
  data() {
    return {
      moment,
      name: "",
    };
  },
  methods: {
    /**
     * Fetches the name of a student using their ID from the backend
     * @returns {String} - Name of the student
     */
    async getName() {
      const res = await axios.get(
        `${backend_url}/student/name?id=${this.review.reviewer}`,
      );
      return res.data;
    },

    /**
     * Sets the 'name' data property by fetching the name using 'getName' method upon component creation
     */
    async created() {
      this.name = await this.getName();
    },
  },
};
</script>
<style></style>
