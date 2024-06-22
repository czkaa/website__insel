<template>
  <div class="absolute h-full w-full">
    <div
      :style="{
        maskImage: `url(/img/${img}.svg)`,
        maskRepeat: 'no-repeat',
        maskSize: '100% 100%',
        background: backgroundColor,
        color: 'white',
        // animation: 'spin 1s ',
        // animationIterationCount: '1',
      }"
      class="relative h-full w-full min-h-0 flex justify-center items-center text-center font-sans"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const images = ['star', 'circle', 'heart', 'rectangle'];
const backgroundColors = ['yellow', 'red', 'orangered', 'lime', '#ff14ef'];
const textColors = ['blue', 'black'];

const backgroundColor = ref('white');
const textColor = ref('black');

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

backgroundColor.value = backgroundColors[getRandomInt(backgroundColors.length)];
textColor.value = textColors[getRandomInt(textColors.length)];
const img = ref(images[getRandomInt(images.length)]);
</script>

<style>
@keyframes spin {
  0% {
    transform: rotate(180deg) scale(0);
  }

  100% {
    transform: rotate(0deg) scale(1);
  }
}
</style>
