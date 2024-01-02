<template>
  <section class="centered" style="margin-top: -5%">
    <img
      style="height: 30%; width: 30%; margin-bottom: -4%"
      :src="require('../../assets/uc.png')"
    />
    <h3 class="mb-6">Admin Signin</h3>
    <v-sheet width="500px">
      <v-form validate-on="submit lazy" @submit.prevent="submit">
        <v-text-field
          v-model="userName"
          label="Username"
          density="compact"
          variant="outlined"
          prepend-inner-icon="mdi-account"
          data-cy="adminu"
        ></v-text-field>
        <v-text-field
          density="compact"
          v-model="password"
          label="Password"
          prepend-inner-icon="mdi-key"
          variant="outlined"
          type="password"
          data-cy="adminp"
        ></v-text-field>

        <v-btn
          :loading="loading"
          type="submit"
          block
          class="mt-2"
          text="Submit"
          color="primaryTheme"
          data-cy="admins"
        ></v-btn>
      </v-form>
    </v-sheet>
  </section>
</template>
<script>
export default {
  data() {
    return {
      userName: "",
      password: "",
    };
  },
  methods: {
    /**
     * Submits admin credentials for sign-in authentication
     * If successful, sets authentication details in localStorage and redirects to home
     * If an error occurs, displays a snackbar notification with the error message
     */
    async submit() {
      try {
        // Dispatches an action to authenticate admin using provided credentials
        const res = await this.$store.dispatch("adminSignIn", {
          userName: this.userName,
          password: this.password,
        });

        // Clears local storage and sets authentication details upon successful sign-in
        localStorage.clear();
        localStorage.setItem("type", "admin");
        localStorage.setItem("token", res.token);
        localStorage.setItem("userName", res.userName);

        // Redirects to the admin home page after successful authentication
        this.$router.push("home");
      } catch (error) {
        // Displays a snackbar notification with the error message if authentication fails
        this.$store.dispatch("snackbar/showSnackbar", {
          message: error.response.data.error,
          type: "Error",
        });
      }
    },
  },
};
</script>
<style></style>
