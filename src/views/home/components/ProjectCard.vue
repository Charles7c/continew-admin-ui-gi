<template>
  <a-card title="项目" :bordered="false" size="medium" style="overflow: hidden">
    <a-row align="stretch">
      <a-col :xs="12" :sm="8" :md="8" v-for="(item, index) in list" :key="item.name">
        <a-card-grid class="w-full h-full">
          <a-card :bordered="false" hoverable :class="'animated-fade-up-' + index">
            <section class="item">
              <div class="head">
                <GiSvgIcon :size="30" :name="item.icon"></GiSvgIcon>
                <span class="name gi_line_1">{{ item.name }}</span>
              </div>
              <div class="middle">
                <p class="desc gi_line_2">{{ item.desc }}</p>
              </div>
              <p class="foot gi_line_1">{{ item.source }} {{ Dayjs(new Date()).format('YYYY-MM-DD') }}</p>
            </section>
          </a-card>
        </a-card-grid>
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup lang="ts">
import Dayjs from 'dayjs'
import { list } from './data'
</script>

<style lang="scss" scoped>
:deep(.arco-card) {
  height: 100%;
  .arco-card-body {
    height: 100%;
    box-sizing: border-box;
  }
}

:deep(.arco-card-header) {
  border: none;
}

.item {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.head {
  display: flex;
  align-items: center;
  .name {
    margin-left: 10px;
    font-size: 1.125rem;
    line-height: 1.75rem;
    color: var(--color-text-1);
  }
}

.middle {
  flex: 1;
  .desc {
    flex: 1;
    margin-top: 10px;
    line-height: 1.5;
    color: var(--color-text-2);
  }
}

.foot {
  font-size: 12px;
  color: var(--color-text-3);
  margin-top: 8px;
}
</style>
