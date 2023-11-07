<template>
  <div>
    <div id="filter-buttons">
      <v-btn
        icon="mdi-sort-calendar-ascending"
        class="ml-auto mr-2"
        variant="tonal"
        size="small"
        @click="sortItems(1, 'askedOn')"
        v-if="type === 'qa'"
      ></v-btn>
      <v-btn
        icon="mdi-sort-calendar-descending"
        class="mr-2"
        variant="tonal"
        size="small"
        @click="sortItems(-1, 'askedOn')"
        v-if="type === 'qa'"
      ></v-btn>

      <div>
        Filters:
        <v-btn
          class="ml-auto mr-2"
          variant="tonal"
          size="small"
          @click="sortItems(1, 'price')"
          v-if="type === 'search'"
          >Price Lowest To Highest</v-btn
        >

        <v-btn
          class="mr-2"
          variant="tonal"
          size="small"
          @click="sortItems(-1, 'price')"
          v-if="type === 'search'"
          >Price Highest To Lowest</v-btn
        >

        <v-btn
          class="ml-auto mr-2"
          variant="tonal"
          size="small"
          @click="sortItems(1, 'rating')"
          v-if="type === 'search'"
          >Ratings</v-btn
        >

        <v-btn
          class="ml-auto mr-2"
          variant="tonal"
          size="small"
          @click="sortItems(1, 'enrollments')"
          v-if="type === 'search'"
          >Most Enrolled</v-btn
        >
      </div>
    </div>

    <div v-if="type === 'qa'" :key="currentItems">
      <v-card
        border
        data-value="qa"
        v-for="(item, index) in currentItems"
        :key="index"
      >
        <question-answer
          :questionAnswers="item"
          @qa-reloaded="qaFresh"
        ></question-answer>
      </v-card>
    </div>

    <div v-if="type === 'search'">
      <v-row>
        <v-col
          cols="12"
          md="3"
          style="margin: 10px"
          v-for="(item, index) in currentItems"
          :key="index"
        >
          <course-card
            v-if="type === 'search'"
            type="all"
            :course="item"
            border
            data-value="search"
          ></course-card>
        </v-col>
      </v-row>
    </div>

    <div class="iterable-buttons d-flex gap-2">
      <v-btn
        v-for="index in totalPages"
        :key="index"
        height="30"
        class="m-2"
        @click="nextPage(index)"
      >
        {{ index }}
      </v-btn>

      <!-- <question-answers-dialog :dialogOpen="dialogOpen" :title="item.title" :description="item.description"></question-answers-dialog> -->
    </div>
  </div>
</template>

<script>
import QuestionAnswer from "../Course/QuestionAnswer.vue";
import CourseCard from "@/components/Course/CourseCard.vue";

export default {
  components: { QuestionAnswer, CourseCard },
  emits: ["qa-fresh"],
  props: ["items", "page", "itemsPerPage", "type"],
  data() {
    return {
      currentPage: 0,
      currentItems: [],
      itemsCopy: [],
      dialogOpen: false,
    };
  },
  methods: {
    nextPage(index) {
      this.currentPage = index - 1;
      this.updateCurrentItems();
    },
    sortItems(order, field) {
      console.log("field");
      switch (order) {
        case 1:
          this.itemsCopy = this.itemsCopy.sort(
            (a, b) => new Date(a[field]) - new Date(b[field]),
          );
          break;
        case -1:
          this.itemsCopy = this.itemsCopy.sort(
            (a, b) => new Date(b[field]) - new Date(a[field]),
          );
          break;
      }
      console.log(this.itemsCopy);
      this.updateCurrentItems();
    },
    updateCurrentItems() {
      const startIndex = this.currentPage * parseInt(this.itemsPerPage);
      const endIndex = startIndex + parseInt(this.itemsPerPage);
      this.currentItems = this.itemsCopy.slice(startIndex, endIndex);
    },
    qaFresh(data) {
      this.$emit("qa-fresh", data);
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.itemsCopy.length / this.itemsPerPage);
    },
  },
  watch: {
    currentPage() {
      this.updateCurrentItems();
    },
  },
  created() {
    console.log(this.items);
    this.itemsCopy = [...this.items];
    console.log(this.type);
    this.updateCurrentItems();
  },
};
</script>

<style scoped>
#filter-buttons {
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
