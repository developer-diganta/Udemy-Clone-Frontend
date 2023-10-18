<template>
  <v-card width="400" prepend-icon="mdi-arrow-top-right" color="white">
    <template v-slot:title>
      {{ title }}
    </template>
    <v-divider></v-divider>
    <ul v-for="(stat, index) in stats" :key="index">
      <li @click="viewCourse(stat._id)">
        <img
          src="https://businance.com/wp-content/uploads/2019/12/2378649-775x400.jpg"
          alt=""
          class="icon-trending"
        />
        <p class="trending-course-list">{{ stat.title }}</p>
      </li>
      <v-divider></v-divider>
    </ul>
  </v-card>
</template>
<script>
export default {
  props: ["stats", "title"],
  mounted() {
    console.log(this.stats);
  },
  methods: {
    viewCourse(courseId) {
      this.$router.push(`/instructor/course/view/${courseId}`);
    },
  },
};
</script>
<style scoped>
.trending-course-list {
  padding: 13px;
}
li:hover {
  background: #0ae1e1;
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
