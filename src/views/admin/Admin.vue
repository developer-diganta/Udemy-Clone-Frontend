<template>
  <admin-navbar></admin-navbar>
  <div style="margin-left: 210px">
    <h3 class="mt-3 text-center">Admin Dashboard</h3>
    <router-view></router-view>
    <Footer />
  </div>
</template>
<script>
import AdminNavbar from "@/components/Navbar/AdminNavbar.vue";
import Footer from "@/components/Common/Footer.vue";
export default {
  components: { AdminNavbar, Footer },
};
</script>
<style></style>
