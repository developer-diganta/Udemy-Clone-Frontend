<template lang="">
  <v-dialog v-model="dialog" width="500" height="auto">
    <v-card style="padding: 20px">
      <v-card-title class="mb-3 text-center">{{ title }}</v-card-title>
      <v-row>
        <v-col cols="6">
          <v-card class="card" @click="redirect('student')">
            <v-img
              class="bg-white"
              width="auto"
              :aspect-ratio="1"
              :src="require('../assets/student.svg')"
              cover
            ></v-img>
            <v-card-title class="text-center"> Student </v-card-title>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card class="card" @click="redirect('instructor')">
            <v-img
              class="bg-white"
              width="auto"
              :aspect-ratio="1"
              :src="require('../assets/instructor.svg')"
              cover
            ></v-img>
            <v-card-title class="text-center"> Instructor </v-card-title>
          </v-card>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-btn
          color="primaryTheme"
          variant="tonal"
          block
          @click="dialog = false"
          >Close</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ["dialogControl", "type", "title"],
  emits: ["dialog-close"],
  data() {
    return {
      dialog: false,
    };
  },
  async created() {
    this.dialog = this.dialogControl;
  },
  watch: {
    dialog() {
      if (!this.dialog) this.$emit("dialog-close", false);
    },
  },
  methods: {
    redirect(route) {
      if (this.type === "signIn") {
        this.$router.push(`/signin/${route}`);
      } else {
        this.$router.push(`/${route}/signup`);
      }
    },
  },
};
</script>
<style scoped>
.card:hover {
  box-shadow: 0 3px 12px #6fbedf;
}
</style>
