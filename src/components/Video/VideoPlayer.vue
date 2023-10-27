<template>
  <video
    ref="videoPlayer"
    class="video-js vjs-big-play-centered"
    controls
    width="600"
    height="400"
    @ended="handleVideoEnd"
    oncontextmenu="return false;"
    muted
    @error="handleVideoError"

  >
    <source :src="videoUrl" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</template>
<script>
import videojs from "video.js";
import "video.js/dist/video-js.css";
export default {
  props: ["currentVideo"],
  data() {
    return {
      videoUrl:
        "http://localhost:3000/api/instructor/videos/1697093252891-4K YouTube Promo.mp4",
    };
  },
  methods: {
    initVideoPlayer() {
      const options = {
        controls: true,
        autoplay: false,
        preload: "auto",
        responsive: true,
        fluid: true,
        mute: true,
        playbackRates: [0.5, 1, 1.5, 2],
      };
      this.player = videojs(this.$refs.videoPlayer, options);
    },
    handleVideoEnd() {
      this.$emit("video-ended");
    },
  handleVideoError(){
    alert("Video source error")
  }
  },
  watch: {
    currentVideo: function (newVideo) {
      if (this.player) {
        this.player.src({
          src: "http://localhost:3000/api/instructor/videos/" + newVideo,
          type: "video/mp4",
        });

        this.player.load();
        this.player.play();
      }
    },
  },
  async mounted() {
    try{
      this.initVideoPlayer();
    }catch(error){
      console.log("UNHANDLED")
    }
  },
};
</script>
<style scoped></style>
