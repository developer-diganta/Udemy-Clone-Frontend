<template>
  <div class="ml-6 p-5 qa">
    <p class="font-weight-bold">{{ questionAnswers.title }}</p>
    <p>{{ questionAnswers.description.substring(0, 100) }}</p>
  </div>
  <v-divider></v-divider>
</template>
<script>
export default {
  props: ["questionAnswers"],
};
</script>
<style>
.qa {
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
}
.qa:hover {
  background-color: rgb(224, 224, 224);
}
</style>
