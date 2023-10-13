<template>
  <navbar></navbar>
  <v-row class="container-secondary">
    <v-col cols="12" md="8">
      <div class="mt-3">

        <video-player :currentVideo="currentVideo.videoLink"></video-player>

      </div>
      <h2>{{currentVideo.title}} (Preview)</h2>
    </v-col>
    <v-col cols="12" md="4">
      <v-card :loading="loading" class="mx-auto my-4" max-width="374">
        <template v-slot:loader="{ isActive }">
          <v-progress-linear
            :active="isActive"
            color="deep-purple"
            height="4"
            indeterminate
          ></v-progress-linear>
        </template>

        <v-img
          cover
          height="250"
          :src="course.thumbnail"
        ></v-img>

        <v-card-item>
          <v-card-title>{{course.title}}</v-card-title>

          <v-card-subtitle>
            <span class="me-1">{{instructor.name}}</span>

            <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
          </v-card-subtitle>
        </v-card-item>

        <v-card-text>
          <v-row align="center" class="mx-0">
            <v-rating
              :model-value="course.rating"
              color="amber"
              density="compact"
              half-increments
              readonly
              size="small"
            ></v-rating>

            <div class="text-grey ms-4">
              {{course.rating}} ({{course.enrollments}} learners)
            </div>
          </v-row>

          <div class="my-4 text-subtitle-1">
            <div v-if="!course.discount" class=" font-weight-black">₹ {{course.price}}</div>
            <div v-else><span class=" font-weight-black">₹ {{currentPrice + " "}} </span><span class="text-decoration-line-through"> {{course.price}}</span>{{" (" + this.course.discount + "%)"}}</div>

            <div>{{course.description}}</div>
          </div>
        </v-card-text>

        <v-divider class=""></v-divider>

        <v-card-title>Categories</v-card-title>

        <div class="px-4">
          <v-chip-group >
           <v-chip v-for="(category,index) in course.categories" :key="index">{{category}}</v-chip>
          </v-chip-group>
        </div>

        <v-card-actions>
          <v-btn color="primaryTheme" variant="tonal" @click="reserve">
            Enroll
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import Navbar from "@/components/Navbar/Navbar.vue";
import VideoPlayer from "@/components/Video/VideoPlayer.vue";

export default {
  components: { Navbar, VideoPlayer },
  data() {
    return {
      course: {},
      loading: false,
      selection: 1,
      instructor: {},
      currentVideo:""
    };
  },
  methods: {
    async getCourse() {
      const res = await this.$store.dispatch("fetchSingleCourse", {
        courseId: this.$route.params.id,
      });
      console.log(res);
      return res;
    },
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
  },
  computed:{
    currentPrice(){
      return this.course.price-(this.course.price/100*this.course.discount).toFixed(2)
    }
  },
  async created() {
    this.course = await this.getCourse();
   this.instructor = this.course.instructor;
   this.currentVideo =  this.course.lessons[0].videos[0]
  },
};
</script>
<style></style>
