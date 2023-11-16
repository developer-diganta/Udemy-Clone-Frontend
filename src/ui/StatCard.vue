<template>
  <v-card width="400" prepend-icon="mdi-arrow-top-right" color="white">
    <template v-slot:title>
      {{ title }}
    </template>
    <v-divider></v-divider>
    <ul v-for="(stat, index) in stats" :key="index">
      <li >
        <img
          :src="stat.thumbnail"
          alt=""
          class="icon-trending"
        />
        <p class="trending-course-list">{{ stat.title }}</p>
        <v-btn
        prepend-icon="mdi-eye"
        @click="viewCourse(stat._id)"
        class="ml-2"
        color="secondaryCoral"
      >
        <template v-slot:prepend>
          <v-icon color="white"></v-icon>
        </template>
  
        View

      </v-btn>
      <v-btn
      prepend-icon="mdi-pencil"
      color="secondaryCoral"
      class="ml-2"
      v-if="stat.instructor===$store.state.user._id"
      @click="editCourse(stat._id)"
    >
      <template v-slot:prepend>
        <v-icon color="white"></v-icon>
      </template>

      Edit
    </v-btn>
      </li>
      <v-divider></v-divider>
    </ul>
  </v-card>
</template>
<script>
export default {
  props: ["stats", "title"],
  mounted() {
    console.log(this.stats[0]);
    // console.log(this.$store.state.user._id)
  },
  methods: {
    viewCourse(courseId) {
      this.$router.push(`/instructor/coursepreview/${courseId}`);
    },
    editCourse(courseId){
      this.$router.push(`/instructor/course/view/${courseId}`)
    }
  },
};
</script>
<style scoped>
.trending-course-list {
  padding: 13px;
}

.icon-trending {
  height: 30px;
  width: 30px;
  border-radius: 50%;
}
li {
  display: flex;
  align-items: center;
  padding: 5px;
}
</style>
