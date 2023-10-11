<template>
  <div>
    <navbar></navbar>
    <h3 class="text-center">Course Details - {{ title }}</h3>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-img
              :width="370"
              aspect-ratio="16/9"
              cover
              style="margin-bottom: 10px"
              :src="thumbnail"
            ></v-img>
            <v-file-input
              show-size
              counter
              multiple
              label="Thumbnail"
              @change="changeThumbnail($event)"
            ></v-file-input>
          </v-col>

          <v-col cols="12" md="8" style="margin-top: 10px">
            <v-row>
              <v-textarea
                v-model="description"
                rows="2"
                label="Description"
              ></v-textarea>
            </v-row>
            <v-row>
              <v-text-field
                v-model="title"
                :rules="titleRules"
                label="Title"
                required
                hide-details
              ></v-text-field>
            </v-row>
          </v-col>

          <v-divider style="margin-bottom: 30px"></v-divider>

          <v-col cols="12" md="4">
            <v-row>
              <v-text-field
                type="number"
                v-model="price"
                :rules="titleRules"
                label="Price"
              ></v-text-field>
            </v-row>

            <v-row class="mt-2">
              <v-text-field
                type="number"
                v-model="discount"
                :rules="discountRules"
                label="Discount"
              ></v-text-field>
            </v-row>
          </v-col>

          <v-col cols="12" md="8" style="margin-top: -12px">
            <v-select
              v-model="categories"
              :items="categories"
              label="Categories"
              multiple
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index < 2">
                  <span>{{ item.title }}</span>
                </v-chip>
                <span
                  v-if="index === 2"
                  class="text-grey text-caption align-self-center"
                >
                  (+{{ value.length - 2 }} others)
                </span>
              </template>
            </v-select>
            <v-text-field v-model="newCategory" label="Add Category">
              <template v-if="newCategory.length" v-slot:append>
                <v-icon @click.prevent="addCategory" color="primaryTheme">
                  mdi-plus
                </v-icon>
              </template>
            </v-text-field>
          </v-col>

          <v-divider style="margin-bottom: 30px"></v-divider>
          <v-col cols="12" md="6">
            <p class="text-center">Requirements</p>

            <v-text-field
              v-for="(requirement, index) in requirements"
              :key="index"
              v-model="requirements[index]"
              :rules="titleRules"
            ></v-text-field>
            <v-text-field v-model="newCategory" label="Add Category">
              <template v-if="newCategory.length" v-slot:append>
                <v-icon @click.prevent="addCategory" color="primaryTheme">
                  mdi-plus
                </v-icon>
              </template>
            </v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <p class="text-center">Course Materials</p>

            <v-text-field
              v-for="(material, index) in courseMaterials"
              :key="index"
              v-model="courseMaterials[index].name"
              :rules="titleRules"
            ></v-text-field>
            <v-text-field v-model="newCategory" label="Add Category">
              <template v-if="newCategory.length" v-slot:append>
                <v-icon @click.prevent="addCategory" color="primaryTheme">
                  mdi-plus
                </v-icon>
              </template>
            </v-text-field>
          </v-col>

          <!-- 
          <v-col cols="12" md="8">
            <v-file-input
              multiple
              label="File input"
              @change="videoUpload"
              name="file"
            ></v-file-input>
          </v-col> -->
        </v-row>
      </v-container>
      <div class="text-center pb-10">
        <v-btn
          type="submit"
          style="margin-right: 15px"
          variant="tonal"
          size="large"
          elevation="4"
          color="primaryTheme"
          rounded="sm"
          >Submit</v-btn
        >
        <v-btn
          type="button"
          style="margin-left: 15px"
          variant="tonal"
          size="large"
          elevation="4"
          color="primaryTheme"
          rounded="sm"
          >Add Lessons</v-btn
        >
      </div>
    </v-form>
  </div>
</template>

<script>
import backend_url from "@/globals/globals";
import Navbar from "../../components/Navbar/Navbar.vue";
import axios from "axios";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      courseID: "",
      valid: false,
      course: {},
      lastname: "",
      title: "",
      categories: [],
      value: [],
      description: "",
      newCategory: "",
      price: 0,
      discount: 0,
      thumbnail: "",
      requirements: [],
      courseMaterials: [],
      nameRules: [
        (value) => {
          if (value) return true;

          return "Name is required.";
        },
        (value) => {
          if (value?.length <= 10) return true;

          return "Name must be less than 10 characters.";
        },
      ],
      email: "",
      emailRules: [
        (value) => {
          if (value) return true;

          return "E-mail is required.";
        },
        (value) => {
          if (/.+@.+\..+/.test(value)) return true;

          return "E-mail must be valid.";
        },
      ],
    };
  },
  methods: {
    changeThumbnail(event) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.thumbnail = e.target.result;
        console.log(this.thumbnail);
      };

      reader.readAsDataURL(event.target.files[0]);
    },
    setCourseDetails(course) {
      console.log(course.data);
      this.course = course.data.course;
      this.title = this.course.title;
      this.description = this.course.description;
      console.log(this.course.categories[0]);
      this.categories = this.course.categories;
      this.price = this.course.price;
      this.discount = this.course.discount;
      this.thumbnail = this.course.thumbnail;
      this.requirements = this.course.requirements;
      this.courseMaterials = this.course.courseMaterials;
      console.log(this.courseMaterials);
    },
    addCategory() {
      console.log(this.newCategory);
      this.categories.push(this.newCategory);
      this.newCategory = "";
    },
    selectClick(event) {
      console.log(event);
    },
    async videoUpload(files) {
      const formData = new FormData();

      formData.append("file", files.target.files[0]);

      try {
        const response = await axios.post(
          `http://localhost:3000/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total,
              );
              console.log(`Upload Progress: ${percentCompleted}%`);
            },
          },
        );

        console.log("Files uploaded successfully:", response.data);
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    },
  },

  async mounted() {
    this.courseID = this.$route.params.id;
    try {
      const res = await axios.post(`${backend_url}/instructor/course/viewone`, {
        email: localStorage.getItem("email"),
        courseId: this.courseID,
        token: localStorage.getItem("token"),
      });
      this.setCourseDetails(res);
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style>
/* Your styles here */
</style>
