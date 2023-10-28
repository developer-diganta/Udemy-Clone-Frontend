<!-- Page to allow instructor to add a new course. Fills in details like title, -->

<template>
  <section id="add-course">
    <h3>Please fill in the course details</h3>
    <v-form @submit.prevent="addCourse" id="add-course-form">
      <v-text-field
        v-model="title"
        :rules="titleRules"
        label="Title"
      ></v-text-field>
      <v-textarea
        label="Description"
        rows="2"
        v-model="description"
        class="input"
      ></v-textarea>
      <v-text-field
        v-model="singleCategory"
        @click.insert="addCategory"
        label="Categories"
      ></v-text-field>

      <v-text-field
        type="number"
        v-model="price"
        label="Price"
        :rules="priceRules"
      ></v-text-field>
      <v-text-field
        type="number"
        v-model="discount"
        label="Discount"
        :rules="discountRules"
      ></v-text-field>

      <v-file-input
        label="Thumbnail"
        chips
        accept="image/*"
        class="input"
      ></v-file-input>

      <v-btn type="submit" block class="mt-2">Submit</v-btn>
    </v-form>
  </section>
</template>
<script>
import Navbar from "../../components/Navbar/Navbar.vue";
import axios from "axios";
import backend_url from "@/globals/globals";
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
    titleRules: [
      (value) => {
        if (
          value.length >= 4 &&
          value.length <= 50 &&
          /^[a-zA-Z0-9]+$/.test(value.replace(/\s/g, ""))
        )
          return true;

        if (value.length < 4 || value.length > 50)
          return "Title length should be between 4 and 50 characters";
        else if (!/^[a-zA-Z0-9]+$/.test(value.replace(/\s/g, "")))
          return "Invalid Characters";
      },
    ],
    priceRules: [
      (value) => {
        if (isNaN(value)) return "Should be a number";
        return true;
      },
    ],
    discountRules: [
      (value) => {
        if (value >= 10 && value <= 100) return true;
        return "Discount should be between 10 and 100";
      },
    ],
  }),
  methods: {
    async addCourse() {
      try {
        const course = {
          title: this.title,
          description: this.description,
          price: this.price,
          discount: this.discount,
          categories: this.categories,
        };
        const response = await this.$store.dispatch("addCourseInstructor", {
          course,
        });

        console.log(response.data);

        this.$router.push(`/instructor/course/view/${response.data._id}`);
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
}
</style>
