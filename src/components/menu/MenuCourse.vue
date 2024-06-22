<template>
  <div style="filter: contrast(100)" class="w-full h-full flex flex-col">
    <div class="h-1/2 text-lg shrink-0 relative">
      <MenuMask
        :key="key"
        :style="{
          transition: 'all 0.75s',
          transform:
            stage === 0
              ? 'scale(0)'
              : stage === 1
              ? 'scaleY(1.5)'
              : stage === 2
              ? 'scale(1)'
              : stage === 3
              ? 'scale(1)'
              : stage === 4
              ? 'scaleY(0)'
              : 'scale(0)',
          transformOrigin: 'top center',
        }"
      >
        <span class="font-ciao p-10 mix-blend-exclusion">{{
          course.course
        }}</span></MenuMask
      >
    </div>
    <div class="w-full h-full flex relative">
      <MenuMask
        :key="key"
        :style="{
          transition: 'all 0.75s',
          transform:
            stage === 0
              ? 'scale(0)'
              : stage === 1
              ? 'scaleY(0.5) '
              : stage === 2
              ? 'scaleX(1)'
              : stage === 3
              ? 'scaleX(0.5) translateX(-50%) '
              : stage === 4
              ? 'scaleX(1) scaleY(2)'
              : 'scaleY(0)',
          transformOrigin: 'bottom center',
          left: '0',
        }"
      >
        <span
          class="w-[75vw] h-screen flex justify-center items-center text-md shrink-0 mix-blend-difference py-10"
          flex
          justify-center
          items-center
          >{{ course.name }}</span
        >
      </MenuMask>

      <MenuMask
        :key="key"
        :style="{
          transition: 'all 0.75s',
          transform:
            stage === 0
              ? 'scale(0)'
              : stage === 1
              ? 'scale(0) '
              : stage === 2
              ? 'scale(0) rotate(180deg)'
              : stage === 3
              ? 'scaleX(0.5)'
              : stage === 4
              ? 'scale(0)'
              : 'scale(0)',
          transformOrigin: 'bottom right',
          right: '0',
        }"
      >
        <span
          class="text-sm w-[50vw] h-screen flex justify-center items-center mx-auto shrink-0 mix-blend-difference"
          >{{ course.allergies }}</span
        >
      </MenuMask>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const stage = ref(0);
const key = ref(0);

onMounted(() => {
  setInterval(() => {
    if (stage.value < 5) {
      stage.value++;
    } else {
      stage.value = 0;
      key.value++;
    }
  }, 1500);
});

const props = defineProps({
  course: Object,
});
</script>

<style>
@keyframes grow-shrink {
  0% {
    width: 0;
    height: 0%;
    transform: rotate(180deg);
  }
  35% {
    width: 100%;
    height: 100%;
    transform: rotate(0deg);
  }
  85% {
    width: 100%;
    height: 100%;
    transform: rotate(0deg);
  }
  100% {
    width: 0;
    height: 0%;
    transform: rotate(180deg);
  }
}
</style>
