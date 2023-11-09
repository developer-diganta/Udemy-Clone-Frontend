<template>
    <navbar></navbar>
    
    <div class="NotFound">

            <v-img
              :src="require('../../assets/fof.svg')"
              style="width:200px;height:100px;"
              class="img"
              alt=""
            ></v-img>
        <div>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card height="400" class="text-center" color="transparent" flat>
              <div class="display-3 mt-5">Page not found.</div>
              <div class="grey--text lighten-5">
                The page you are trying to get to never existed in this reality,
                or has migrated to a parallel universe.
              </div>
              <div class="paragraph-text mt-2">
                <br />
                <br />Try going back to home page and repeating your action. Or,
                contact helpdesk for support.
              </div>
            </v-card>
          </v-flex>
        </v-layout>
    </div>
    </div>
  </template>
  <script>
import Navbar from '@/components/Navbar/Navbar.vue'
  export default {
  components: { Navbar },
    
  }
  </script>
  <style scoped>
    .paragraph-text {
      font-size: 18px;
    }
    .NotFound{
        display: flex;
        height: 100vh;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
  </style>