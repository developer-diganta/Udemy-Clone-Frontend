<template>
  <div>
    <form @submit.prevent="submit">
      <v-text-field
        v-model="email.value.value"
        :error-messages="email.errorMessage.value"
        style="
             {
              outline: 'red';
            }
          "
        class="input"
        label="E-mail"
        variant="outlined"
        prepend-inner-icon="mdi-email"
      ></v-text-field>

      <v-text-field
        v-model="name.value.value"
        :error-messages="name.errorMessage.value"
        class="input"
        label="Name"
        variant="outlined"
        prepend-inner-icon="mdi-account"
      ></v-text-field>

      <v-text-field
        v-model="password.value.value"
        :error-messages="password.errorMessage.value"
        class="input"
        label="Password"
        variant="outlined"
        prepend-inner-icon="mdi-key"
        type="password"
      ></v-text-field>

      <div>
        <v-btn class="me-4" type="submit"> submit </v-btn>
        <v-btn @click="handleReset"> clear </v-btn>
      </div>
    </form>
  </div>
  <div class="text-center mt-5">
    Already A User?
    <span style="color: coral" @click="() => $router.push('/signin/student')"
      >Sign In</span
    >
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useField, useForm } from "vee-validate";
import backend_url from "../../globals/globals";
import axios from "axios";
import { useStore } from "vuex";
import emailValidation from "@/utils/validation-rules/emailValidation";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    name(value) {
      if (value?.length >= 4 && value?.length <= 25) return true;

      return "Name needs to be between 4 and 25 characters.";
    },
    email: emailValidation,
    password(value) {
      if (
        value?.length >= 8 &&
        /[A-Z]/.test(value) &&
        /[a-z]/.test(value) &&
        /\d/.test(value) &&
        /[\W_]/.test(value)
      )
        return true;

      return "Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one digit, and one special character.";
    },
  },
});
const name = useField("name");
const phone = useField("phone");
const email = useField("email");
const password = useField("password");

email.value.value = "chrysaor07@gmail.com";
name.value.value = "John";
password.value.value = "Abc@1234";
const submit = async () => {
  try {
    const res = await store.dispatch("user/studentSignUp", {
      email: email.value.value,
      name: name.value.value,
      password: password.value.value,
    });

    localStorage.clear();

    if (res.data._id) {
      localStorage.setItem("_id", res.data._id);
    } else if (res.data.otpValidation === 0) {
      localStorage.setItem("otpValidation", res.data.otpValidation);
    }

    localStorage.setItem("email", res.data.email);
    localStorage.setItem("type", res.data.type);

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
