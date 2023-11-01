<template>
  <div>
    <p class="text-h2 font-weight-black">{{ text }}</p>
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
