<template>
    <div>
      <div id="filter-buttons">
        <v-btn
          icon="mdi-sort-calendar-ascending"
          class="ml-auto mr-2"
          variant="tonal"
          size="small"
          @click="sortItems(1)"
        ></v-btn>
        <v-btn
          icon="mdi-sort-calendar-descending"
          class="mr-2"
          variant="tonal"
          size="small"
          @click="sortItems(-1)"
        ></v-btn>
      </div>
      <v-card
        border
        v-for="(item, index) in currentItems"
        :key="index"
      >
        <question-answer :questionAnswers="item" ></question-answer>
      </v-card>
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
  
  export default {
    components: { QuestionAnswer,  },
    props: ["items", "page", "itemsPerPage"],
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
      sortItems(order) {
  switch (order) {
    case 1:
      this.itemsCopy = this.itemsCopy.sort((a, b) => new Date(a.askedOn) - new Date(b.askedOn));
      break;
    case -1:
      this.itemsCopy = this.itemsCopy.sort((a, b) => new Date(b.askedOn) - new Date(a.askedOn));
      break;
  }
  this.updateCurrentItems();
},
      updateCurrentItems() {
        const startIndex = this.currentPage * parseInt(this.itemsPerPage);
        const endIndex = startIndex + parseInt(this.itemsPerPage);
        this.currentItems = this.itemsCopy.slice(startIndex, endIndex);
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
      this.itemsCopy = [...this.items]; 
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
  