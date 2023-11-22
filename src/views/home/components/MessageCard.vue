<template>
  <a-card title="消息" :bordered="false" size="medium">
    <template #extra>
      <a-link>更多</a-link>
    </template>
    <a-comment
      v-for="(item, index) in list"
      :key="item.name"
      :author="item.name"
      :content="item.desc"
      align="right"
      :class="'animated-fade-up-' + index"
      style="overflow: hidden"
    >
      <template #avatar>
        <a-avatar
          ><img src="https://img0.baidu.com/it/u=2746352008,2041591833&fm=253&fmt=auto&app=138&f=JPEG?w=360&h=360"
        /></a-avatar>
      </template>
    </a-comment>
  </a-card>
</template>

<script setup lang="ts">
import { list } from './data'
</script>

<style lang="scss" scoped>
:deep(.arco-comment:not(:first-of-type), .arco-comment-inner-comment) {
  margin-top: 10px;
}
:deep(.arco-comment) {
  border-bottom: 1px solid var(--color-border-1);
  padding-bottom: 10px;
}
:deep(.arco-comment-content) {
  font-size: 12px;
  color: var(--color-text-3);
}
</style>
