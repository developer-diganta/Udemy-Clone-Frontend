<template>
  <h3 class="text-center">
    {{ course.title }} {{ $t("(Edit Mode: Instructor)") }}
  </h3>

  <v-row style="padding: 30px; max-height: 80vh">
    <v-col cols="12" md="8" justify-center d-flex>
      <div v-if="currentVideo && type !== 'exercise'" :key="course">
        <v-app style="min-height: 0 !important">
          <video-player :currentVideo="currentVideo"></video-player>
        </v-app>
      </div>
      <div v-if="type == 'exercise'">
        <div class="mx-auto" style="border: 1px solid black; min-height: 400px">
          <h4 class="text-center">Q:{{ exercise.title }}</h4>
          <h5 class="text-center">{{ exercise.description }}</h5>
          <div style="margin: 0 auto !important">
            <code-editor></code-editor>
          </div>
        </div>
      </div>
      <div v-else>
        <h3 class="text-center">{{ $t("No videos to play") }}</h3>
      </div>
      <div>
        <v-card>
          <v-card-title class="text-center">{{ $t("Summary") }}</v-card-title>
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
            data-cy="review"
          >
            <span v-if="course.status === 'pending'">
              {{ $t("Submit For Review") }}
            </span>
            <span v-if="course.status === 'published'">
              {{ $t("Under Review") }}
            </span>
          </v-btn>
          <div
            v-if="course.status === 'active'"
            class="text-center bg-green mt-2"
            style="padding: 5px"
          >
            {{ $t("Course Active") }}
          </div>
        </div>
      </div>
    </v-col>
    <v-col cols="12" md="4" style="max-height: 80vh; overflow-y: scroll">
      <!-- <v-btn>ADD</v-btn> -->
      <div class="d-flex justify-center">
        <v-btn
          @click="dialog = true"
          :style="lessons.length ? 'width: 40%' : 'width:100%'"
          :text="$t('Add')"
          variant="outlined"
          data-cy="add"
        ></v-btn>
        <div style="width: 20%" v-if="lessons.length"></div>
        <v-btn
          v-if="lessons.length"
          @click="dialogDelete = true"
          style="width: 40%"
          :text="$t('Delete')"
          variant="outlined"
        ></v-btn>
      </div>
      <v-dialog width="500" v-model="dialogDelete">
        <v-card style="padding: 10px">
          <h2 class="text-center">{{ $t("Delete Sections/Videos") }}</h2>
          <h4 class="text-center">
            {{ $t("Click on the section header/video title to delete it") }}
          </h4>
          <v-divider></v-divider>
          <v-card-text v-for="(lesson, index) in lessons" :key="index">
            <v-card-title
              class="rounded subsection-hover pointer"
              @click="deleteSection(index)"
              >{{ index + 1 + ". " + lesson.title }}</v-card-title
            >
            <div class="ml-4 mt-3">
              <v-card-text
                density="compact"
                v-for="(subsection, i) in lesson.videos"
                :key="i"
                style="margin-top: -3%; padding: 10px !important"
                class="subsection-hover rounded pointer"
                @click="deleteVideo(index, i)"
              >
                {{ i + 1 + ". " + subsection.title }}
              </v-card-text>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog
        width="800"
        v-model="dialog"
        style="overflow-y: auto !important"
      >
        <v-form
          @submit.prevent="handleSubmit"
          class="video-add"
          style="overflow-y: auto !important; overflow-x: hidden"
        >
          <v-banner-text style="text-align: center; margin-left: 60px">{{
            $t("Upload Material")
          }}</v-banner-text>

          <v-radio-group class="d-flex" v-model="typeOfUpload" inline>
            <v-radio :label="$t('Section')" value="section"></v-radio>
            <v-radio
              :label="$t('Lecture')"
              value="lecture"
              data-cy="lecture"
            ></v-radio>
            <v-radio
              label="Coding Exercise"
              value="exercise"
              data-cy="exercise"
            ></v-radio>
          </v-radio-group>

          <v-text-field
            v-model="title"
            label="Title"
            data-cy="title"
            :rules="titleRules"
            density="compact"
            class="input"
            background-color="red"
            variant="outlined"
            prepend-inner-icon="mdi-format-title"
          ></v-text-field>

          <v-textarea
            label="Description"
            variant="outlined"
            data-cy="desc"
            v-if="typeOfUpload === 'exercise'"
            v-model="qDesc"
          ></v-textarea>

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
            label="Section"
            v-model="lectureSection"
            v-if="typeOfUpload === 'lecture' || typeOfUpload === 'exercise'"
            :items="sectionsList.map((section) => section)"
            item-title="title"
            variant="outlined"
            return-object
            @change.prevent="handleVideoSelection"
            data-cy="section"
          ></v-select>

          <v-select
            label="Lecture"
            v-model="select"
            v-if="typeOfUpload === 'lecture' || typeOfUpload === 'exercise'"
            :items="videosList.map((video) => video)"
            item-title="video.title"
            item-value="i,j"
            variant="outlined"
            return-object
            @change.prevent="handleVideoSelection"
          ></v-select>

          <v-row>
            <v-col cols="6">
              <v-textarea
                label="Input"
                variant="outlined"
                v-if="typeOfUpload === 'exercise'"
                v-model="qInput"
                data-cy="qInput"
              ></v-textarea>
            </v-col>
            <v-col cols="6">
              <v-textarea
                label="Output"
                variant="outlined"
                v-if="typeOfUpload === 'exercise'"
                v-model="qOutput"
                data-cy="qOutput"
              ></v-textarea>
            </v-col>
          </v-row>

          <v-select
            label="Section"
            v-model="sectionSelect"
            v-if="typeOfUpload === 'section'"
            :items="sectionsList.map((section) => section)"
            item-title="title"
            variant="outlined"
            return-object
            @change.prevent="showRadios = true"
          ></v-select>
          <div v-if="showRadios">
            <v-radio-group class="d-flex" v-model="materialPosition" inline>
              <v-radio label="Before" value="before"></v-radio>
              <v-radio label="After" value="after"></v-radio>
            </v-radio-group>
          </div>
          <v-btn
            type="submit"
            data-cy="submit"
            color="primaryTheme"
            block
            class="mt-2 mb-2"
            >{{ $t("Submit") }}</v-btn
          >
          <v-btn type="button" color="error" block @click="dialog = false">{{
            $t("Close Dialog")
          }}</v-btn>
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
            <!-- <div
              @click="deleteSection(index)"
              icon="mdi-minus"
              size="x-small"
              variant="text"
              class="cursor-pointer cross-btn d-inline"
              style="padding-left: 0px; margin-top: 0px"
            >
              X
            </div> -->
          </div>

          <ul
            v-for="(subsection, i) in lesson.videos"
            :key="i"
            class="list-style-none ml-4"
          >
            <li class="d-flex p-2" style="padding: 5px; margin-top: 7px">
              <div
                variant="text"
                @click="loadCurrentVideo(subsection.videoLink, subsection)"
                style="margin-left: 8px"
                class="cursor-pointer video-name"
              >
                {{ i + 1 + ". " + subsection.title }}
              </div>
              <!-- <div
                @click="deleteVideo(index, i)"
                icon="mdi-minus"
                size="x-small"
                variant="text"
                class="cursor-pointer cross-btn d-inline"
                style="height: 18px; width: 18px; font-size: 12px"
              >
                X
              </div> -->
            </li>
          </ul>
        </li>
      </ul>
    </v-col>
  </v-row>
  <!-- <Footer /> -->
</template>
<script>
import Navbar from "@/components/Navbar/Navbar.vue";
import axios from "axios";
import backend_url from "@/globals/globals";

import VideoPlayer from "@/components/Video/VideoPlayer.vue";
import Footer from "@/components/Common/Footer.vue";
import CodeEditor from "@/components/CodeEditor/CodeEditor.vue";

export default {
  components: { Navbar, VideoPlayer, Footer, CodeEditor },
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
      qDesc: "",
      qInput: "",
      qOutput: "",
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
      materialPosition: null,
      lectureSection: null,
      showRadios: true,
      dialogDelete: false,
      type: "",
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
      this.select = "";
      this.lecture = "";
      this.sectionSelect = "";
    },
    handleVideoSelection() {
      this.showRadios = true;
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
      } else if (this.typeOfUpload === "section") {
        this.sectionUpload();
      } else {
        this.exerciseUpload();
      }
    },
    async exerciseUpload() {
      console.log(this.title);
      console.log(this.lectureSection);
      console.log(this.select);
      console.log(this.qDesc);
      console.log(this.qInput);
      console.log(this.qOutput);
      console.log(this.files);
      const data = {
        title: this.title,
        description: this.qDesc,
        input: this.qInput,
        output: this.qOutput,
        subsectionToBeUpdated: this.subsectionToBeUpdated,
        courseId: this.course._id,
        videoToAddAfter: this.videoToAddAfter,
        type: "exercise",
      };

      try {
        this.alertSuccess = true;
        this.successMessage = "Uploading Exercise";
        // const response = await axios.post(
        //   `${backend_url}/courses/uploads`,
        //   formData,
        //   {
        //     headers: {
        //       "Content-Type": "multipart/form-data",
        //     },
        //     onUploadProgress: (progressEvent) => {
        //       const percentCompleted = Math.round(
        //         (progressEvent.loaded * 100) / progressEvent.total,
        //       );
        //       console.log(`Upload Progress: ${percentCompleted}%`);
        //       this.dialog = false;
        //     },
        //   },
        // );
        const response = await axios.post(
          `${backend_url}/courses/exercise`,
          data,
        );
        // console.log("Files uploaded successfully:", response.data);

        this.successMessage = "Video Uploaded";
        this.initialLoad();
        this.resetForm();
        this.$store.dispatch("snackbar/showSnackbar", {
          message: "Video Uploaded",
          type: "Success",
        });
        this.materialPosition = null;
      } catch (error) {
        this.alertFailure = true;
        this.failureMessage = error;
        console.error("Error uploading files:", error);
        this.$store.dispatch("snackbar/showSnackbar", {
          message: "There was some error",
          type: "Error",
        });
      }
    },

    async sectionUpload() {
      console.log(this.title);
      console.log(this.sectionSelect);
      console.log(this.selectionSelect);
      if (this.sectionSelect === null) {
        this.sectionSelect = {
          index: 0,
          title: "",
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
      this.$store.dispatch("snackbar/showSnackbar", {
        message: "Section Uploaded",
        type: "Success",
      });
      this.materialPosition = null;
    },
    setAddMaterialActivated(index, i) {
      console.log(index, i);
      this.addMaterialActivated = true;
      this.subsectionToBeUpdated = index;
      this.videoToAddAfter = i;
      this.dialog = true;
    },
    setCourseDetails(course) {
      this.course = this.$store.state.instructor.currentCourse;
      console.log(this.course);
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
        this.$store.dispatch("snackbar/showSnackbar", {
          message: "Video Deleted",
          type: "Success",
        });

        this.initialLoad();
        this.resetForm();
      } catch (error) {
        this.alertFailure = true;
        this.failureMessage = error;
        this.$store.dispatch("snackbar/showSnackbar", {
          message: "There was some error",
          type: "Error",
        });
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
        this.$store.dispatch("snackbar/showSnackbar", {
          message: "Video Uploaded",
          type: "Success",
        });
        this.materialPosition = null;
      } catch (error) {
        this.alertFailure = true;
        this.failureMessage = error;
        console.error("Error uploading files:", error);
        this.$store.dispatch("snackbar/showSnackbar", {
          message: "There was some error",
          type: "Error",
        });
      }
    },

    loadCurrentVideo(video, subsection) {
      if (video === undefined) {
        if (subsection.type === "exercise") {
          this.exercise = subsection;
          this.type = "exercise";
        }
      } else {
        this.currentVideo = video;
        this.type = "";
      }
    },

    async initialLoad() {
      this.dialog = false;
      this.courseID = this.$route.params.id;

      try {
        await this.$store.dispatch("instructor/instructorCourseViewOne", {
          courseId: this.courseID,
        });
        console.log(this.$store.state.instructor.currentCourse);
        this.setCourseDetails();
        this.sectionsList = this.course.lessons.map((lesson, index) => ({
          index,
          title: lesson.title,
        }));

        console.log("----------------", this.sectionsList);

        // console.log("IUIUIUIUIU", this.course)
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
    this.$store.state.instructor.currentCourse = {};
    await this.initialLoad();
  },
};
</script>
<style scoped>
.subsection-hover:hover {
  background-color: lightcoral;
}
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
