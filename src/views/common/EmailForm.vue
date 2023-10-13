<template>
  <div v-if="!otpSent" id="email-form">
    <h3>Please Enter Your Email To Continue</h3>
    <div id="sign-up-form" style="width: 50%">
      <v-sheet class="mx-auto">
        <v-form @submit.prevent="emailFormSubmit">
          <v-text-field
            v-model="email"
            :rules="rules"
            label="Email"
          ></v-text-field>
          <v-btn type="submit" block class="mt-2">Continue</v-btn>
        </v-form>
      </v-sheet>
    </div>
  </div>
  <div v-else id="email-form">
    <h3>OTP Sent! Please enter your OTP to continue</h3>
    <div id="sign-up-form" style="width: 50%">
      <v-sheet class="mx-auto">
        <v-form @submit.prevent="otpValidate">
          <v-text-field v-model="otp" label="OTP"></v-text-field>
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
    email: "dbanik@argusoft.com",
    emailToken: "",
    otpSent: false,
    otp: "",
    type: "",
    otpValidationError: false,
    otpValidationSuccess: false,
    rules: [
      (value) => {
        if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) return true;

        return "You must enter an email";
      },
    ],
  }),
  methods: {
    async emailFormSubmit(e) {
      const res = await this.$store.dispatch("emailFormSubmit", {
        email: this.email,
      });

      if (
        typeof res.data === "object" &&
        res.data !== null &&
        "emailToken" in res.data
      ) {
        this.emailToken = res.data.emailToken;
        this.otpSent = true;
      }
    },
    async otpValidate() {
      try {
        this.otpValidationError = false;
        const res = await this.$store.dispatch("otpValidate", {
          token: this.emailToken,
          otp: this.otp,
        });
        this.otpValidationSuccess = true;
        localStorage.setItem("otpValidated", true);
        localStorage.setItem("signUpEmail", this.email);
        localStorage.setItem("signUpEmailToken", this.emailToken);
        setTimeout(() => {
          if (this.type === "teacher") {
            this.$router.push("/instructor/signup");
          } else {
            this.$router.push("/student/signup");
          }
        }, 1000);
      } catch (err) {
        this.otpValidationError = true;
      }
    },
  },
  mounted() {
    this.type = this.$route.params.id;
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
