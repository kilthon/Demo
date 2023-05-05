<template>
  <h1>404 Not Found</h1>
</template>

<script setup>
import router from '../router';
import { onMounted } from 'vue';

onMounted(
  setTimeout(() => {
    router.push({ path: '/' });
  }, 1000)
);
</script>
