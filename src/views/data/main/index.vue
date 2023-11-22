<template>
  <div class="manage">
    <section class="tab">
      <a-tabs hide-content size="medium" :active-key="activeKey" @change="change">
        <a-tab-pane :key="1" title="人员管理"> </a-tab-pane>
        <a-tab-pane :key="2" title="单位管理"> </a-tab-pane>
      </a-tabs>
    </section>

    <transition name="fade-slide" mode="out-in" appear>
      <keep-alive>
        <component :is="PaneMap[activeKey]"></component>
      </keep-alive>
    </transition>
  </div>
</template>

<script setup lang="ts">
import Pane1 from './Pane1.vue'
import Pane2 from './Pane2.vue'
import type { Component } from 'vue'

defineOptions({ name: 'DataIndex' })
const route = useRoute()
const router = useRouter()

const PaneMap: Record<number, Component> = {
  1: Pane1,
  2: Pane2
}

const activeKey = ref(1)

watch(
  () => route.query,
  () => {
    if (route.query.tabKey) {
      activeKey.value = Number(route.query.tabKey)
    }
  },
  { immediate: true }
)

const change = (key: number | string) => {
  activeKey.value = key as number
  router.replace({ path: route.path, query: { tabKey: key } })
}
</script>

<style lang="scss" scoped>
.manage {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .tab {
    background: var(--color-bg-1);
  }
}
</style>
