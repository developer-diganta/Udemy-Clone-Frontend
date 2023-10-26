<template>
  <section class="centered">
    <v-sheet width="500px">
      <v-form validate-on="submit lazy" @submit.prevent="submit">
        <v-text-field
          v-model="userName"
          label="Username"
          density="compact"
        ></v-text-field>
        <v-text-field
          density="compact"
          v-model="password"
          label="Password"
        ></v-text-field>

        <v-btn
          :loading="loading"
          type="submit"
          block
          class="mt-2"
          text="Submit"
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
    async submit() {
      const res = await this.$store.dispatch("adminSignIn", {
        userName: this.userName,
        password: this.password,
      });
      localStorage.setItem("type", "admin");
      localStorage.setItem("token", res.token);
      localStorage.setItem("userName", res.userName);
      this.$router.push("home");
    },
  },
};
</script>
<style></style>
