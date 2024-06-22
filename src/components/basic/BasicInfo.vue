<template>
  <div class="rounded-full overflow-hidden flex">
    <div v-if="title" class="px-3 py-1.5 bg-darkgrey shadow-custom">
      {{ title }}
    </div>
    <div v-if="text" class="px-3 py-1.5 bg-lightgrey shadow-custom">
      {{ text }}
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  text: String,
  title: String,
});
</script>
