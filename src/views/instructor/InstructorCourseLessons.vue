<template>
  <navbar></navbar>
  <h3 class="text-center">{{ course.title }}</h3>

  <ul v-for="(lesson, index) in lessons" :key="index">
    <li>
      <h4>{{ lesson.title }}</h4>
      <ul v-for="(subsection, i) in lesson.subsection[index].videos" :key="i">
        <li>
          <a :href="subsection.videoLink">{{ subsection.title }}</a>
          <v-btn
            @click="setAddMaterialActivated(index, i)"
            icon="mdi-plus"
            size="x-small"
            variant="text"
          ></v-btn>
        </li>
      </ul>
    </li>
  </ul>

  <v-form @submit.prevent v-if="addMaterialActivated">
    <v-text-field
      v-model="firstName"
      label="First name"
      :rules="firstNameRules"
    ></v-text-field>

    <v-text-field
      v-model="lastName"
      label="Last name"
      :rules="lastNameRules"
    ></v-text-field>

    <v-btn type="submit" block class="mt-2">Submit</v-btn>
  </v-form>
</template>
<script>
import Navbar from "@/components/Navbar/Navbar.vue";
import axios from "axios";
import backend_url from "@/globals/globals";
export default {
  components: { Navbar },
  data() {
    return {
      course: {},
      open: [],
      lessons: [],
      firstName: "",
      addMaterialActivated: false,
      subsectionToBeUpdated: 0,
      videoToAddAfter: 0,
      firstNameRules: [
        (value) => {
          if (value?.length > 3) return true;

          return "First name must be at least 3 characters.";
        },
      ],
      lastName: "123",
      lastNameRules: [
        (value) => {
          if (/[^0-9]/.test(value)) return true;

          return "Last name can not contain digits.";
        },
      ],
    };
  },
  methods: {
    setAddMaterialActivated(index, i) {
      console.log(index, i);
      this.addMaterialActivated = true;
      this.subsectionToBeUpdated = index;
      this.videoToAddAfter = i;
    },
    setCourseDetails(course) {
      this.course = course.data.course;
      this.lessons = this.course.lessons;
      console.log(this.lessons);
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
<style></style>
