<template>
  <RouterView class="fixed w-full h-full bg-[lime]"></RouterView>
</template>

<script setup>
import { RouterView } from 'vue-router';
</script>

<style>
html,
body {
  @apply text-root-desktop sm:text-root-mobile font-ciao;
}

.fade-enter-active,
.fade-leave-active {
  @apply duration-custom transition-opacity;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style>
