<template>
  <v-card class="d-lg-none">
    <v-layout>
      <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->

      <v-app-bar prominent>
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>

        <v-toolbar-title>My files</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn variant="text" icon="mdi-magnify"></v-btn>

        <v-btn variant="text" icon="mdi-filter"></v-btn>

        <v-btn variant="text" icon="mdi-dots-vertical"></v-btn>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" location="bottom" temporary>
        <v-list :items="items"></v-list>
      </v-navigation-drawer>
    </v-layout>
  </v-card>

  <nav class="d-none d-lg-block">
    <div class="navbar-content container">
      <h3>Udemy Clone</h3>
      <ul>
        <li>
          <search></search>
        </li>
        <li>
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
                style="background-color: #008080; color: white"
                icon="mdi-school"
                size="x-small"
                v-bind="props"
              ></v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in account"
                :key="index"
                :value="index"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </li>
        <li>
          <v-btn
            @click="redirectToAddCourse"
            style="background-color: #008080; color: white"
            icon="mdi-plus"
            size="x-small"
          ></v-btn>
        </li>
        <li>
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
                style="background-color: #008080; color: white"
                icon="mdi-account"
                size="x-small"
                v-bind="props"
              ></v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in account"
                :key="index"
                :value="index"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </li>
        <li @click="logout">Logout</li>
        <!-- <li>B</li>
        <li>C</li> -->
      </ul>
    </div>
  </nav>
</template>

<style scoped>
nav {
  height: 4rem;
  border-bottom: 1px solid #008080;
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #008080;
}

ul {
  display: flex;
  list-style-type: none;
  margin-left: auto;
  gap: 20px;
}
</style>

<script>
import Search from "../../ui/Search.vue";

export default {
  components: {
    Search,
  },
  data: () => ({
    drawer: false,
    group: null,
    account: [
      { title: "Profile" },
      { title: "Courses" },
      { title: "Revenue" },
      { title: "Statistics" },
      { title: "Logout" },
    ],
  }),

  methods: {
    redirectToAddCourse() {
      this.$router.push("/instructor/course/add");
    },
    async logout() {
      await this.$store.dispatch("logout");
    },
  },

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
