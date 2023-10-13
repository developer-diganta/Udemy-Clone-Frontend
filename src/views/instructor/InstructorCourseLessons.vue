<template>
  <navbar></navbar>
  <h3 class="text-center">{{ course.title }} (Edit Mode: Instructor)</h3>
  <v-row style="padding: 30px; max-height: 80vh; overflow: hidden">
    <v-col cols="12" md="8" justify-center d-flex>
      <v-app>
        <video-player :currentVideo="currentVideo"></video-player>
      </v-app>
    </v-col>
    <v-col cols="12" md="4" style="max-height: 80vh; overflow-y: scroll">
      <ul
        v-for="(lesson, index) in lessons"
        :key="index"
        class="ml-4 list-style-none"
      >
        <li>
          <h4>{{ index + 1 + ". " + lesson.title }}</h4>
          <!-- {{lesson}} -->
          <ul
            v-for="(subsection, i) in lesson.videos"
            :key="i"
            class="list-style-none ml-4"
          >
            <li>
              <v-btn
                variant="text"
                @click="loadCurrentVideo(subsection.videoLink)"
                >{{ i + 1 + ". " + subsection.title }}</v-btn
              >
              <v-btn
                @click="setAddMaterialActivated(index, i)"
                icon="mdi-plus"
                size="x-small"
                variant="text"
              ></v-btn>
              <v-btn
                @click="deleteVideo(index, i)"
                icon="mdi-minus"
                size="x-small"
                variant="text"
              ></v-btn>
            </li>
          </ul>
        </li>
      </ul>
    </v-col>
  </v-row>

  <v-dialog v-model="dialog" width="50%" class="add-modal">
    <v-form @submit.prevent v-if="addMaterialActivated" class="video-add">
      <v-banner-text style="text-align: center; margin-left: 60px"
        >Upload Video</v-banner-text
      >
      <v-text-field
        v-model="title"
        label="Title"
        :rules="titleRules"
        density="compact"
        class="input"
        background-color="red"
      ></v-text-field>

      <v-file-input
        multiple
        label="File input"
        @change="videoUpload"
        name="file"
        density="compact"
        class="input"
      ></v-file-input>

      <v-btn type="submit" color="primaryTheme" block class="mt-2 mb-2"
        >Submit</v-btn
      >
      <v-btn type="button" color="error" block @click="dialog = false"
        >Close Dialog</v-btn
      >
    </v-form>
  </v-dialog>

  <alert
    v-if="alertSuccess"
    :message="successMessage"
    variant="tonal"
    color="success"
  ></alert>

  <alert
    v-if="alertFailure"
    :message="failureMessage"
    variant="tonal"
    color="error"
  ></alert>
</template>
<script>
import Navbar from "@/components/Navbar/Navbar.vue";
import axios from "axios";
import backend_url from "@/globals/globals";

import VideoPlayer from "@/components/Video/VideoPlayer.vue";
import Alert from "@/ui/Alert.vue";

export default {
  components: { Navbar, VideoPlayer, Alert },
  data() {
    return {
      course: {},
      alertSuccess: false,
      alertFailure: false,
      successMessage: "",
      failureMessage: "",
      open: [],
      lessons: [],
      firstName: "",
      addMaterialActivated: false,
      subsectionToBeUpdated: 0,
      videoToAddAfter: 0,
      dialog: false,
      currentVideo: "",
      title: "",
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
      this.dialog = true;
    },
    setCourseDetails(course) {
      this.course = course.data.course;
      this.lessons = this.course.lessons;
    },
    async deleteVideo(index, i) {
      this.subsectionToBeUpdated = index;
      this.indexOfVideo = i;
      try {
        const res = await this.$store.dispatch("deleteVideo", {
          courseId: this.course,
          subsectionToBeUpdated: this.subsectionToBeUpdated,
          indexOfVideo: this.indexOfVideo,
        });
        this.alertSuccess = true;
        this.successMessage = "Video Deleted";
      } catch (error) {
        this.alertFailure = true;
        this.failureMessage = error;
        console.log(res);
      }
    },
    async videoUpload(files) {
      const formData = new FormData();

      formData.append("file", files.target.files[0]);
      formData.append("title", this.title);
      formData.append("subsectionToBeUpdated", this.subsectionToBeUpdated);
      formData.append("videoToAddAfter", this.videoToAddAfter);
      formData.append("courseId", this.course._id);

      try {
        this.alertSuccess = true;
        this.successMessage = "Uploading Video";
        const response = await axios.post(
          `${backend_url}/courses/uploads`,
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
              this.dialog = false;
            },
          },
        );

        console.log("Files uploaded successfully:", response.data);

        this.successMessage = "Video Uploaded";
      } catch (error) {
        this.alertFailure = true;
        this.failureMessage = error;
        console.error("Error uploading files:", error);
      }
    },

    loadCurrentVideo(video) {
      this.currentVideo = video;
      console.log(video);
    },
  },
  async mounted() {
    this.courseID = this.$route.params.id;
    try {
      const res = await this.$store.dispatch("instructorCourseViewOne", {
        courseId: this.courseID,
      });
      this.setCourseDetails(res);
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
<style scoped>
.input {
  background: transparent;
}
.video-add {
  background: white;
  padding: 10px;
}
.add-modal {
}
</style>
