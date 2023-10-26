<template>
  <div>
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
        color="primaryTheme"
        style="color: white !important"
      >
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          title="Admin"
          nav
        >
          <template v-slot:append>
            <v-btn
              variant="text"
              icon="mdi-chevron-left"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>
        <v-list nav>
          <v-list-item
            prepend-icon="mdi-home-city"
            title="Home"
            value="HOME"
            @click="adminRoute('home')"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-book-education"
            title="Courses"
            value="courses"
            @click="adminRoute('courses')"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account"
            title="Instructors"
            value="instructors"
            @click="adminRoute('instructors')"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account-multiple"
            @click="adminRoute('students')"
            title="Students"
            value="students"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-cash"
            @click="adminRoute('revenue')"
            title="Revenue"
            value="revenue"
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
  },
};
</script>
<style></style>
