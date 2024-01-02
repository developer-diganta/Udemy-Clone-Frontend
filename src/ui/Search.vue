<template>
  <div>
    <form id="search" @submit.prevent="search">
      <input
        type="text"
        :placeholder="$t('Search Courses')"
        v-model="searchKey"
        @input="onInput"
        @click="searchClicked"
      />
      <button class="search-btn" data-cy="search">
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
  props: ["type"],
  data: () => ({
    searchKey: "",
    searchResults: "",
  }),
  methods: {
    /**
     * Debounces search input to avoid rapid API requests
     */
    onInput: _.debounce(async function () {
      // Fetch search results from the API based on the search key
      const searchResultsFromAPI = await this.$store.dispatch(
        "searchResultsFromAPI",
        {
          searchKey: this.searchKey,
        },
      );

      // Map API results to required display format
      this.searchResults = searchResultsFromAPI.map((result) => {
        return {
          title: result.item.title,
          thumbnail: result.item.thumbnail,
        };
      });
    }, 1000),

    /**
     * Clears search results when a click occurs outside the search container
     * @param {Event} event - Click event
     */
    clearSearchResultsOnOutsideClick(event) {
      const searchContainer = this.$el;

      // Check if the click is outside the search container
      if (!searchContainer.contains(event.target)) {
        this.searchResults = [];
      }
    },

    /**
     * Handles the search input click event
     * @param {Event} e - Click event
     */
    searchClicked(e) {
      // Update searchKey with the input value
      this.searchKey = e.target.value;

      // Trigger the onInput method after updating the searchKey
      this.onInput();
    },

    /**
     * Initiates the search functionality by updating the route with the search query
     */
    search() {
      // Redirect to the search page with the search query as a parameter
      this.$router.push(`search?searchQuery=${this.searchKey}`);
    },

    /**
     * Updates search functionality when the route changes
     * @param {Object} to - Route object to navigate to
     * @param {Object} from - Route object navigated from
     * @param {Function} next - Function to proceed to the next route
     */
    beforeRouteUpdate(to, from, next) {
      // Set searchKey from query parameter or default to an empty string
      this.searchKey = to.query.searchQuery || "";

      // Trigger the onInput method after updating the searchKey
      this.onInput();

      // Continue with the route update
      next();
    },

    /**
     * Attaches an event listener to clear search results on clicks outside the search container
     */
    mounted() {
      document.addEventListener("click", this.clearSearchResultsOnOutsideClick);
    },

    /**
     * Removes the event listener before the component is destroyed
     */
    beforeDestroy() {
      document.removeEventListener(
        "click",
        this.clearSearchResultsOnOutsideClick,
      );
    },
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
