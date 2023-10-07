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
          disabled
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
  
        <!-- <v-textarea label="Bio" rows="2" class="input"></v-textarea>
  
        <v-file-input
          label="Profile Image"
          chips
          accept="image/*"
          class="input"
        ></v-file-input> -->
  
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
  import axios from "axios";
  const { handleSubmit, handleReset } = useForm({
    validationSchema: {
      name(value) {
        if (value?.length >= 4 && value?.length <= 25) return true;
  
        return "Name needs to be between 4 and 25 characters.";
      },
      email(value) {
        if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;
  
        return "Must be a valid e-mail.";
      },
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
  
  email.value.value = localStorage.getItem("signUpEmail") || "test@test.com";
  name.value.value = "John";
  password.value.value = "Abc@1234";
  const submit = async () => {
    try {
      const res = await axios.post(`${backend_url}/student`, {
        name: name.value.value,
        password: password.value.value,
        token: localStorage.getItem("signUpEmailToken"),
      });
      const token = res.headers.authorization.split(" ")[1];
      localStorage.clear();
      localStorage.setItem("token", token);
      localStorage.setItem("_id", res.data._id);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("type", res.data.type);
    } catch (error) {}
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
  