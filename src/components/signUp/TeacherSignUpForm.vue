<template>
  <div>
    <form @submit.prevent="submit">
      <v-text-field
        v-model="email.value.value"
        :error-messages="email.errorMessage.value"
        class="input"
        label="E-mail"
      ></v-text-field>

      <v-text-field
        v-model="name.value.value"
        :error-messages="name.errorMessage.value"
        class="input"
        label="Name"
      ></v-text-field>

      <v-text-field
        v-model="password.value.value"
        :error-messages="password.errorMessage.value"
        class="input"
        label="Password"
      ></v-text-field>

      <v-textarea
        label="Bio"
        rows="2"
        class="input"
        v-model="bio.value.value"
      ></v-textarea>

      <v-file-input
        label="Profile Image"
        chips
        accept="image/*"
        class="input"
        @change="handleFileChange($event)"
      ></v-file-input>
      <!-- <div class="input"> -->
      <!-- <v-row>
          <v-col sm="4">
            <v-text-field placeholder="site name" v-model="newProfileAccount">
            </v-text-field>
          </v-col>
          <v-col sm="8">
            <v-row>
              <v-col sm="10">
                <v-text-field
                  placeholder="url"
                  style="display: inline !important"
                  v-model="newProfileAccountUrl"
                ></v-text-field>
              </v-col>
              <v-col sm="2">
                <v-btn icon="$plus" @click="addProfile"></v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row> -->
      <!-- </div> -->
      <!-- <v-row v-for="(profile, index) in socialLinks" :key="index" class="input">
        <v-col cols="12" sm="4" class="d-inline text-left"
          >{{ profile.name }}
        </v-col>
        <v-col cols="12" sm="1"></v-col>
        <v-col cols="12" sm="7">
          <a :href="profile.link">{{ profile.link }}</a>
        </v-col>
      </v-row> -->

      <div class="d-flex">
        <v-btn class="me-4" type="submit"> submit </v-btn>
        <v-btn @click="handleReset"> clear </v-btn>
      </div>
    </form>
  </div>
  <div class="text-center mt-5">
    Already A User?
    <span style="color: coral" @click="() => $router.push('/signin/instructor')"
      >Sign In</span
    >
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useField, useForm } from "vee-validate";
import backend_url from "../../globals/globals";
import nameValidation from "../../utils/validation-rules/nameValidation";
import emailValidation from "../../utils/validation-rules/emailValidation";
import passwordValidation from "../../utils/validation-rules/passwordValidation";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";

const router = useRouter();

const store = useStore();

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    name: nameValidation,
    email: emailValidation,
    password: passwordValidation,
  },
});
const name = useField("name");
const bio = useField("bio");
const email = useField("email");
const password = useField("password");
const profileImage = ref(null);
const newProfileAccount = ref("");
const newProfileAccountUrl = ref("");
const socialLinks = ref([]);
name.value.value = "DIGANTA";
bio.value.value = "safsafsavdaggagda";
email.value.value = "chrysaor07@gmail.com";
password.value.value = "Abc@1234";

/**
 * Add a new profile link to the socialLinks array.
 */
const addProfile = () => {
  socialLinks.value.push({
    name: newProfileAccount.value,
    link: newProfileAccountUrl.value,
  });
  console.log(socialLinks.value[0]);
};

/**
 * Handle file change event for the profile image input.
 */
const handleFileChange = (event) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    profileImage.value = e.target.result;
  };

  reader.readAsDataURL(event.target.files[0]);
};

/**
 * Handle form submission.
 */
const submit = async () => {
  try {
    await store.dispatch("user/instructorSignUp", {
      email: email.value.value,
      name: name.value.value,
      password: password.value.value,
      bio: bio.value.value,
      profileImage: profileImage._value,
      socialLinks: socialLinks.value,
    });
    router.push("/otp");
  } catch (error) {
    if (error.message === "11000") {
      store.dispatch("snackbar/showSnackbar", {
        message: "Instructor Already Exists. Please sign in",
        type: "Error",
      });
    } else {
      store.dispatch("snackbar/showSnackbar", {
        message: "There was some error",
        type: "Error",
      });
    }
  }
};
</script>
<style scoped>
.input {
  width: 35rem;
}
button {
  background: #37d6d6;
}
@media only screen and (max-width: 792px) {
  .input {
    width: 15rem;
  }
}
</style>

<style>
.v-field__outline {
  color: #37d6d6 !important;
}
</style>
