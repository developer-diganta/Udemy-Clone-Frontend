<template>
  <section id="instructor-signup">
    <sign-in></sign-in>
  </section>
</template>
<script>
import SignIn from "@/components/signUp/SignIn.vue";
export default {
  components: { SignIn },
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
