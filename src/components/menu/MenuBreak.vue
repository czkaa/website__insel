<template>
  <div class="h-full w-full bg-white flex justify-center items-center">
    <MenuMask
      ><div
        class="text-md font-sans font-ciao text-black grid grid-cols-2 gap-y-3"
      >
        <div class="text-left font-ciao">frühstück</div>
        <div class="tracking-wider">8–11</div>
        <div class="text-left font-ciao">lunch</div>
        <div class="tracking-wider">13–16</div>
        <div class="text-left font-ciao">abendessen</div>
        <div class="tracking-wider">19–22</div>
        <div class="text-left font-ciao">nachtsuppe</div>
        <div class="tracking-wider">ab 22</div>
      </div>
    </MenuMask>
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
