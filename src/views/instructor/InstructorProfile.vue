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
        <v-textarea
          label="Bio"
          v-model="bio"
          rows="2"
          class="input"
        ></v-textarea>
        <v-img
          :width="300"
          aspect-ratio="16/9"
          cover
          :src="profileImage"
        ></v-img>
        <v-file-input
          label="Profile Image"
          chips
          accept="image/*"
          class="input"
          @change="handleFileChange($event)"
        ></v-file-input>
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
      bio: "",
      profileImage: "",
      imgChanged: false,
    };
  },
  methods: {
    async submitForm() {
      const updatedProfile = {
        name: this.name,
        bio: this.bio,
      };

      if (this.imgChanged) {
        updatedProfile.profileImage = this.profileImage;
      }

      console.log(updatedProfile);

      const res = await this.$store.dispatch(
        "updateInstructorProfile",
        updatedProfile,
      );
      console.log(res);
    },
    handleFileChange(event) {
      this.imgChanged = true;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileImage = e.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    },
    async getInstructorProfile() {
      const res = await this.$store.dispatch("getInstructorProfile");
      console.log(res);
      this.name = res.data.instructor.name;
      this.bio = res.data.instructor.bio;
      this.profileImage = res.data.instructor.profileImage;
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
    await this.getInstructorProfile();
  },
};
</script>
<style scoped>
.form-width {
  width: 60%;
}
</style>
