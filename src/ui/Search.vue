<template>
  <div>
    <form id="search">
      <input type="text" placeholder="Search Courses" />
      <button class="search-btn">
        <v-icon class="rounded-icon search-icon">mdi-magnify</v-icon>
      </button>
    </form>
  </div>
</template>
<script>
export default {
  data: () => ({
    firstName: "",
    rules: [
      (value) => {
        if (value) return true;

        return "You must enter a first name.";
      },
    ],
  }),
};
</script>

<style scoped>
form {
  display: flex !important;
  flex-direction: row !important;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 2px;
}
input {
  width: 400px;
  background: white;
  min-height: 30px;
  border: 1px solid #008080;
  padding-left: 10px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
input:focus {
  outline: none;
  border-width: 2px;
}
.search-btn {
  background: #008080;
  min-height: 30px;
  padding-left: 3px;
  padding-right: 3px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
.search-icon {
  color: white;
}
</style>
