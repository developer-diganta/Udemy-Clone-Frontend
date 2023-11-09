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
    style="border:1px solid black"
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
    // return {
    //   videoUrl:
    //     "",
    // };
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
    handleVideoError() {
      alert("Video source error");
    },
  },
  computed: {
    videoUrl() {
      return "http://localhost:3000/api/instructor/videos/" + this.currentVideo;
    },
  },
  watch: {
    currentVideo: function (newVideo) {
      console.log(newVideo);
      if (this.player) {
        console.log("http://localhost:3000/api/instructor/videos/" + newVideo);
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
    try {
      this.initVideoPlayer();
    } catch (error) {
      console.log("UNHANDLED");
    }
  },
};
</script>
<style scoped></style>
