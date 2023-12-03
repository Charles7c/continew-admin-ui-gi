<template>
  <a-card title="项目" :bordered="false" size="medium" class="gi_card_title" style="overflow: hidden">
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

const list = [
  {
    name: 'Github',
    desc: '是一个面向开源及私有软件项目的托管平台',
    source: '开源君',
    icon: 'item-github'
  },
  {
    name: 'Vue',
    desc: '渐进式 JavaScript 框架',
    source: '学不动也要学',
    icon: 'item-vue'
  },
  {
    name: 'Html5',
    desc: 'HTML5是互联网的下一代标准',
    source: '撸码也是一种艺术',
    icon: 'item-html5'
  },
  {
    name: 'Angular',
    desc: '现代 Web 开发平台 百万粉丝热捧',
    source: '铁粉君',
    icon: 'item-angular'
  },
  {
    name: 'React',
    desc: '用于构建用户界面的 JavaScript 库',
    source: '技术牛',
    icon: 'item-react'
  },
  {
    name: 'Js',
    desc: '路是走出来的 而不是空想出来的',
    source: '架构组',
    icon: 'item-js'
  }
]
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