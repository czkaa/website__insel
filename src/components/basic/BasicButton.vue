<template>
  <button basic-button class="p-3 rounded-full w-fit">
    {{ text }}
  </button>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  text: String,
});
</script>
