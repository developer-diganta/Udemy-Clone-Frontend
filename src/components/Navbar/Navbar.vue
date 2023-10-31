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

  <nav class="d-none d-lg-block" style="box-shadow: 0px 0px 2px 1px #008080">
    <div class="navbar-content container">
      <h3 @click="redirectToHome" class="pointer">Udemy Clone</h3>
      <ul>
        <li>
          <search></search>
        </li>

        <li v-if="$store.state.user.type === 'instructor'">
          <v-btn
            @click="redirectToAddCourse"
            color="primaryTheme"
            style="color: white"
            icon="mdi-plus"
            size="x-small"
          ></v-btn>
        </li>
        <li>
          <v-btn
            style="background-color: #008080; color: white"
            icon="mdi-school"
            size="x-small"
            v-bind="props"
            @click="redirectToAllCourses"
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
              <v-list-item-title class="nav-profile">
                <span style="font-size: 18px; font-weight: bold">{{
                  $store.state.user.name
                }}</span>
                <br />
                {{ $store.state.user.email }}
              </v-list-item-title>
              <v-divider></v-divider>
              <v-list-item
                v-for="(item, index) in account"
                :key="index"
                :value="index"
              >
                <v-list-item-title @click="redirect(item.title)">{{
                  item.title
                }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </li>

        <!-- <li @click="logout">Logout</li> -->
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

.nav-profile {
  padding: 10%;
  font-size: 12px;
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
  }),

  methods: {
    redirectToAddCourse() {
      this.$router.push("/instructor/course/add");
    },
    redirectToAllCourses() {
      this.$router.push("/instructor/courseslist");
    },
    async logout() {
      await this.$store.dispatch("logout", this.$router);
    },
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
    redirectToHome() {
      this.$router.push(`/${this.$store.state.user.type}/home`);
    },
  },

  computed: {
    account() {
      const baseAccount = [{ title: "Profile" }, { title: "Logout" }];

      if (this.$store.state.user.type === "student") {
        baseAccount.splice(1, 0, {
          title: "Enrolled Courses",
        });
      }
      return baseAccount;
    },
  },

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
