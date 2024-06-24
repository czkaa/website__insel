<template>
  <iframe
    width="100%"
    height="100%"
    allow="autoplay"
    :src="`https://www.youtube.com/embed/${videoID}?playlist=${videoID}&controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1`"
  >
  </iframe>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  videoData: String,
});

const videoID = computed(() => {
  return props.videoData.split('v=')[1].split('&ab')[0];
});
</script>
