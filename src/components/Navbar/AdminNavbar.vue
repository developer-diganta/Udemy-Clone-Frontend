<template>
  <div>
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        permanent
        color="primaryTheme"
        style="color: white !important ;width:200px"
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
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account"
            :title="$t('Instructors')"
            value="instructors"
            @click="adminRoute('instructors')"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account-multiple"
            @click="adminRoute('students')"
            :title="$t('Students')"
            value="students"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-cash"
            @click="adminRoute('revenue')"
            :title="$t('Revenue')"
            value="revenue"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-exclamation"
            @click="adminRoute('coursestatus')"
            :title="$t('Course Status')"
            value="courseStatus"
          ></v-list-item>
          <v-list-item
          prepend-icon="mdi-logout"
          @click="logout()"
          :title="$t('Log Out')"
          value="logout"
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
      drawer: true,
      rail: true,
    };
  },
  methods: {
    adminRoute(routeName) {
      this.$router.push(`/admin/${routeName}`);
    },
    async logout(){
      localStorage.clear();
      await this.$store.commit("admin/logout")
      this.$router.push("/")

    }
  },
};
</script>
<style></style>