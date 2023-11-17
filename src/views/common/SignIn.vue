<template>
  <div id="email-form" class="center-absolute" style="margin-top: -5%">
    <v-img
      :width="300"
      aspect-ratio="16/9"
      :src="require('../../assets/uc.png')"
    ></v-img>
    <h3 style="margin-top: -5%">
      Hi there! Please enter your credentials to continue
    </h3>
    <div id="sign-up-form" style="width: 50%">
      <v-sheet class="mx-auto">
        <v-form @submit.prevent="signInSubmit">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            prepend-inner-icon="mdi-email"
            placeholder="Email"
          ></v-text-field>
          <v-text-field
            type="password"
            v-model="password"
            prepend-inner-icon="mdi-key"
            placeholder="Password"
          ></v-text-field>
          <v-btn type="submit" block class="mt-2">Continue</v-btn>
        </v-form>
      </v-sheet>
    </div>
    <alert
      v-if="credentialsMismatch"
      :message="errorMessage"
      variant="tonal"
      color="error"
    ></alert>
    <alert
      v-if="credentialsMatch"
      message="Login Successful! Redirecting to home page."
      variant="tonal"
      color="success"
    ></alert>
  </div>
</template>
<script>
import axios from "axios";
import backendUrl from "../../globals/globals";
import Alert from "../../ui/Alert.vue";
import emailValidation from "@/utils/validation-rules/emailValidation";
export default {
  name: "SignInForm",
  components: { Alert },
  props: ["header"],
  data: () => ({
    email: "",
    password: "",
    type: "",
    credentialsMatch: false,
    credentialsMismatch: false,
    errorMessage: "",
    emailRules: [emailValidation],
  }),
  computed: {
    endPoint() {
      return this.type === "instructor" || this.type === "student"
        ? this.type === "instructor"
          ? "instructor"
          : "student"
        : "none";
    },
  },
  methods: {
    /**
     * Handle form submission for signing in.
     *
     * @param {Event} e - The form submission event.
     */
    async signInSubmit(e) {
      try {
        const res = await this.$store.dispatch("user/signInSubmit", {
          email: this.email,
          password: this.password,
          endPoint: this.endPoint,
          router: this.$router,
        });
        this.credentialsMismatch = false;
        this.credentialsMatch = true;
        if (res === "otp") this.$router.push("/otp");
        else {
          if (
            this.$store.state.user.name === "" &&
            localStorage.getItem("type") === "student"
          ) {
            try {
              const res = await this.$store.dispatch(
                "student/getStudentProfile",
              );
              this.$store.commit(
                "user/setUserName",
                this.$store.state.student.profile.name,
              );
            } catch (error) {
              console.log(error);
              return 0;
            }
          } else if (
            this.$store.state.user.name == "" &&
            localStorage.getItem("type") === "instructor"
          ) {
            try {
              await this.$store.dispatch(
                "instructor/getInstructorProfileOnLoad",
              );

              console.log(res);
            } catch (error) {
              return 0;
            }
          }
          this.$router.push(`/${this.type}/home`);
        }
      } catch (error) {
        this.errorMessage = error;
        this.credentialsMismatch = true;
        this.credentialsMatch = false;
      }
    },
  },
  mounted() {
    this.type = this.$route.params.id;
    this.emailRules.push(emailValidation);
    this.endPoint === "none" ? this.$router.push("/") : null;
  },
};
</script>
<style scoped>
#email-form {
  width: 100%;
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
