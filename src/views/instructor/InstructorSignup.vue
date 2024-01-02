<template>
  <section id="instructor-signup">
    <h3>Lets Get Your Profile Filled</h3>
    <div class="container" id="form-area">
      <div class="d-none d-lg-flex">
        <v-img
          :src="require('../../assets/success.svg')"
          :style="{ maxWidth: '70%' }"
          class="img"
          alt=""
        ></v-img>
      </div>
      <div id="sign-up-form">
        <sign-up-form></sign-up-form>
      </div>
    </div>
  </section>
  <div class="mt-5">
    <Footer />
  </div>
</template>
<script>
import SignUpForm from "../../components/signUp/TeacherSignUpForm.vue";
import Footer from "@/components/Common/Footer.vue";

export default {
  components: { SignUpForm, Footer },
  name: "InstructorSignup",
  mounted() {
    localStorage.removeItem("otpValidated");
  },
};
</script>

<style scoped>
#instructor-signup {
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  gap: 40px;
}
#form-area {
  display: flex;
  justify-content: center;
  align-items: center;
}
#instructor-signup div:nth-child(1) {
  width: 40%;
  height: 100%;
}

.img {
  width: 10%;
}

@media only screen and (max-width: 792px) {
  #instructor-signup {
    display: block;
  }
  #form-area {
    margin-top: 20px;
  }
}
</style>
