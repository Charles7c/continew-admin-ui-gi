<template>
  <a-button size="mini" class="gi_hover_btn menu-fold-btn" @click="appStore.setMenuCollapse(!appStore.menuCollapse)">
    <template #icon>
      <icon-menu-fold v-if="!appStore.menuCollapse" :size="18" :stroke-width="3" />
      <icon-menu-unfold v-else :size="18" :stroke-width="3" />
    </template>
  </a-button>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores'

defineOptions({ name: 'MenuFoldBtn' })
const appStore = useAppStore()
</script>

<style lang="scss" scoped>
.menu-fold-btn {
  background-color: var(--color-secondary-hover) !important;
  flex-shrink: 0;
}
</style>
