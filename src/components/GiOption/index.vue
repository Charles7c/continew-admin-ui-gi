<template>
  <ul class="gi-option">
    <slot></slot>
  </ul>
</template>

<script setup lang="ts">
defineOptions({ name: 'GiOption' })
</script>

<style lang="scss" scoped>
.gi-option {
  width: 100%;
  min-width: 120px;
}
</style>
