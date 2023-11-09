<template>
  <div>
    <p class="d-none d-lg-block text-h2 font-weight-black">{{ text }}</p>
    <h1 class="d-lg-none font-weight-black">{{ text }}</h1>
    <p class="text-body">{{ subtext }}</p>
  </div>
</template>
<script>
export default {
  props: ["text", "subtext"],
};
</script>
<style scoped>
div {
  position: absolute;
  color: white;
  bottom: 3%;
  left: 10%;
  width: 60%;
}
</style>
