<template>
  <!-- Main container for the instructor profile page -->
  <v-sheet class="d-flex justify-center flex-column align-center mt-6">
    <!-- Card containing the instructor profile form -->
    <v-card
      class="d-flex justify-center flex-column align-center mt-1 mb-4"
      style="width: 70%; padding: 10px"
    >
      <!-- Divider for visual separation -->
      <v-divider></v-divider>
      <!-- Section header -->
      <h3>Your Profile</h3>
      <!-- Form for updating the instructor profile -->
      <v-form
        class="form-width"
        @submit.prevent="submitForm"
        density="compact"
        @input="formEdited = true"
      >
        <!-- Text field for the instructor's name -->
        <v-text-field
          v-model="name"
          :rules="rules"
          density="compact"
          label="Name"
        ></v-text-field>
        <!-- Textarea for the instructor's bio -->
        <v-textarea
          label="Bio"
          v-model="bio"
          rows="2"
          class="input"
        ></v-textarea>
        <!-- Image field for the instructor's profile picture -->
        <v-img
          :width="300"
          aspect-ratio="16/9"
          cover
          :src="profileImage"
        ></v-img>
        <!-- File input for updating the instructor's profile picture -->
        <v-file-input
          label="Profile Image"
          chips
          accept="image/*"
          class="input"
          @change="handleFileChange($event)"
        ></v-file-input>
        <!-- Section for managing social links -->
        <h4>Your Social Links</h4>
        <!-- Loop through existing social links -->
        <v-row v-for="(social, index) in socialLinks" :key="index">
          <!-- Text field for social link name -->
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="social.name"
              density="compact"
            ></v-text-field>
          </v-col>
          <!-- Spacer column -->
          <v-col cols="1" sm="1"></v-col>
          <!-- Text field for social link URL -->
          <v-col cols="12" sm="7">
            <v-text-field
              v-model="social.link"
              density="compact"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- Section for adding new social links -->
        <v-row>
          <!-- Text field for new social link name -->
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="newSocialName"
              density="compact"
            ></v-text-field>
          </v-col>
          <!-- Spacer column -->
          <v-col cols="1" sm="1"></v-col>
          <!-- Row for new social link URL and add button -->
          <v-col cols="12" sm="7">
            <v-row>
              <!-- Text field for new social link URL -->
              <v-col cols="12" sm="11">
                <v-text-field
                  density="compact"
                  v-model="newSocialLink"
                ></v-text-field>
              </v-col>
              <!-- Add button for new social link -->
              <v-col cols="12" sm="1">
                <v-btn icon="$plus" @click="addSocial"></v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <!-- Submit button for updating the profile -->
        <v-btn
          type="submit"
          block
          class="mt-2"
          color="primaryTheme"
          style="width: 10%"
          :disabled="!formEdited"
        >
          Submit
        </v-btn>
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
      // Instructor profile data
      name: "",
      bio: "",
      profileImage: "",
      imgChanged: false,
      socialLinks: [],
      // Form state
      formEdited: false,
      // New social link data
      newSocialName: "",
      newSocialLink: "",
    };
  },
  methods: {
    // Function to handle input changes and set formEdited to true
    inputChanged() {
      this.formEdited = true;
    },
    // Function to add a new social link
    addSocial() {
      this.socialLinks.push({
        name: this.newSocialName,
        link: this.newSocialLink,
      });
      this.newSocialName = this.newSocialLink = "";
    },
    // Function to submit the instructor profile form
    async submitForm() {
      // Construct updated profile data
      const updatedProfile = {
        name: this.name,
        bio: this.bio,
        socialLinks: this.socialLinks,
      };

      // Include profile image data if changed
      if (this.imgChanged) {
        updatedProfile.profileImage = this.profileImage;
      }

      // Log the updated profile data
      console.log(updatedProfile);

      // Dispatch the update action to the store
      await this.$store.dispatch(
        "instructor/updateInstructorProfile",
        updatedProfile,
      );

      // Update local data with the latest profile information
      this.bio = this.$store.state.instructor.profile.bio;
      this.profileImage = this.$store.state.instructor.profile.profileImage;
      this.socialLinks = this.$store.state.instructor.profile.socialLinks;

      this.formEdited = false;
      // Show success message
      this.$store.dispatch("snackbar/showSnackbar", {
        message: "Profile Updated",
        type: "Success",
      });

      // Reset formEdited state
    },
    // Function to handle file change and update profile image
    handleFileChange(event) {
      this.imgChanged = true;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileImage = e.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    },
    // Function to retrieve instructor profile data
    async getInstructorProfile() {
      await this.$store.dispatch("instructor/getInstructorProfile");
      this.name = this.$store.state.instructor.profile.instructor.name;
      this.bio = this.$store.state.instructor.profile.instructor.bio;
      this.profileImage =
        this.$store.state.instructor.profile.instructor.profileImage;
      this.socialLinks =
        this.$store.state.instructor.profile.instructor.socialLinks;
    },
  },
  watch: {
    // Watchers for various data properties to trigger inputChanged
    name() {
      this.inputChanged();
    },
    bio() {
      this.inputChanged();
    },
    socialLinks() {
      this.inputChanged();
    },
    profileImage() {
      this.inputChanged();
    },
  },
  async created() {
    // Load instructor profile data on component creation
    await this.getInstructorProfile();
    // Initialize formEdited state
    this.formEdited = false;
  },
};
</script>

<style scoped>
.form-width {
  width: 90%;
}
</style>
