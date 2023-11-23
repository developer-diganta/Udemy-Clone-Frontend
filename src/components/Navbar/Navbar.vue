<template>
  <nav class="d-none d-lg-block" style="box-shadow: 0px 0px 2px 1px #008080">
    <div class="navbar-content container">
      <h3 @click="redirectToHome" class="pointer">
        <img :src="require('../../assets/uc.png')" height="150" width="200"/>
      </h3>
      <ul v-if="navtype === home">
        <li>
          <search></search>
        </li>
        <li>
          <v-btn color="primaryTheme" @click="() => (dialogControl = true)"
            >{{$t("Sign In")}}

            <user-dialog
              :dialogControl="dialogControl"
              :key="dialogControl"
              @dialog-close="dialogControl = false"
              type="signIn"
              title="Sign In"
            ></user-dialog>
          </v-btn>
        </li>
        <li>
          <v-btn
            color="secondaryCoral"
            style="color: white !important"
            @click="() => (dialogControlSignUp = true)"
            >{{$t("Sign Up")}}

            <user-dialog
              :dialogControl="dialogControlSignUp"
              :key="dialogControlSignUp"
              @dialog-close="dialogControlSignUp = false"
              type="signUp"
              title="Sign Up"
            ></user-dialog>
          </v-btn>
        </li>
        <li @click="themeSwitch"><v-btn              
          :style="theme==='light'?'backgroundColor: white':'backgroundColor:coral'"
          icon="mdi-brightness-4"
          size="x-small"></v-btn></li>
      </ul>
      <ul v-else>
        <li v-if="$store.state.user.type === 'student'">
          <search type="student"></search>
        </li>
        <li v-else>
          <search type="instructor"></search>
        </li>
        <li v-if="$store.state.user.type === 'instructor'">
          <v-tooltip :text="$t('Add Course')">
            <template v-slot:activator="{ props }">
              <v-btn
              v-bind="props"
              @click="redirectToAddCourse"
              color="primaryTheme"
              style="color: white"
              icon="mdi-plus"
              size="x-small"
            ></v-btn>
            </template>
          </v-tooltip>

        </li>
        <li>
          <v-tooltip :text="$t('Your Courses')">
            <template v-slot:activator="{ props }">
              <v-btn
              style="background-color: #008080; color: white"
              icon="mdi-school"
              size="x-small"
              v-bind="props"
              @click="redirectToAllCourses"
            ></v-btn>
            </template>
          </v-tooltip>

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
                  $t(item.title)
                }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </li>

        <!-- color="primaryTheme" -->
        <li @click="themeSwitch"><v-btn              
          :style="theme==='light'?'backgroundColor: white':'backgroundColor:coral'"
          icon="mdi-brightness-4"
          size="x-small"></v-btn></li>
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
import UserDialog from "@/ui/UserDialog.vue";
import Search from "../../ui/Search.vue";

export default {
  props: ["navtype"],
  components: {
    Search,
    UserDialog,
  },
  data: () => ({
    drawer: false,
    group: null,
    dialogControl: false,
    dialogControlSignUp: false,
    theme:'light'
  }),

  methods: {
    redirectToAddCourse() {
      this.$router.push("/instructor/course/add");
    },
    redirectToAllCourses() {
      if(this.$store.state.user.type==="instructor")
      this.$router.push("/instructor/courseslist");
      else
      this.$router.push("/student/enrolledcourses");

    },
    themeSwitch(){
      this.$store.commit("common/setTheme")
      this.theme = this.$store.state.common.theme;
    },
    async logout() {
      await this.$store.dispatch("common/logout", this.$router);
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
  created(){
    this.theme = this.$store.state.common.theme;

  }
};
</script>
