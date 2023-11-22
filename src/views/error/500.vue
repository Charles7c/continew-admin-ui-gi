<template>
  <ErrorPage :code="500"></ErrorPage>
</template>

<script setup lang="ts">
import ErrorPage from './components/ErrorPage.vue'

defineOptions({ name: 'Error500' })
</script>

<style lang="scss" scoped></style>
