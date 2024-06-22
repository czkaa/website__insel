<template>
  <router-link
    :to="to"
    class="px-3 py-1.5 rounded-full bg-primary block w-fit color-tertiary"
  >
    {{ text }}
  </router-link>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  text: String,
  to: String,
});
</script>
