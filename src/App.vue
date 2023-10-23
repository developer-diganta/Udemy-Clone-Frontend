<template>
  <router-view></router-view>
</template>

<script>
import CheckOut from "./views/common/CheckOut.vue";
export default {
  components: { CheckOut },
};
</script>

<style>
.container {
  margin-left: 9rem !important;
  margin-right: 9rem !important;
}
.container-secondary {
  margin-left: 3rem !important;
  margin-right: 3rem !important;
}
.list-style-none {
  list-style-type: none;
}

.m-2{
  margin:5px !important
}

</style>
