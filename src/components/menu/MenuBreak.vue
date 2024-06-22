<template>
  <div class="h-full w-full bg-white flex justify-center items-center">
    <!-- <MenuMask><img class="w-full h-full" :src="image" /></MenuMask> -->
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  imageData: Array,
});

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const image = ref(props.imageData[getRandomInt(props.imageData.length)]);

watch(image, async (newVal, oldVal) => {
  console.log('VALUE', newVal, imageData.value);
});
</script>
