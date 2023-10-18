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
      <!-- <v-btn>ADD</v-btn> -->
      <v-btn
        @click="dialog = true"
        style="width: 100%"
        text="Add"
        variant="outlined"
      ></v-btn>

      <v-dialog width="500" v-model="dialog">
        <v-form @submit.prevent="handleSubmit" class="video-add">
          <v-banner-text style="text-align: center; margin-left: 60px"
            >Upload Material</v-banner-text
          >

          <v-radio-group class="d-flex" v-model="typeOfUpload" inline>
            <v-radio label="Section" value="section"></v-radio>
            <v-radio label="Lecture" value="lecture"></v-radio>
          </v-radio-group>

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
            name="file"
            density="compact"
            class="input"
            v-if="typeOfUpload === 'lecture'"
            v-model="files"
          ></v-file-input>

          <v-select
            label="Select"
            v-model="select"
            v-if="typeOfUpload === 'lecture'"
            :items="videosList.map((video) => video)"
            item-title="video.title"
            item-value="i,j"
            variant="outlined"
            return-object
            @change.prevent="handleVideoSelection"
          ></v-select>

          <v-select
            label="Select"
            v-model="sectionSelect"
            v-if="typeOfUpload === 'section'"
            :items="sectionsList.map((section) => section)"
            item-title="title"
            variant="outlined"
            return-object
            @change.prevent="handleVideoSelection"
          ></v-select>

          <v-radio-group class="d-flex" v-model="materialPosition" inline>
            <v-radio label="Before" value="before"></v-radio>
            <v-radio label="After" value="after"></v-radio>
          </v-radio-group>

          <v-btn type="submit" color="primaryTheme" block class="mt-2 mb-2"
            >Submit</v-btn
          >
          <v-btn type="button" color="error" block @click="dialog = false"
            >Close Dialog</v-btn
          >
        </v-form>
      </v-dialog>

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
            <li class="d-flex p-2" style="padding: 5px; margin-top: 7px">
              <div
                @click="deleteVideo(index, i)"
                icon="mdi-minus"
                size="x-small"
                variant="text"
              >
                X
              </div>
              <div
                variant="text"
                @click="loadCurrentVideo(subsection.videoLink)"
                style="margin-left: 8px"
              >
                {{ i + 1 + ". " + subsection.title }}
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </v-col>
  </v-row>

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
      sectionSelect: {},
      alertSuccess: false,
      alertFailure: false,
      successMessage: "",
      failureMessage: "",
      dialog: false,
      open: [],
      lessons: [],
      firstName: "",
      files: {},
      addMaterialActivated: false,
      subsectionToBeUpdated: 0,
      videoToAddAfter: 0,
      dialog: false,
      currentVideo: "",
      title: "",
      typeOfUpload: "section",
      videosList: [],
      sectionsList: [],
      select: "",
      materialPosition: "after",
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
    handleSubmit() {
      if (this.typeOfUpload === "lecture") {
        this.videoUpload();
      } else {
        this.sectionUpload();
      }
    },
    async sectionUpload() {
      console.log(this.title);
      console.log(this.sectionSelect);
      const res = await this.$store.dispatch("addSection", {
        index: this.sectionSelect.index,
        title: this.title,
        id: this.course._id,
      });

      console.log(res);
      await this.initialLoad();
    },
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
        this.initialLoad();
      } catch (error) {
        this.alertFailure = true;
        this.failureMessage = error;
        console.log(res);
      }
    },
    async videoUpload() {
      const formData = new FormData();
      console.log(this.files);
      formData.append("file", this.files[0]);
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
        this.initialLoad();
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

    async initialLoad() {
      this.courseID = this.$route.params.id;
      try {
        const res = await this.$store.dispatch("instructorCourseViewOne", {
          courseId: this.courseID,
        });
        for (let i = 0; i < res.data.course.lessons.length; i++) {
          for (let j = 0; j < res.data.course.lessons[i].videos.length; j++) {
            this.videosList.push({
              i,
              j,
              video: res.data.course.lessons[i].videos[j],
            });
          }
        }

        this.sectionsList = res.data.course.lessons.map((lesson, index) => ({
          index,
          title: lesson.title,
        }));

        console.log(this.sectionsList);
        console.log(this.videosList);
        this.setCourseDetails(res);
      } catch (error) {
        console.log(error);
      }
    },
  },
  watch: {
    typeOfUpload() {
      console.log(this.typeOfUpload);
    },
    select() {
      console.log(this.select);
      this.subsectionToBeUpdated = this.select.i;
      if (this.materialPosition === "before") {
        this.videoToAddAfter = this.select.j - 1;
        console.log(this.videoToAddAfter);
      } else {
        this.videoToAddAfter = this.select.j;
      }

      console.log(this.subsectionToBeUpdated);
      console.log(this.videoToAddAfter);
    },
    materialPosition() {
      console.log(this.select);
      this.subsectionToBeUpdated = this.select.i;
      if (this.materialPosition === "before") {
        this.videoToAddAfter = this.select.j - 1;
        console.log(this.videoToAddAfter);
      } else {
        this.videoToAddAfter = this.select.j;
      }
    },
  },
  async mounted() {
    await this.initialLoad();
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
