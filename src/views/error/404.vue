<template>
  <ErrorPage :code="404"></ErrorPage>
</template>

<script setup lang="ts">
import ErrorPage from './components/ErrorPage.vue'

defineOptions({ name: 'Error404' })
</script>

<style lang="scss" scoped></style>
