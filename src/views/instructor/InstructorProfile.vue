<template>
    <navbar></navbar>
    <v-sheet>
        <v-card>
            <v-form class="form-width" @submit.prevent density="compact">
                <v-text-field
                  v-model="name"
                  :rules="rules"
                  density="compact"
                  label="Name"
                ></v-text-field>
                <v-textarea label="Bio" rows="2" class="input" ></v-textarea>
                <v-img
  :width="300"
  aspect-ratio="16/9"
  cover
  src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
></v-img>

                <v-btn type="submit" block class="mt-2">Submit</v-btn>
                
              </v-form>
        </v-card>
    </v-sheet>
</template>
<script>
import Navbar from '@/components/Navbar/Navbar.vue'
export default {
  components: { Navbar },

}
</script>
<style scoped>
    .form-width{
        width:60%;
    }
</style>