<template>
  <loader message="Updating Course Details" v-if="loading"></loader>
  <snack-bar
    message="Updated Course"
    :visibility="snackbar"
    :key="toggleSnackbar"
  ></snack-bar>
  <div>
    <h3 class="text-center">Course Details - {{ title }}</h3>

    <v-form v-model="valid" @submit.prevent="submit" @input="formEdited = true">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <!-- <v-img
              :width="370"
              aspect-ratio="16/9"
              cover
              style="margin-bottom: 10px"
              :src="thumbnail"
            ></v-img> -->
            <v-file-input
              show-size
              counter
              multiple
              label="Thumbnail"
              @change="changeThumbnail($event)"
              variant="outlined"
            ></v-file-input>
            <v-dialog width="500">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" text="Preview Image"> </v-btn>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card>
                  <v-card-text>
                    <v-img
                      :width="370"
                      aspect-ratio="16/9"
                      cover
                      style="margin-bottom: 10px"
                      :src="thumbnail"
                    ></v-img>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                      variant="tonal"
                      text="Close Image"
                      @click="isActive.value = false"
                    ></v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </v-col>

          <v-col cols="12" md="8" style="margin-top: 10px">
            <v-row>
              <v-textarea
                v-model="description"
                rows="2"
                label="Description"
                variant="outlined"
                prepend-inner-icon="mdi-text"
              ></v-textarea>
            </v-row>
            <v-row>
              <v-text-field
                v-model="title"
                :rules="titleRules"
                label="Title"
                required
                hide-details
                variant="outlined"
                prepend-inner-icon="mdi-format-title"
              ></v-text-field>
            </v-row>
          </v-col>

          <v-divider style="margin-bottom: 30px; margin-top: 30px"></v-divider>

          <v-col cols="12" md="4">
            <v-row>
              <v-text-field
                type="number"
                v-model="price"
                :rules="titleRules"
                label="Price"
                density="compact"
                variant="outlined"
                prepend-inner-icon="mdi-currency-inr"
              ></v-text-field>
            </v-row>

            <v-row class="mt-2">
              <v-text-field
                type="number"
                v-model="discount"
                :rules="discountRules"
                label="Discount"
                density="compact"
                variant="outlined"
                prepend-inner-icon="mdi-percent"
              ></v-text-field>
            </v-row>
          </v-col>

          <v-col cols="12" md="8" style="margin-top: -12px">
            <v-select
              v-model="categories"
              :items="categories"
              label="Categories"
              multiple
              density="compact"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index < 2">
                  <span>{{ item.title }}</span>
                </v-chip>
                <span
                  v-if="index === 2"
                  class="text-grey text-caption align-self-center"
                >
                  (+{{ categories.length - 2 }} others)
                </span>
              </template>
            </v-select>
            <v-text-field
              v-model="newCategory"
              label="Add Category"
              density="compact"
              variant="outlined"
              prepend-inner-icon="mdi-cards"
            >
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
              density="compact"
              variant="outlined"
              :label="'Requirement:' + (parseInt(index) + 1)"
            ></v-text-field>
            <v-text-field
              v-model="newRequirement"
              label="Add Requirement"
              density="compact"
              variant="outlined"
              prepend-inner-icon="mdi-exclamation-thick"
            >
              <template v-if="newRequirement.length" v-slot:append>
                <v-icon @click.prevent="addRequirement" color="primaryTheme">
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
              density="compact"
              :label="'Material:' + (parseInt(index) + 1)"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              v-model="newMaterial"
              label="Add Material"
              density="compact"
              variant="outlined"
              prepend-inner-icon="mdi-book-multiple"
            >
              <template v-if="newMaterial.length" v-slot:append>
                <v-icon @click.prevent="addMaterial" color="primaryTheme">
                  mdi-plus
                </v-icon>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <div class="text-center pb-10">
        <v-btn
          type="submit"
          style="margin-right: 15px"
          size="large"
          elevation="4"
          color="primaryTheme"
          rounded="sm"
          :disabled="formEdited === false"
          >Update Course</v-btn
        >
        <v-btn
          type="button"
          style="margin-left: 15px"
          size="large"
          elevation="4"
          color="primaryTheme"
          rounded="sm"
          @click="redirectAddLessons"
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
import Loader from "@/ui/Loader.vue";
import SnackBar from "@/ui/SnackBar.vue";

export default {
  components: {
    Navbar,
    Loader,
    SnackBar,
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
      loading: false,
      newMaterial: "",
      newRequirement: "",
      price: 0,
      discount: 0,
      thumbnail: "",
      requirements: [],
      toggleSnackbar: false,
      courseMaterials: [],
      snackbar: false,
      formEdited: false,
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
    submit() {
      try {
        this.loading = true;
        const updates = {
          title: this.title,
          description: this.description,
          categories: this.categories,
          price: this.price,
          discount: this.discount,
          thumbnail: this.thumbnail,
          requirements: this.requirements,
          courseMaterials: this.courseMaterials,
        };
        this.$store.dispatch("instructor/editCourse", {
          updates,
          courseId: this.courseID,
        });
        this.loading = false;
        this.$store.dispatch("snackbar/showSnackbar", {
          message: "Course Updated",
          type: "Success",
        });
      } catch (error) {
        this.$store.dispatch("snackbar/showSnackbar", {
          message: "There was some error",
          type: "Error",
        });
      }
    },
    redirectAddLessons() {
      this.$router.push(`/instructor/course/lesson/${this.courseID}`);
    },
    changeThumbnail(event) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.thumbnail = e.target.result;
        console.log(this.thumbnail);
      };

      reader.readAsDataURL(event.target.files[0]);
    },
    setCourseDetails(course) {
      console.log(course);
      this.course = course;
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
      console.log(this.categories);
      this.newCategory = "";
    },

    /**
     * adds a new material to the course materials array
     */
    addMaterial() {
      this.courseMaterials.push({
        name: this.newMaterial,
      });
      this.newMaterial = "";
    },

    addRequirement() {
      this.requirements.push(this.newRequirement);
      this.newRequirement = "";
    },
    selectClick(event) {
      console.log(event);
    },
  },

  async mounted() {
    this.courseID = this.$route.params.id;
    try {
      await this.$store.dispatch("instructor/instructorCourseViewOne", {
        courseId: this.courseID,
        router: this.$router,
      });
      this.setCourseDetails(this.$store.state.instructor.currentCourse);
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style>
/* Your styles here */
</style>
