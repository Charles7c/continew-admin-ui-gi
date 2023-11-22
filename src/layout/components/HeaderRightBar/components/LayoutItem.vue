<template>
  <div class="layout-item" :class="[`layout-item-${mode}`, { actived: actived }]" @click="emit('click')">
    <div class="item"></div>
    <div class="item">
      <template v-if="mode === 'mix'">
        <div class="left"></div>
        <div class="right"></div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  mode: 'left' | 'top' | 'mix'
  actived?: boolean
}

withDefaults(defineProps<Props>(), {
  actived: false
})

const emit = defineEmits(['click'])
</script>

<style lang="scss" scoped>
.layout-item {
  width: 60px;
  height: 50px;
  background-color: var(--color-fill-3);
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  cursor: pointer;
  box-sizing: border-box;
  &.actived {
    border: 2px solid rgb(var(--primary-5));
  }
  &-left {
    .item {
      &:first-child {
        width: 12px;
        background-color: #333;
      }
    }
  }
  &-top {
    flex-direction: column;
    .item {
      &:first-child {
        height: 10px;
        background-color: #333;
      }
    }
  }
  &-mix {
    flex-direction: column;
    .item {
      &:first-child {
        height: 10px;
        background-color: #333;
      }
      &:last-child {
        flex: 1;
        display: flex;
      }
      .left {
        width: 12px;
        background-color: #333;
      }
    }
  }
}
</style>
