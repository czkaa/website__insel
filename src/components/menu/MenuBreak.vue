<template>
  <div class="w-full h-full">
    <!-- <iframe
      width="100%"
      height="100%"
      allow="autoplay"
      :src="`https://www.youtube.com/embed/${videoID}?playlist=${videoID}&controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1`"
    >
    </iframe> -->

    <MenuSchedule
      :style="{
        transition: 'all 0.5s',
        transform: isSchedule ? 'scale(0.25)' : 'scale(0)',
        right: '0',
        transformOrigin: 'top right',
      }"
    />
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';

const props = defineProps({});

// const videoID = computed(() => {
//   return props.videoData.includes('v=')
//     ? props.videoData.split('v=')[1].split('&ab')[0]
//     : props.videoData.split('be/')[1];
// });

const isSchedule = ref(false);

onMounted(() => {
  setInterval(() => {
    isSchedule.value = true;
    setTimeout(() => {
      isSchedule.value = false;
    }, 6000);
  }, 15000);
});
</script>
