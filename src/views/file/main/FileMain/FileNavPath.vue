<template>
  <div class="file-path">
    <a-breadcrumb>
      <a-breadcrumb-item><span class="path-item">全部</span></a-breadcrumb-item>
      <a-breadcrumb-item><span class="path-item">文件夹</span></a-breadcrumb-item>
      <a-breadcrumb-item><span class="path-item">分类</span></a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.file-path {
  padding: 10px $padding;
  padding-bottom: 12px;
  display: flex;
  align-items: center;
  cursor: pointer;
  .path-item {
    font-size: 12px;
    &:hover {
      color: rgba(var(--primary-6));
    }
  }
}
</style>
