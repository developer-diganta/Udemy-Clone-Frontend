<template>
  <v-sheet class="d-flex justify-center flex-column align-center mt-6">
    <v-card
      class="d-flex justify-center flex-column align-center mt-1 mb-4"
      style="width: 70%; padding: 10px"
    >
      <v-divider></v-divider>
      <h3>Your Profile</h3>
      <v-form
        class="form-width"
        @submit.prevent="submitForm"
        density="compact"
        @input="formEdited = true"
      >
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
        <h4>Your Social Links</h4>
        <v-row v-for="(social, index) in socialLinks" :key="index">
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="social.name"
              density="compact"
            ></v-text-field>
          </v-col>
          <v-col cols="1" sm="1"></v-col>
          <v-col cols="12" sm="7">
            <v-text-field
              v-model="social.link"
              density="compact"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="newSocialName"
              density="compact"
            ></v-text-field>
          </v-col>
          <v-col cols="1" sm="1"></v-col>
          <v-col cols="12" sm="7">
            <v-row>
              <v-col cols="12" sm="11">
                <v-text-field
                  density="compact"
                  v-model="newSocialLink"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="1">
                <v-btn icon="$plus" @click="addSocial"></v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-btn
          type="submit"
          block
          class="mt-2"
          color="primaryTheme"
          style="width: 10%"
          :disabled="!formEdited"
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
      socialLinks: [],
      formEdited: false,
      newSocialName: "",
      newSocialLink: "",
    };
  },
  methods: {
    addSocial() {
      this.socialLinks.push({
        name: this.newSocialName,
        link: this.newSocialLink,
      });
      this.newSocialName = this.newSocialLink = "";
    },
    async submitForm() {
      const updatedProfile = {
        name: this.name,
        bio: this.bio,
        socialLinks: this.socialLinks,
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
      this.bio = res.data.bio;
      this.profileImage = res.data.profileImage;
      this.socialLinks = res.data.socialLinks;
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
      this.socialLinks = res.data.instructor.socialLinks;
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
  width: 90%;
}
</style>
