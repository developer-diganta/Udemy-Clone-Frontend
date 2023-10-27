<template>
  <navbar></navbar>
  <router-view></router-view>
  <!-- <Footer/> -->
</template>
<script>
import Navbar from "@/components/Navbar/Navbar.vue";
import Footer from '@/components/Common/Footer.vue';
export default {
  components: { Navbar, Footer },
};
</script>
<style></style>
