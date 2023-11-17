<template>
  <navbar class="d-none d-lg-block" navtype="student"></navbar>
  <router-view></router-view>
  <bottom-nav class="d-lg-none"></bottom-nav>
  <div class="mt-10"></div>
  <Footer />
</template>
<script>
import Navbar from "@/components/Navbar/Navbar.vue";
import BottomNav from "@/components/Navbar/BottomNav.vue";
import Footer from "@/components/Common/Footer.vue";
export default {
  components: { Navbar, Footer, BottomNav },
};
</script>
<style></style>
