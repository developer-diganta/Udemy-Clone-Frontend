<template>
  <router-view></router-view>
</template>

<script>
import axios from "axios";
import CheckOut from "./views/common/CheckOut.vue";
import backend_url from "./globals/globals";
export default {
  components: { CheckOut },
  async created() {
    if (
      this.$store.state.user.name == "" &&
      localStorage.getItem("type") === "student"
    ) {
      try {
        const res = await this.$store.dispatch("getStudentProfile");
        console.log(res.data.name);
        this.$store.commit("user/setUserName", res.data.name);
      } catch (error) {
        return 0;
      }
    } else if (
      this.$store.state.user.name == "" &&
      localStorage.getItem("type") === "instructor"
    ) {
      try {
        const res = await this.$store.dispatch("getInstructorProfile");
        this.$store.commit("user/setUserName", res.data.name);
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

.m-2 {
  margin: 5px !important;
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
</style>
