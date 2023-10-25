<template>
  <admin-navbar></admin-navbar>
  <div style="margin-left: 60px">
    <router-view></router-view>
  </div>
</template>
<script>
import AdminNavbar from "@/components/Navbar/AdminNavbar.vue";
export default {
  components: { AdminNavbar },
};
</script>
<style></style>
