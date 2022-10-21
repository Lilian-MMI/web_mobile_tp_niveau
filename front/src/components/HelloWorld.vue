<script setup lang="ts">
defineProps<{ msg: string }>();

const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>
  <button @click="count++">Count: {{ count }}</button>
  <i class="i-geo:turf-union"></i>
</template>

<style scoped></style>
