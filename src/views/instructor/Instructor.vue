<template>
  <navbar class="d-none d-sm-block" navtype="instructor"></navbar>
  <router-view></router-view>
  <bottom-nav class="d-sm-none"></bottom-nav>
  <div  class="mt-5">
  <Footer/>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar/Navbar.vue";
import Footer from "@/components/Common/Footer.vue";
import BottomNav from "@/components/Navbar/BottomNav.vue";
export default {
  components: { Navbar, Footer, BottomNav },
};
</script>
<style></style>
