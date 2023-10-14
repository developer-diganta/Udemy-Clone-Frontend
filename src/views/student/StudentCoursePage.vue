<template>
    <div>
        <navbar></navbar>
        <v-row class="container-secondary mt-4">
            <v-col cols="12" md="9">
                <video-player :currentVideo="currentVideo.videoLink"></video-player>
            </v-col>
            <v-col cols="12" md="3">
                <v-list v-model:opened="open" v-for="(lesson,index) in course.lessons" :key="index"   :class="`elevation-${2}`"        density="compact"
                >
               
                  <v-list-group>
                    <template v-slot:activator="{ props }">
                      <v-list-item
                        v-bind="props"
                        :title="index+1 + '. ' + lesson.title"
                      ></v-list-item>
                    </template>
          
            
                      <v-list-item
                        v-for="(video, i) in lesson.videos"
                        :key="i"
                        :title="i+1 + '. ' + video.title"

                        :value="video.title"
                      ></v-list-item>
                  </v-list-group>
          
                </v-list>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import VideoPlayer from '@/components/Video/VideoPlayer.vue';
import Navbar from "@/components/Navbar/Navbar.vue";

export default {
  components: { VideoPlayer, Navbar },
    data(){
        return{
            course:{},
            currentVideo:{
                title:"",
                videoLink:""
            }
        }
    },
    methods: {
    async getCourse() {
      const res = await this.$store.dispatch("fetchSingleCourse", {
        courseId: this.$route.query.courseId,
      });
      console.log(res);
      this.currentVideo =res.lessons[0].videos[0];
      return res;
    },
  },  
  async created(){
    this.course = await this.getCourse();
  }
}
</script>
<style>
    
</style>