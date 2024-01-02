<!-- Page to allow instructor to add a new course. Fills in details like title, -->

<template>
  <div style="padding: 3%; background: black; color: white" class="mb-5">
    <h1>{{ $t("Create Course") }}</h1>
  </div>
  <section id="add-course">
    <h3>{{ $t("Please fill in the new course details") }}</h3>
    <v-divider width="100px"></v-divider>
    <v-form
      @submit.prevent="addCourse"
      id="add-course-form"
      @input="formEdited = true"
    >
      <v-sheet :elevation="6" style="padding: 3%" rounded>
        <v-text-field
          required
          v-model="title"
          :rules="titleRules"
          :label="$t('Title*')"
          variant="outlined"
          prepend-inner-icon="mdi-format-title"
          data-cy="title"
        ></v-text-field>
        <v-textarea
          required
          :label="$t('Description*')"
          rows="2"
          v-model="description"
          class="input"
          variant="outlined"
          prepend-inner-icon="mdi-text"
          data-cy="desc"
        ></v-textarea>
        <div class="mb-3">
          <v-chip
            @click="removeCat(index)"
            v-for="(category, index) in categories"
            :key="index"
            >{{ category }}</v-chip
          >
        </div>
        <v-text-field
          v-model="singleCategory"
          :label="$t('Categories')"
          variant="outlined"
          prepend-inner-icon="mdi-cards"
          data-cy="cat"
        >
          <template v-if="singleCategory.length" v-slot:append>
            <v-icon
              @click.prevent="addCategory"
              color="primaryTheme"
              data-cy="addcat"
            >
              mdi-plus
            </v-icon>
          </template>
        </v-text-field>

        <v-text-field
          type="number"
          v-model="price"
          :label="$t('Price (₹)*')"
          :rules="priceRules"
          variant="outlined"
          prepend-inner-icon="mdi-currency-inr"
          data-cy="price"
        ></v-text-field>
        <v-text-field
          type="number"
          v-model="discount"
          :label="$t('Discount (%)')"
          :rules="discountRules"
          variant="outlined"
          prepend-inner-icon="mdi-percent"
          data-cy="discount"
        ></v-text-field>

        <v-file-input
          :label="$t('Thumbnail')"
          chips
          accept="image/*"
          class="input"
          variant="outlined"
          @change="handleFileChange($event)"
        ></v-file-input>

        <v-btn
          type="submit"
          block
          class="mt-2"
          color="primaryTheme"
          :disabled="!formEdited"
          data-cy="sub"
          >{{ $t("Submit") }}</v-btn
        >
      </v-sheet>
    </v-form>
  </section>
  <div class="mt-5">
    <Footer />
  </div>
</template>
<script>
import Navbar from "../../components/Navbar/Navbar.vue";
import axios from "axios";
import backend_url from "@/globals/globals";
import titleValidation from "../../utils/validation-rules/titleValidation";
import priceValidation from "../../utils/validation-rules/priceValidation";
import discountValidation from "../../utils/validation-rules/discountValidation";
import Footer from "@/components/Common/Footer.vue";

export default {
  components: {
    Navbar,
    Footer,
  },
  data: () => ({
    title: "",
    discount: 0,
    price: 0,
    description: "",
    categories: [],
    singleCategory: "",
    formEdited: false,
    newCategory: "a",
    titleRules: [titleValidation],
    priceRules: [priceValidation],
    discountRules: [discountValidation],
    thumbnail: "",
  }),
  methods: {
    /**
     * Removes a category from the list based on its index
     * @param {number} id - Index of the category to remove
     */
    removeCat(id) {
      this.categories.splice(id, 1);
    },

    /**
     * Handles the change of a file input, specifically for thumbnail
     * Reads the uploaded file and sets the thumbnail for display
     * @param {Event} event - File change event
     */
    handleFileChange(event) {
      const reader = new FileReader();

      // When the file is read, set the result as the thumbnail
      reader.onload = (e) => {
        this.thumbnail = e.target.result;
      };

      // Read the uploaded file
      reader.readAsDataURL(event.target.files[0]);
    },

    /**
     * Adds a new course after validating required fields
     * Dispatches an action to add the course
     * Redirects to the view page of the newly added course
     */
    async addCourse() {
      // Validate required fields before adding a course
      if (
        this.title.length === 0 ||
        this.description.length === 0 ||
        this.price === 0
      ) {
        // Show an error message if required fields are not filled
        this.$store.dispatch("snackbar/showSnackbar", {
          message: "Please enter the required fields",
          type: "Error",
        });
        return;
      }

      try {
        // Prepare course data
        const course = {
          title: this.title,
          description: this.description,
          price: this.price,
          discount: this.discount,
          categories: this.categories,
          thumbnail: this.thumbnail,
        };

        // Dispatch action to add the course
        await this.$store.dispatch("instructor/addCourseInstructor", {
          course,
        });

        // Redirect to the view page of the last added course
        this.$router.push(
          `/instructor/course/view/${this.$store.state.instructor.lastCourseAdded._id}`,
        );
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Adds a category to the list of categories for the course
     */
    addCategory() {
      this.categories.push(this.singleCategory);
      this.singleCategory = "";
    },
  },
};
</script>
<style scoped>
#add-course {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}
#add-course-form {
  width: 60%;
  padding: 2%;
}
</style>
