<template>
  <div class="page">
    <a-alert type="normal">
      <template #icon>
        <icon-exclamation-circle-fill />
      </template>
      <span>
        <span>这里是三级路由页面--当前页面的</span>
        <a-typography-text type="primary"> keepAlive </a-typography-text>
        <span>为 </span>
        <a-typography-text type="primary">{{ String(route.meta.keepAlive) }}</a-typography-text>
      </span>
    </a-alert>
    <a-input
      v-model="form.name"
      placeholder="请输入..."
      allow-clear
      :max-length="50"
      style="margin-top: 24px"
    ></a-input>
  </div>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'

defineOptions({ name: 'MultilevelIndexNotice' })

const route = useRoute()
const form = reactive({ name: '' })

onMounted(() => {
  Message.info(`${route.meta?.title}-触发了 onMounted`)
})

onActivated(() => {
  Message.info(`${route.meta?.title}-触发了 onActivated`)
})
</script>

<style lang="scss" scoped>
.page {
  padding: $padding;
  background-color: var(--color-bg-1);
}
</style>
