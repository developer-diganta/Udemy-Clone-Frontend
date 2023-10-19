<template>
  <div>
    <v-btn color="primaryTheme" variant="tonal" @click="redirect"
      >Enroll Course</v-btn
    >
  </div>
</template>
<script>
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
export default {
  props: ["courseId", "priceId"],
  data() {
    return {
      stripe: null,
      course: {},
    };
  },
  methods: {
    async redirect() {
      console.log(this.priceId);
      const session = await axios.post(
        "http://localhost:3000/create-checkout-session",
        {
          priceId: this.priceId,
          studentId: localStorage.getItem("_id"),
          courseId: this.courseId,
        },
      );
      console.log(session.data.url);
      window.location.href = session.data.url;
    },
  },
  async created() {
    this.stripe = await loadStripe(
      "pk_test_51O2oiwSDxAGilksA2fPBMXOJVebI20F6xBdNaGsP86v7377nWhwxflyr1YAxBHAU0LoyV0yEIF4JbRV7YCX44a9H00dPrzu0YZ",
    );

    const courseId = this.$route.params;
  },
};
</script>
<style></style>
