<template>
  <div class="bbb">
    <a-button type="primary" @click="click">把A改成B</a-button>
  </div>
</template>

<script lang="ts" setup>
import mittBus from '@/utils/mitt'

const click = () => {
  mittBus.emit('changeText', 'B')
}
</script>

<style lang="scss" scoped>
.bbb {
  width: 400px;
  height: 400px;
  border: 1px solid var(--color-border-2);
  padding: 16px;
  box-sizing: border-box;
}
</style>
