<template>
  <div class="aaa">
    <h3>{{ text }}</h3>
  </div>
</template>

<script lang="ts" setup>
import mittBus from '@/utils/mitt'

const text = ref('A')
mittBus.on('changeText', (e) => {
  text.value = e
})
</script>

<style lang="scss" scoped>
.aaa {
  width: 400px;
  height: 400px;
  border: 1px solid var(--color-border-2);
  padding: 16px;
  box-sizing: border-box;
  h3 {
    font-size: 28px;
  }
}
</style>
