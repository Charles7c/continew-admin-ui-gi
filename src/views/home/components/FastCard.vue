<template>
  <a-card title="快捷操作" :bordered="false" size="medium" class="card gi_card_title">
    <a-card-grid v-for="(item, index) in list" :key="item.name" class="card-grid-item" :style="{ width: '33.33%' }">
      <a-card :bordered="false" hoverable>
        <a-row justify="center" align="center" :class="'animated-fade-up-' + (index + 1)">
          <a-space direction="vertical" align="center">
            <component :is="item.icon" :size="30" :style="{ color: item.color }"></component>
            <a-typography-text>{{ item.name }}</a-typography-text>
          </a-space>
        </a-row>
      </a-card>
    </a-card-grid>
  </a-card>
</template>

<script setup lang="ts">
const list = [
  { name: '主控台', icon: 'icon-dashboard', color: '#68C755' },
  { name: '列表', icon: 'icon-list', color: '#FAB251' },
  { name: '表单', icon: 'icon-file', color: '#1890FF' },
  { name: '权限管理', icon: 'icon-mind-mapping', color: '#F06B96' },
  { name: '系统管理', icon: 'icon-computer', color: '#7238D1' },
  { name: '消息', icon: 'icon-notification', color: '#5CDBD3' }
]
</script>

<style lang="scss" scoped>
.card {
  overflow: hidden;
  :deep(.arco-card-header) {
    border: none;
  }
  .card-grid-item {
    cursor: pointer;
  }
}
</style>
