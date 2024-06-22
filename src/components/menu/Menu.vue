<template>
  <div class="w-full h-full flex flex-col overflow-hidden text-lg">
    <div class="w-full h-full relative">
      <transition name="width" mode="in-out">
        <MenuCourse
          class="absolute w-full h-full"
          :course="currentCourse"
          v-if="currentCourse && !isSaver"
          key="course"
        />
        <MenuBreak
          class="absolute w-full h-full"
          :imageData="imageData"
          v-else-if="imageData.length > 0"
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

const sheetID = '1iv4XUexJHJZEWLtKaGMM93PRBYmlGvmCxkMFly0sv8g';
const gids = ['0'];
const { data } = fetchData(sheetID, gids);
const imageData = computed(() => {
  return data.value[0]
    ? data.value[0]
        .slice(1) // Skip the first array
        .map((item) => item[1])
    : []; // Get the second element of each remaining sub-array
});
const textData = computed(() => {
  return data.value[0]
    ? '&nbsp;&nbsp;&nbsp+ + +&nbsp;&nbsp;&nbsp' +
        data.value[0]
          .slice(1) // Skip the first item
          .map((item) => item[0]) // Get the first element of each sub-array
          .join('&nbsp;&nbsp;&nbsp;+ + +&nbsp;&nbsp;&nbsp;')
    : ''; // Join with ' +++ '
});

const props = defineProps({
  menu: Object,
  previousMenu: Object,
});

const currentHour = new Date().getHours();

const getCurrentCourse = () => {
  if (currentHour < 2 && props.previousMenu) {
    return props.previousMenu.supper;
  } else if (currentHour >= 8 && currentHour < 11) {
    return props.menu.breakfast;
  } else if (currentHour >= 13 && currentHour < 16) {
    return props.menu.lunch;
  } else if (currentHour >= 19 && currentHour < 22) {
    return props.menu.dinner;
  } else if (currentHour >= 22 && currentHour < 24) {
    return props.menu.supper;
  } else {
    return null;
  }
};

const isSaver = ref(false);
const currentCourse = computed(() => {
  return getCurrentCourse(props.menu);
});

onMounted(() => {
  setInterval(() => {
    isSaver.value = true;
    setTimeout(() => {
      isSaver.value = false;
    }, 4000);
  }, 15000);
});
</script>

<style>
.width-enter-active,
.width-leave-active {
  transition: all 0.5s;
  overflow: hidden;
  position: absolute;
}

.width-enter-active {
  transform-origin: right bottom;
  right: 0;
}

.width-leave-active {
  transform-origin: left top;
  left: 0;
}

.width-enter-from,
.width-leave-to {
  transform: scaleY(0);
}
.width-enter-to,
.width-leave-from {
  transform: scaleY(1);
}
</style>
