<template>
  <div>
    <form id="search" @submit.prevent="search">
      <input
        type="text"
        placeholder="Search Courses"
        v-model="searchKey"
        @input="onInput"
        @click="searchClicked"
      />
      <button class="search-btn">
        <v-icon class="rounded-icon search-icon">mdi-magnify</v-icon>
      </button>
    </form>
    <v-sheet
      elevation="16"
      class="search-results"
      border
      rounded
      v-if="searchResults.length"
    >
      <div
        v-for="(result, index) in searchResults"
        :key="index"
        class="solo-search"
      >
        <v-img
          :width="50"
          aspect-ratio="16/9"
          cover
          src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
        ></v-img>
        <p>{{ result.title }}</p>
      </div>
    </v-sheet>
  </div>
</template>
<script>
import _ from "lodash";
import axios from "axios";
import backend_url from "@/globals/globals";
export default {
  data: () => ({
    searchKey: "",
    searchResults: "",
  }),
  methods: {
    onInput: _.debounce(async function () {
      // if(searchKey==="")
      const searchResultsFromAPI = await this.$store.dispatch(
        "searchResultsFromAPI",
        this.searchKey,
      );
      this.searchResults = searchResultsFromAPI.map((result) => {
        return {
          title: result.item.title,
          thumbnail: result.item.thumbnail,
        };
      });
    }, 1000),
    clearSearchResultsOnOutsideClick(event) {
      const searchContainer = this.$el;

      if (!searchContainer.contains(event.target)) {
        this.searchResults = [];
      }
    },
    searchClicked(e) {
      this.searchKey = e.target.value;
      this.onInput();
    },
    search() {
      this.$router.push(`/student/search?searchQuery=${this.searchKey}`);
    },
  },
  beforeRouteUpdate(to, from, next) {
    // This hook is called when the route is changing but the component is being reused.
    // You can refetch data here.
    this.searchKey = to.query.searchQuery || ""; // Update searchKey from the new route
    this.onInput(); // Re-fetch data
    next(); // Don't forget to call next() to continue the route navigation.
  },
  mounted() {
    document.addEventListener("click", this.clearSearchResultsOnOutsideClick);
  },
  beforeDestroy() {
    document.removeEventListener(
      "click",
      this.clearSearchResultsOnOutsideClick,
    );
  },
};
</script>

<style scoped>
form {
  display: flex !important;
  flex-direction: row !important;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 2px;
}
input {
  width: 400px;
  background: white;
  min-height: 30px;
  border: 1px solid #008080;
  padding-left: 10px;
  padding-right: 10px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
input:focus {
  outline: none;
  border-width: 2px;
}
.search-btn {
  background: #008080;
  min-height: 30px;
  padding-left: 3px;
  padding-right: 3px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
.search-icon {
  color: white;
}
.search-results {
  width: 400px;
  position: absolute;
  z-index: 999;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.solo-search {
  display: flex;
  width: 100%;
  padding: 10px;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid gray;
}
.solo-search:last-child {
  border-bottom: none;
}
.solo-search p {
  width: 1000%;
  margin-left: 5px;
}
</style>
