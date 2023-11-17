<!-- Page to allow instructor to add a new course. Fills in details like title, -->

<template>
  <div style="padding: 3%; background: black; color: white" class="mb-5">
    <h1>Create Course</h1>
  </div>
  <section id="add-course">
    <h3>Please fill in the new course details</h3>
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
          label="Title*"
          variant="outlined"
          prepend-inner-icon="mdi-format-title"
        ></v-text-field>
        <v-textarea
          required
          label="Description*"
          rows="2"
          v-model="description"
          class="input"
          variant="outlined"
          prepend-inner-icon="mdi-text"
        ></v-textarea>
        <div class="mb-3">
          <v-chip v-for="(category, index) in categories" :key="index">{{
            category
          }}</v-chip>
        </div>
        <v-text-field
          v-model="singleCategory"
          label="Categories"
          variant="outlined"
          prepend-inner-icon="mdi-cards"
        >
          <template v-if="singleCategory.length" v-slot:append>
            <v-icon @click.prevent="addCategory" color="primaryTheme">
              mdi-plus
            </v-icon>
          </template>
        </v-text-field>

        <v-text-field
          type="number"
          v-model="price"
          label="Price (₹)*"
          :rules="priceRules"
          variant="outlined"
          prepend-inner-icon="mdi-currency-inr"
        ></v-text-field>
        <v-text-field
          type="number"
          v-model="discount"
          label="Discount (%)"
          :rules="discountRules"
          variant="outlined"
          prepend-inner-icon="mdi-percent"
        ></v-text-field>

        <v-file-input
          label="Thumbnail"
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
          >Submit</v-btn
        >
      </v-sheet>
    </v-form>
  </section>
</template>
<script>
import Navbar from "../../components/Navbar/Navbar.vue";
import axios from "axios";
import backend_url from "@/globals/globals";
import titleValidation from "../../utils/validation-rules/titleValidation";
import priceValidation from "../../utils/validation-rules/priceValidation";
import discountValidation from "../../utils/validation-rules/discountValidation";
export default {
  components: {
    Navbar,
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
    handleFileChange(event) {
      console.log("PPPPPPPP");
      const reader = new FileReader();
      reader.onload = (e) => {
        this.thumbnail = e.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    },
    async addCourse() {
      console.log(this.thumbnail);
      console.log(this.title.length);
      console.log(this.description.length === 0);
      console.log(this.price);
      if (
        this.title.length === 0 ||
        this.description.length === 0 ||
        this.price === 0
      ) {
        console.log("POPOPOPOPOPO");
        this.$store.dispatch("snackbar/showSnackbar", {
          message: "Please enter the required fields",
          type: "Error",
        });
        return;
      }
      try {
        const course = {
          title: this.title,
          description: this.description,
          price: this.price,
          discount: this.discount,
          categories: this.categories,
          thumbnail: this.thumbnail,
        };
        await this.$store.dispatch("instructor/addCourseInstructor", {
          course,
        });

        console.log(this.$store.state.instructor.lastCourseAdded._id);

        this.$router.push(
          `/instructor/course/view/${this.$store.state.instructor.lastCourseAdded._id}`,
        );
      } catch (error) {
        console.log(error);
      }
    },
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
