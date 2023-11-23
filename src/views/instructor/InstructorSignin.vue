<template>
  <section id="instructor-signup">
    <sign-in></sign-in>
  </section>
  <div  class="mt-5">
    <Footer/>
    </div>
</template>
<script>
import SignIn from "@/components/signUp/SignIn.vue";
import Footer from '@/components/Common/Footer.vue';

export default {
  components: { SignIn,Footer },
  name: "InstructorSignin",
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
</style>
