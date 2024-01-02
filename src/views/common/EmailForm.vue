<template>
  <div id="email-form">
    <h3>
      OTP Has Been Sent To Your email address! Please enter your OTP to continue
    </h3>
    <div id="sign-up-form" style="width: 50%">
      <v-sheet class="mx-auto">
        <v-form @submit.prevent="otpValidate" data-value="form">
          <v-text-field v-model="otp" label="OTP"></v-text-field>
          <v-otp-input
            variant="solo-filled"
            v-model="otp"
            type="text"
          ></v-otp-input>
          <v-btn type="submit" block class="mt-2">Continue</v-btn>
        </v-form>
      </v-sheet>
    </div>

    <alert
      v-if="otpValidationError"
      message="OTP didnot match"
      variant="tonal"
      color="error"
    ></alert>
    <alert
      v-if="otpValidationSuccess"
      message="OTP matched! Redirecting to profile signup"
      variant="tonal"
      color="success"
    ></alert>
  </div>
</template>
<script>
import axios from "axios";
import backendUrl from "../../globals/globals";
import Alert from "../../ui/Alert.vue";

export default {
  name: "EmailForm",
  components: { Alert },
  data: () => ({
    otpSent: false,
    otp: "",
    type: "",
    email: "",
    otpValidationError: false,
    otpValidationSuccess: false,
  }),
  methods: {
    /**
     * Validates OTP (One-Time Password) for user authentication
     * If successful, sets authentication details in localStorage and redirects to respective home page
     * If an error occurs, sets validation error flag and handles the error silently
     */
    async otpValidate() {
      try {
        // Reset validation error flag
        this.otpValidationError = false;

        // Dispatches an action to validate OTP for authentication
        const res = await this.$store.dispatch("otpValidate", {
          otp: this.otp,
          email: this.email,
          type: this.type,
        });

        // Sets flags and stores authentication details upon successful OTP validation
        this.otpValidationSuccess = true;
        localStorage.setItem("otpValidation", 1);
        const token = res.headers.authorization.split(" ")[1];
        localStorage.setItem("token", token);
        localStorage.setItem("_id", res.data._id);

        // Redirects to the respective home page after a delay
        setTimeout(() => {
          if (this.type === "instructor") {
            this.$router.push("/instructor/home");
          } else {
            this.$router.push("/student/home");
          }
        }, 1000);
      } catch (err) {
        // Sets validation error flag if OTP validation fails
        this.otpValidationError = true;
      }
    },
  },
  watch: {
    email() {
      if (!this.email) {
        this.$router.push("/instructor/signup");
      }
    },
  },
  created() {
    this.email = localStorage.getItem("email");
    this.type = localStorage.getItem("type");
    console.log(this.email);
    this.$store.dispatch("emailFormSubmit", { email: this.email });
    this.otpSent = true;
    console.log(this.type);
  },
};
</script>
<style scoped>
#email-form {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
button {
  background: #37d6d6;
}
</style>
