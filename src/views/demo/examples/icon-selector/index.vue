<template>
  <a-space fill>
    <GiIconSelector v-model="icon"></GiIconSelector>
    <GiIconSelector v-model="icon2" type="custom"></GiIconSelector>
  </a-space>
</template>

<script setup lang="ts">
const icon = ref('')
const icon2 = ref('')
</script>
