<template>
  <div>
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        permanent
        color="primaryTheme"
        style="color: white !important ; width: 200px"
      >
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          :title="$t('Admin')"
          nav
        >
        </v-list-item>

        <v-divider></v-divider>
        <v-list nav>
          <v-list-item
            prepend-icon="mdi-home-city"
            :title="$t('Home')"
            value="HOME"
            @click="adminRoute('home')"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-book-education"
            :title="$t('Courses')"
            value="courses"
            @click="adminRoute('courses')"
            data-cy="courses"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account"
            :title="$t('Instructors')"
            value="instructors"
            @click="adminRoute('instructors')"
            data-cy="instructors"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account-multiple"
            @click="adminRoute('students')"
            :title="$t('Students')"
            value="students"
            data-cy="students"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-cash"
            @click="adminRoute('revenue')"
            :title="$t('Revenue')"
            value="revenue"
            data-cy="revenue"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-exclamation"
            @click="adminRoute('coursestatus')"
            :title="$t('Course Status')"
            value="courseStatus"
            data-cy="coursestatus"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-logout"
            @click="logout()"
            :title="$t('Log Out')"
            value="logout"
            data-cy="logout"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main></v-main>
    </v-layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      drawer: true, // Controls the state of the drawer
      rail: true, // Indicates the status of the rail
    };
  },
  methods: {
    /**
     * Redirects to the specified admin route
     * @param {string} routeName - The name of the route to navigate to
     */
    adminRoute(routeName) {
      this.$router.push(`/admin/${routeName}`); // Navigates to the specified admin route
    },
    /**
     * Logs out the admin user
     */
    async logout() {
      localStorage.clear(); // Clears local storage
      await this.$store.commit("admin/logout"); // Commits the admin logout action
      this.$router.push("/"); // Redirects to the root path
    },
  },
};
</script>
<style></style>
