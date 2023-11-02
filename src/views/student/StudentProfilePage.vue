<template>
  <v-sheet class="d-flex justify-center flex-column align-center mt-6">
    <v-card
      class="d-flex justify-center flex-column align-center p-3"
      style="width: 40%; padding: 20px"
    >
      <h3>Your Profile</h3>
      <v-form class="form-width" @submit.prevent="submitForm" density="compact">
        <v-text-field
          v-model="name"
          :rules="rules"
          density="compact"
          label="Name"
        ></v-text-field>
        <v-text-field
          v-model="email"
          :rules="rules"
          density="compact"
          label="email"
        ></v-text-field>
        <v-btn
          type="submit"
          block
          class="mt-2"
          color="primaryTheme"
          style="width: 10%"
          >Submit</v-btn
        >
      </v-form>
    </v-card>
  </v-sheet>
</template>
<script>
import Navbar from "@/components/Navbar/Navbar.vue";
export default {
  components: { Navbar },
  data() {
    return {
      name: "",
      email: "",
    };
  },
  methods: {
    async submitForm() {
      const updatedProfile = {
        name: this.name,
      };

      const res = await this.$store.dispatch(
        "updateStudentProfile",
        updatedProfile,
      );
      console.log(res);
    },

    async getStudentProfile() {
      const res = await this.$store.dispatch("student/getStudentProfile");
      console.log(res);
      this.name = this.$store.state.student.profile.name;
      this.email = this.$store.state.student.profile.email;
    },
    changed(event) {
      console.log(event.target.value);
    },
  },
  watch: {
    name() {
      console.log(this.name);
    },
  },
  async created() {
    await this.getStudentProfile();
  },
};
</script>
<style scoped>
.form-width {
  width: 60%;
}
</style>
