<template>
  <div
    v-if="videoData && textData && imageData"
    class="w-full h-full flex flex-col overflow-hidden text-lg"
  >
    <div class="w-full h-full relative">
      <transition name="width">
        <MenuCourse
          class="absolute w-full h-full"
          :course="currentCourse"
          :imageData="imageData"
          v-if="currentCourse"
          key="course"
        />
        <MenuBreak
          class="absolute w-full h-full"
          :videoData="videoData"
          v-else
          key="break"
        />
      </transition>
    </div>

    <MenuMarquee :textData="textData" v-if="textData.length > 0" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { fetchData } from '@/composables/fetchData';
import MenuSchedule from './MenuSchedule.vue';

const sheetID = '1iv4XUexJHJZEWLtKaGMM93PRBYmlGvmCxkMFly0sv8g';
const gids = ['0'];
const { data } = fetchData(sheetID, gids);

const imageData = computed(() => {
  return data.value[0]
    ? data.value[0]
        .slice(1) // Skip the first array
        .map((item) => item[1]) // Get the second element of each remaining sub-array
        .filter((item) => item !== null) // Remove items which are null
    : null;
});

const textData = computed(() => {
  return data.value[0]
    ? '&nbsp;&nbsp;&nbsp+ + +&nbsp;&nbsp;&nbsp' +
        data.value[0]
          .slice(1) // Skip the first item
          .map((item) => item[0]) // Get the first element of each sub-array
          .join('&nbsp;&nbsp;&nbsp;+ + +&nbsp;&nbsp;&nbsp;')
    : null; // Join with ' +++ '
});

const videoData = computed(() => {
  return data.value[0] && data.value[0][1] && data.value[0][1][2]
    ? data.value[0][1][2]
    : null;
});

const props = defineProps({
  menu: Object,
  previousMenu: Object,
  currentHour: Number,
});

const currentCourse = computed(() => {
  return getCurrentCourse(props.menu);
});

const getCurrentCourse = () => {
  if (props.currentHour < 2 && props.previousMenu) {
    return props.previousMenu.supper;
  } else if (props.currentHour >= 8 && props.currentHour < 11) {
    return props.menu.breakfast;
  } else if (props.currentHour >= 13 && props.currentHour < 16) {
    return props.menu.lunch;
  } else if (props.currentHour >= 19 && props.currentHour < 21) {
    return props.menu.dinner;
  } else if (props.currentHour >= 22 && props.currentHour < 24) {
    return props.menu.supper;
  } else {
    return null;
  }
};
</script>

<style>
.width-enter-active,
.width-leave-active {
  transition: all 0.3s;
  overflow: hidden;
  position: absolute;
}

.width-enter-active {
  transform-origin: center;
  right: 0;
}

.width-leave-active {
  transform-origin: center;
  right: 0;
}

.width-enter-from,
.width-leave-to {
  transform: scaleX(0);
}
.width-enter-to,
.width-leave-from {
  transform: scaleX(1) rotate(360deg);
}
</style>
