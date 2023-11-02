<template>
  <h3 class="text-center">{{ course.title }} (Edit Mode: Instructor)</h3>
  <v-row style="padding: 30px; max-height: 80vh">
    <v-col cols="12" md="8" justify-center d-flex>
      <div v-if="currentVideo" :key="course">
        <v-app style="min-height: 0 !important">
          <video-player :currentVideo="currentVideo"></video-player>
        </v-app>
      </div>
      <div v-else>
        <h3 class="text-center">No videos to play</h3>
      </div>
      <div>
        <v-card>
          <v-card-title class="text-center">Summary</v-card-title>
          <v-divider></v-divider>
          <v-table fixed-header>
            <tbody>
              <tr v-for="(entry, key) in courseSummary" :key="key">
                <td>{{ key }}</td>
                <td>{{ entry }}</td>
              </tr>
            </tbody>
          </v-table>
          <v-divider></v-divider>
        </v-card>
        <div>
          <v-btn
            style="width: 100%"
            class="mt-2"
            @click="publish"
            v-if="course.status === 'pending' || course.status === 'published'"
            color="secondaryCoral"
          >
            <span v-if="course.status === 'pending'"> Submit For Review </span>
            <span v-if="course.status === 'published'"> Under Review </span>
          </v-btn>
          <div
            v-if="course.status === 'active'"
            class="text-center bg-green mt-2"
            style="padding: 5px"
          >
            Course Active
          </div>
        </div>
      </div>
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
            v-model="files"
            v-if="typeOfUpload === 'lecture'"
          ></v-file-input>

          <v-select
            label="Select"
            v-model="lectureSection"
            v-if="typeOfUpload === 'lecture'"
            :items="sectionsList.map((section) => section)"
            item-title="title"
            variant="outlined"
            return-object
            @change.prevent="handleVideoSelection"
          ></v-select>

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
        <li style="margin-top: 7px">
          <div>
            <h3 style="display: inline">
              {{ index + 1 + ". " + lesson.title }}
            </h3>
            <div
              @click="deleteSection(index)"
              icon="mdi-minus"
              size="x-small"
              variant="text"
              class="cursor-pointer cross-btn d-inline"
              style="padding-left: 0px; margin-top: 0px"
            >
              X
            </div>
          </div>

          <ul
            v-for="(subsection, i) in lesson.videos"
            :key="i"
            class="list-style-none ml-4"
          >
            <li class="d-flex p-2" style="padding: 5px; margin-top: 7px">
              <div
                variant="text"
                @click="loadCurrentVideo(subsection.videoLink)"
                style="margin-left: 8px"
                class="cursor-pointer video-name"
              >
                {{ i + 1 + ". " + subsection.title }}
              </div>
              <div
                @click="deleteVideo(index, i)"
                icon="mdi-minus"
                size="x-small"
                variant="text"
                class="cursor-pointer cross-btn d-inline"
                style="height: 18px; width: 18px; font-size: 12px"
              >
                X
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
      sectionSelect: null,
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
      lectureSection: null,
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
    resetForm() {
      this.title = "";
      this.files = null;
    },
    async publish() {
      await this.$store.dispatch("instructor/publishCourse", this.courseID);
      this.initialLoad();
    },
    async deleteSection(index) {
      try {
        const res = await this.$store.dispatch("instructor/deleteSection", {
          courseId: this.courseID,
          sectionId: index,
        });
        this.initialLoad();
      } catch (error) {
        console.log(error);
      }
    },
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
      console.log(this.selectionSelect);
      if (this.sectionSelect === null) {
        this.sectionSelect = {
          index: 0,
        };
        this.materialPosition = "after";
      }

      await this.$store.dispatch("instructor/addSection", {
        index:
          this.materialPosition === "before"
            ? this.sectionSelect.index - 1
            : this.sectionSelect.index,
        title: this.title,
        id: this.course._id,
      });

      await this.initialLoad();
      this.resetForm();
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
        const res = await this.$store.dispatch("instructor/deleteVideo", {
          courseId: this.course,
          subsectionToBeUpdated: this.subsectionToBeUpdated,
          indexOfVideo: this.indexOfVideo,
        });
        this.alertSuccess = true;
        this.successMessage = "Video Deleted";

        this.initialLoad();
        this.resetForm();
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
        this.resetForm();
      } catch (error) {
        this.alertFailure = true;
        this.failureMessage = error;
        console.error("Error uploading files:", error);
      }
    },

    loadCurrentVideo(video) {
      this.currentVideo = video;
    },

    async initialLoad() {
      this.dialog = false;
      this.courseID = this.$route.params.id;
      try {
        await this.$store.dispatch("instructor/instructorCourseViewOne", {
          courseId: this.courseID,
        });

        this.sectionsList =
          this.$store.state.instructor.currentCourse.data.course.lessons.map(
            (lesson, index) => ({
              index,
              title: lesson.title,
            }),
          );

        this.setCourseDetails(this.$store.state.instructor.currentCourse);
        if (this.course.lessons[0]?.videos[0]?.videoLink) {
          this.loadCurrentVideo(this.course.lessons[0]?.videos[0]?.videoLink);
        }
        console.log(this.sectionsList);
        console.log(this.videosList);
      } catch (error) {
        console.log(error);
      }
    },
  },
  watch: {
    lectureSection() {
      console.log(this.lectureSection);
      console.log(this.course.lessons[this.lectureSection.index]);
      this.videosList = [];
      for (
        let j = 0;
        j < this.course.lessons[this.lectureSection.index].videos.length;
        j++
      ) {
        this.videosList.push({
          i: this.lectureSection.index,
          j,
          video: this.course.lessons[this.lectureSection.index].videos[j],
        });
      }
      this.subsectionToBeUpdated = this.lectureSection.index;
    },
    typeOfUpload() {
      console.log(this.typeOfUpload);
    },
    select() {
      console.log(this.select);
      // this.subsectionToBeUpdated = this.select.i;
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
  computed: {
    courseSummary() {
      return {
        Title: this.course.title,
        Description: this.course.description,
        Price: this.course.price,
        "Total Videos": this.course.lessons?.reduce((total, lesson) => {
          return total + (lesson.videos?.length || 0);
        }, 0),
      };
      console.log(this.courseSummary);
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
tr {
  text-align: center !important;
}
.add-modal {
}
.cursor-pointer {
  cursor: pointer;
}
.cross-btn {
  background: red;
  color: white;
  font-weight: 700;
  padding-left: 4px;
  padding-right: 4px;
  border-radius: 100%;
  height: 20px;
  width: 20px;
  font-size: 14px;
  text-align: center;
  margin-left: 10px;
  box-shadow: 0px 0px 5px 0px red;
  margin-top: 2px;
}
.cross-btn:hover {
  box-shadow: none;
}
.video-name {
  padding-top: 2px;
  padding-bottom: 2px;
}

.video-name:hover {
  background: rgb(207, 207, 207);
}
</style>
