<template>
  <LayoutMix v-if="appStore.layout === 'mix' && isDesktop"></LayoutMix>
  <LayoutDefault v-else></LayoutDefault>
</template>

<script setup lang="ts">
import LayoutDefault from './LayoutDefault.vue'
import LayoutMix from './LayoutMix.vue'
import { useAppStore } from '@/stores'
import { useDevice } from '@/hooks'

defineOptions({ name: 'Layout' })
const appStore = useAppStore()
const { isDesktop } = useDevice()
</script>

<style lang="scss" scoped></style>
