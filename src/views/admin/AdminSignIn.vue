<template>
  <section class="centered" style="margin-top:-5%">
    <img
    style="
    height:30%;
    width:30%;
    margin-bottom:-4%;
    "
    
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
        ></v-text-field>
        <v-text-field
          density="compact"
          v-model="password"
          label="Password"
          prepend-inner-icon="mdi-key"
          variant="outlined"
          type="password"
        ></v-text-field>

        <v-btn
          :loading="loading"
          type="submit"
          block
          class="mt-2"
          text="Submit"
          color="primaryTheme"
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
      try{
        const res = await this.$store.dispatch("adminSignIn", {
          userName: this.userName,
          password: this.password,
        });
        localStorage.clear();
        localStorage.setItem("type", "admin");
        localStorage.setItem("token", res.token);
        localStorage.setItem("userName", res.userName);
        this.$router.push("home");
      }catch(error){
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
