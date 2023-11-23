<template>

  <router-view></router-view>
  <snack-bar></snack-bar>

</template>

<script>
import axios from "axios";
import CheckOut from "./views/common/CheckOut.vue";
import backend_url from "./globals/globals";
import SnackBar from "./ui/SnackBar.vue";

export default {
  components: { CheckOut, SnackBar },
watch:{
  '$store.state.common.theme'(){
    if(this.$store.state.common.theme==='light'){
      document.querySelector("body").classList.remove('dark')
      document.querySelectorAll("img").forEach(img => img.classList.remove('undark'));

    }else{
      document.querySelector("body").classList.add('dark')
      document.querySelectorAll("img").forEach(img => img.classList.add('undark'));


    }
  }
},
  async created() {
    console.log(this.$store.state.user.name);

    console.log(localStorage.getItem("type") === "student");
    if (
      this.$store.state.user.name === "" &&
      localStorage.getItem("type") === "student"
    ) {
      try {
        const res = await this.$store.dispatch("student/getStudentProfile");
        this.$store.commit(
          "user/setUserName",
          this.$store.state.student.profile.name,
        );
      } catch (error) {
        console.log(error);
        return 0;
      }
    } else if (
      this.$store.state.user.name == "" &&
      localStorage.getItem("type") === "instructor"
    ) {
      try {
        await this.$store.dispatch("instructor/getInstructorProfileOnLoad");

        console.log(res);

      } catch (error) {
        return 0;
      }
    }
  },
};
</script>

<style>
.container {
  margin-left: 9rem !important;
  margin-right: 9rem !important;
}
.container-secondary {
  margin-left: 3rem !important;
  margin-right: 3rem !important;
}
.list-style-none {
  list-style-type: none;
}

.dark{
  filter:invert(1) hue-rotate(180deg)
}
.undark{
  filter: invert(1) hue-rotate(180deg);
}
.m-2 {
  margin: 5px !important;
}
@media only screen and (max-width: 792px) {
  .container {
    margin-left: 0px !important;
    margin-right: 0px !important;
  }
  .container-secondary {
    margin-left: 0px !important;
    margin-right: 0px !important;
  }
}
.centered {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.pointer {
  cursor: pointer;
}
.v-application__wrap {
  min-height: 0 !important;
}

.center-absolute {
  position: absolute !important;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.w-100 {
  width: 100% !important;
  background: red;
}

</style>
