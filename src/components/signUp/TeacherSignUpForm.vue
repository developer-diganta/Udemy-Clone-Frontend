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
      <div class="input">
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field placeholder="site name" v-model="newProfileAccount">
            </v-text-field>
          </v-col>
          <v-col cols="12" md="8">
            <v-row>
              <v-col cols="12" md="10">
                <v-text-field
                  placeholder="url"
                  style="display: inline !important"
                  v-model="newProfileAccountUrl"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="2">
                <v-btn icon="$plus" @click="addProfile"></v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
      <v-row v-for="(profile, index) in socialLinks" :key="index" class="input">
        <v-col cols="12" sm="4" class="d-inline text-left"
          >{{ profile.name }}
        </v-col>
        <v-col cols="12" sm="1"></v-col>
        <v-col cols="12" sm="7">
          <a :href="profile.link">{{ profile.link }}</a>
        </v-col>
      </v-row>

      <div>
        <v-btn class="me-4" type="submit"> submit </v-btn>
        <v-btn @click="handleReset"> clear </v-btn>
      </div>
    </form>
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

const addProfile = () => {
  console.log(newProfileAccount.value);
  console.log(newProfileAccountUrl.value);
  socialLinks.value.push({
    name: newProfileAccount.value,
    link: newProfileAccountUrl.value,
  });
  console.log(socialLinks.value[0]);
};

const handleFileChange = (event) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    profileImage.value = e.target.result;
  };

  reader.readAsDataURL(event.target.files[0]);
};

const submit = async () => {
  try {
    console.log("here");

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
    console.log(error);
  }
};
</script>
<style scoped>
.input {
  width: 35rem;
  box-sizing: border-box;
}
button {
  background: #37d6d6;
}
</style>

<style>
.v-field__outline {
  color: #37d6d6 !important;
}
</style>
