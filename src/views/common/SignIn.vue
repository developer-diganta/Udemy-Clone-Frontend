<template>
  <div id="email-form">
    <h3>Hi there! Please enter your credentials to continue</h3>
    <div id="sign-up-form" style="width: 50%">
      <v-sheet class="mx-auto">
        <v-form @submit.prevent="signInSubmit">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
          ></v-text-field>
          <v-text-field v-model="password" label="Password"></v-text-field>
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
    emailRules: [
      (value) => {
        if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) return true;
        return "You must enter an email";
      },
    ],
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
    async signInSubmit(e) {
      try {
        const res = await axios.post(`${backendUrl}/${this.endPoint}/login`, {
          email: this.email,
          password: this.password,
        });
        localStorage.clear();
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("_id", res.data._id);
        localStorage.setItem("type", this.type);
        this.credentialsMismatch = false;
        this.credentialsMatch = true;
        this.$store.commit("user/setUserName", { name: res.data.name });
        this.$router.push(`/${this.type}/home`);
      } catch (error) {
        console.log(error);
        this.errorMessage = error.response.data.message;
        this.credentialsMismatch = true;
        this.credentialsMatch = false;
      }
    },
  },
  mounted() {
    this.type = this.$route.params.id;
    this.endPoint === "none" ? this.$router.push("/") : null;
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
