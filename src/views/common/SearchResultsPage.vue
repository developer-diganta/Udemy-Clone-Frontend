<template lang="">
  <v-progress-circular
    class="mx-auto my-auto"
    v-if="loading"
    indeterminate
    :size="128"
  ></v-progress-circular>
  <div v-if="!loading" class="container">
    <h3 class="text-h4">
      {{ searchResults.length }} result<span v-if="searchResults.length > 1"
        >s</span
      >
      for "{{ searchQuery }}"
    </h3>
    <v-divider class="mb-5"></v-divider>
    <iterable
      :items="searchResults"
      page="1"
      :key="searchQuery && searchResults"
      itemsPerPage="5"
      type="search"
    ></iterable>
  </div>
</template>
<script>
import CourseCard from "@/components/Course/CourseCard.vue";
import Iterable from "@/components/Common/Iterable.vue";

export default {
  components: {
    CourseCard,
    Iterable,
  },
  data() {
    return {
      searchQuery: "",
      searchResults: [],
      loading: true,
    };
  },
  methods: {
    async fetchSearchResults() {
      console.log(this.searchQuery);
      const res = await this.$store.dispatch(
        "searchResultsFromAPI",
        this.searchQuery,
      );
      this.loading = false;
      console.log("123");
      console.log(this.searchQuery);
      this.searchResults = res.map((course) => course.item);
    },
  },
  watch: {
    $route(to, from) {
      this.searchQuery = this.$route.query.searchQuery;
      this.fetchSearchResults();
    },
  },
  async created() {
    this.searchQuery = this.$route.query.searchQuery;
    await this.fetchSearchResults();
    console.log(this.searchResults);
  },
};
</script>
<style lang=""></style>
