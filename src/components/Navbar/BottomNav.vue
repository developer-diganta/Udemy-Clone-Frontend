<template lang="">
  <v-layout class="overflow-visible" style="height: 56px">
    <v-bottom-navigation grow>
      <v-btn value="homee" @click="redirect('home')">
        <v-icon>mdi-home</v-icon>

        <span>Home</span>
      </v-btn>

      <v-btn value="recent" @click="redirect('profile')">
        <v-icon>mdi-account</v-icon>

        <span>Profile</span>
      </v-btn>

      <v-btn value="courses" @click="redirect('enrolledcourses')">
        <v-icon>mdi-book-education</v-icon>

        <span>Courses</span>
      </v-btn>

      <v-btn value="nearby">
        <v-icon>mdi-magnify</v-icon>

        <span>Search</span>
      </v-btn>

      <v-btn value="nearby">
        <v-icon>mdi-logout</v-icon>

        <span>LogOut</span>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>
<script>
export default {
  methods: {
    async redirect(title) {
      if (title === "Logout") {
        await this.logout();
      } else {
        this.$router.push(
          `/${this.$store.state.user.type}/${title
            .split(" ")
            .join("")
            .toLowerCase()}`,
        );
      }
    },
  },
};
</script>
<style lang=""></style>
