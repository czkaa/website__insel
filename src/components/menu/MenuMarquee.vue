<template>
  <Vue3Marquee :duration="10" class="bg-white py-0.5 text-[orangered]"
    ><span v-html="textData" class="text-sm"></span
  ></Vue3Marquee>
</template>

<script setup>
const props = defineProps({
  textData: String,
});
</script>

<style scoped>
.marquee-container {
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  width: 100%;
}

.marquee-content {
  display: flex;
  width: 100%;
  animation: marquee 5s linear infinite;
}

.marquee-text {
  flex: none;
  padding-right: 100%;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
