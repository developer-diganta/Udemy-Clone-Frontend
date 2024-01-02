<template>
  <v-sheet class="d-flex justify-center flex-column align-center mt-6">
    <v-card
      class="d-flex justify-center flex-column align-center p-3 prof-card"
    >
      <h3>{{ $t("Your Profile") }}</h3>
      <v-form
        class="form-width"
        @submit.prevent="submitForm"
        @input="formEdited = true"
        density="compact"
      >
        <v-text-field
          v-model="name"
          :rules="rules"
          density="compact"
          :label="$t('Name')"
          :readonly="!edit"
          variant="outlined"
          prepend-inner-icon="mdi-account"
        ></v-text-field>
        <v-text-field
          v-model="email"
          :rules="rules"
          density="compact"
          :label="$t('Email')"
          readonly="readonly"
          variant="outlined"
          prepend-inner-icon="mdi-email"
        ></v-text-field>
        <v-btn
          type="button"
          block
          class="mt-2"
          color="primaryTheme"
          style="width: 10%"
          v-if="!edit"
          @click="edit = true"
          >{{ $t("Edit Profile") }}</v-btn
        >
        <v-btn
          type="submit"
          block
          class="mt-2"
          color="primaryTheme"
          style="width: 10%"
          :disabled="!formEdited"
          v-if="edit"
          >{{ $t("Submit") }}</v-btn
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
      formEdited: false,
      edit: false,
    };
  },
  methods: {
    async submitForm() {
      const updatedProfile = {
        name: this.name,
      };

      await this.$store.dispatch(
        "student/updateStudentProfile",
        updatedProfile,
      );
      this.formEdited = false;
      this.$store.dispatch("snackbar/showSnackbar", {
        message: "Profile Updated",
        type: "Success",
      });
      this.edit = false;
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
      this.formEdited = true;
    },
  },
  async created() {
    await this.getStudentProfile();
    this.formEdited = false;
  },
};
</script>
<style scoped>
.form-width {
  width: 60%;
}
.prof-card {
  width: 40%;
  padding: 20px;
}
@media only screen and (max-width: 792px) {
  .form-width {
    width: 100%;
  }
  .prof-card {
    width: 100%;
  }
}
</style>
