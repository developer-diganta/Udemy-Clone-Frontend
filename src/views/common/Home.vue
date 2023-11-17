<template lang="">
  <navbar class="d-none d-lg-block"></navbar>
  <div style="position: relative">
    <!-- <v-btn  rounded="xl" size="large" style="position:absolute;z-index:999999;width:max-content;bottom:10px;;left:45%;" elevation="8" color="secondaryCoral">Sign In</v-btn> -->
    <v-carousel hide-delimiters>
      <v-carousel-item
        src="https://images.unsplash.com/photo-1587691592099-24045742c181?auto=format&fit=crop&q=80&w=1473&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        cover
      >
        <div class="overlay">
          <carousel-text
            text="Learn Anytime,Anywhere"
            subtext="Flexible Learning, Anytime, Anywhere, Unlock Your Potential."
            class="c-text"
          ></carousel-text>
        </div>
      </v-carousel-item>

      <v-carousel-item
        src="https://images.unsplash.com/photo-1659301254614-8d6a9d46f26a?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVhY2hlcnxlbnwwfHwwfHx8MA%3D%3D"
        cover
      >
        <div class="overlay"></div>
      </v-carousel-item>

      <v-carousel-item
        src="https://images.unsplash.com/photo-1536337005238-94b997371b40?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzQ2fHx0ZWFjaGVyfGVufDB8fDB8fHww"
        cover
      >
        <div class="overlay"></div>
      </v-carousel-item>
    </v-carousel>
  </div>
  <section>
    <h3 style="text-align: center">Explore the trending courses</h3>
    <v-divider></v-divider>
    <v-row no-gutters>
      <v-col
        v-for="(course, index) in trendingCoursesList"
        :key="index"
        cols="12"
        align="center"
        lg="4"
      >
        <v-sheet class="ma-2 pa-2">
          <course-card :course="course" type="all"></course-card>
        </v-sheet>
      </v-col>
    </v-row>
  </section>
  <section>
    <h3 style="text-align: center">Hear from our users</h3>
    <v-divider></v-divider>
    <div class="d-flex mt-5">
      <v-card
        class="mx-auto"
        color="#26c6da"
        theme="dark"
        max-width="400"
        prepend-icon="mdi-twitter"
        title="Twitter"
      >
        <template v-slot:prepend>
          <v-icon size="x-large"></v-icon>
        </template>

        <v-card-text class="text-h5 py-2">
          "Turns out semicolon-less style is easier and safer in TS because most
          gotcha edge cases are type invalid as well."
        </v-card-text>

        <v-card-actions>
          <v-list-item class="w-100">
            <template v-slot:prepend>
              <v-avatar
                color="grey-darken-3"
                image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
              ></v-avatar>
            </template>

            <v-list-item-title>Evan You</v-list-item-title>

            <v-list-item-subtitle>Vue Creator</v-list-item-subtitle>

            <template v-slot:append>
              <div class="justify-self-end">
                <v-icon class="me-1" icon="mdi-heart"></v-icon>
                <span class="subheading me-2">256</span>
                <span class="me-1">·</span>
                <v-icon class="me-1" icon="mdi-share-variant"></v-icon>
                <span class="subheading">45</span>
              </div>
            </template>
          </v-list-item>
        </v-card-actions>
      </v-card>

      <v-card
        class="mx-auto"
        color="#26c6da"
        theme="dark"
        max-width="400"
        prepend-icon="mdi-twitter"
        title="Twitter"
      >
        <template v-slot:prepend>
          <v-icon size="x-large"></v-icon>
        </template>

        <v-card-text class="text-h5 py-2">
          "Turns out semicolon-less style is easier and safer in TS because most
          gotcha edge cases are type invalid as well."
        </v-card-text>

        <v-card-actions>
          <v-list-item class="w-100">
            <template v-slot:prepend>
              <v-avatar
                color="grey-darken-3"
                image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
              ></v-avatar>
            </template>

            <v-list-item-title>Evan You</v-list-item-title>

            <v-list-item-subtitle>Vue Creator</v-list-item-subtitle>

            <template v-slot:append>
              <div class="justify-self-end">
                <v-icon class="me-1" icon="mdi-heart"></v-icon>
                <span class="subheading me-2">256</span>
                <span class="me-1">·</span>
                <v-icon class="me-1" icon="mdi-share-variant"></v-icon>
                <span class="subheading">45</span>
              </div>
            </template>
          </v-list-item>
        </v-card-actions>
      </v-card>
    </div>
  </section>
  <section class="mt-5">
    <h3 style="text-align: center">Why Us?</h3>
    <v-divider></v-divider>
    <v-row align="center" justify="center" class="mt-5">
      <v-col cols="auto">
        <v-card
          class="mx-auto"
          max-width="344"
          title="Icons"
          subtitle="prepend-icon and append-icon"
          prepend-icon="mdi-account"
          append-icon="mdi-check"
        >
          <v-card-text
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod.</v-card-text
          >
        </v-card>
      </v-col>

      <v-col cols="auto">
        <v-card
          class="mx-auto"
          max-width="344"
          title="Icons"
          subtitle="prepend and append"
        >
          <template v-slot:prepend>
            <v-icon icon="mdi-account" color="primary"></v-icon>
          </template>
          <template v-slot:append>
            <v-icon icon="mdi-check" color="success"></v-icon>
          </template>
          <v-card-text
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod.</v-card-text
          >
        </v-card>
      </v-col>

      <v-col cols="auto">
        <v-card
          class="mx-auto"
          max-width="344"
          title="Avatars"
          subtitle="prepend-avatar and append-avatar"
          prepend-avatar="https://cdn.vuetifyjs.com/images/logos/v-alt.svg"
          append-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
        >
          <v-card-text
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod.</v-card-text
          >
        </v-card>
      </v-col>

      <v-col cols="auto">
        <v-card
          class="mx-auto"
          max-width="344"
          title="Avatars"
          subtitle="prepend and append"
        >
          <template v-slot:prepend>
            <v-avatar color="blue-darken-2">
              <v-icon icon="mdi-alarm"></v-icon>
            </v-avatar>
          </template>
          <template v-slot:append>
            <v-avatar size="24">
              <v-img
                src="https://cdn.vuetifyjs.com/images/john.png"
                alt="John"
              ></v-img>
            </v-avatar>
          </template>
          <v-card-text
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod.</v-card-text
          >
        </v-card>
      </v-col>
    </v-row>
    <Footer />
  </section>

  <bottom-nav class="d-lg-none"></bottom-nav>
</template>
<script>
import Navbar from "@/components/Navbar/Navbar.vue";
import Footer from "@/components/Common/Footer.vue";
import BottomNav from "@/components/Navbar/BottomNav.vue";
import CourseCard from "@/components/Course/CourseCard.vue";

export default {
  components: { Navbar, Footer, BottomNav, CourseCard },
  data() {
    return {
      trendingCoursesList: [],
    };
  },
  mounted() {
    this.fetchTrendingCourses();
  },
  methods: {
    /**
     * Fetch trending courses and update the trendingCoursesList.
     */
    async fetchTrendingCourses() {
      try {
        const response = await this.$store.dispatch(
          "common/fetchTrendingCourses",
        );
        this.trendingCoursesList = this.$store.state.common.trendingCourses;
        console.log(this.trendingCoursesList, "Trending Courses List");
      } catch (error) {}
    },
  },
};
</script>
<style lang=""></style>
