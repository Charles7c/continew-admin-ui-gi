<template>
  <div class="gi_page analyse">
    <section class="head">
      <a-row :gutter="14">
        <a-col :xs="12" :md="12" :lg="6" :xl="6" :xxl="6">
          <a-card title="访问量" :bordered="false" class="card">
            <template #extra>
              <a-tag color="green" bordered>日</a-tag>
            </template>
            <a-statistic :value="26868" :value-from="0" :start="true" animation show-group-separator> </a-statistic>
            <section class="card-content">
              <a-space>
                <span><span>日同比 12.5%</span><icon-caret-up style="color: rgb(var(--success-6))" /></span>
                <span><span>周同比 5%</span><icon-caret-down style="color: rgb(var(--warning-6))" /></span>
              </a-space>
            </section>
            <a-divider></a-divider>
            <a-row justify="space-between">
              <a-typography-text type="secondary">总访问量</a-typography-text>
              <a-typography-text type="secondary">280万</a-typography-text>
            </a-row>
          </a-card>
        </a-col>
        <a-col :xs="12" :md="12" :lg="6" :xl="6" :xxl="6">
          <a-card title="销售额" :bordered="false" class="card">
            <template #extra>
              <a-tag color="arcoblue" bordered>月</a-tag>
            </template>
            <a-statistic :value="12000" :value-from="0" :start="true" animation show-group-separator></a-statistic>
            <section class="card-content">
              <a-progress
                size="large"
                :percent="percent"
                animation
                :color="{
                  '0%': 'rgb(var(--success-2))',
                  '100%': 'rgb(var(--success-5))'
                }"
              />
            </section>
            <a-divider></a-divider>
            <a-row justify="space-between">
              <a-typography-text type="secondary">总销售额</a-typography-text>
              <a-typography-text type="secondary">68万</a-typography-text>
            </a-row>
          </a-card>
        </a-col>
        <a-col :xs="12" :md="12" :lg="6" :xl="6" :xxl="6">
          <a-card title="订单量" :bordered="false" class="card">
            <template #extra>
              <a-tag color="orange" bordered>季</a-tag>
            </template>
            <a-statistic :value="1680" :value-from="0" :start="true" animation show-group-separator></a-statistic>
            <section class="card-content">
              <OrderChart></OrderChart>
            </section>
            <a-divider></a-divider>
            <a-row justify="space-between">
              <a-typography-text type="secondary">转化率</a-typography-text>
              <a-typography-text type="secondary">60%</a-typography-text>
            </a-row>
          </a-card>
        </a-col>
        <a-col :xs="12" :md="12" :lg="6" :xl="6" :xxl="6">
          <a-card title="新增用户" :bordered="false" class="card">
            <template #extra>
              <a-tag color="purple" bordered>周</a-tag>
            </template>
            <a-statistic :value="128" :value-from="0" :start="true" animation>
              <template #suffix>位</template>
            </a-statistic>
            <section class="card-content">
              <a-avatar-group :size="24" :max-count="3">
                <a-avatar :style="{ backgroundColor: '#7BC616' }">A</a-avatar>
                <a-avatar :style="{ backgroundColor: '#14C9C9' }">B</a-avatar>
                <a-avatar :style="{ backgroundColor: '#168CFF' }">C</a-avatar>
                <a-avatar :style="{ backgroundColor: '#FF7D00' }">Arco</a-avatar>
                <a-avatar :style="{ backgroundColor: '#FFC72E' }">Design</a-avatar>
              </a-avatar-group>
            </section>
            <a-divider></a-divider>
            <a-row justify="space-between">
              <a-typography-text type="secondary">总用户</a-typography-text>
              <a-typography-text type="secondary">10800人</a-typography-text>
            </a-row>
          </a-card>
        </a-col>
      </a-row>
      <a-row :gutter="14">
        <a-col
          :xs="12"
          :sm="8"
          :md="4"
          :lg="4"
          :xl="3"
          :xxl="3"
          v-for="(item, index) in list"
          :key="item.name"
          :class="'animated-fade-up-' + index"
        >
          <a-card hoverable :bordered="false" class="mini-card">
            <a-row justify="center" align="center" style="flex-direction: column">
              <GiSvgIcon :name="item.icon" :size="30" color="rgb(var(--primary-3))"></GiSvgIcon>
              <span>{{ item.name }}</span>
            </a-row>
          </a-card>
        </a-col>
      </a-row>
    </section>
    <DataChart></DataChart>
  </div>
</template>

<script lang="ts" setup>
import DataChart from './components/DataChart.vue'
import OrderChart from './components/OrderChart.vue'

defineOptions({ name: 'AnalyseIndex' })

const list = [
  { name: '用户', icon: 'icon-user' },
  { name: '分析', icon: 'icon-analyse' },
  { name: '商品', icon: 'icon-goods' },
  { name: '订单', icon: 'icon-order' },
  { name: '票据', icon: 'icon-paper' },
  { name: '标签', icon: 'icon-label' },
  { name: '流程', icon: 'icon-process' },
  { name: '配置', icon: 'icon-config' }
]

const percent = ref(0)

setTimeout(() => {
  percent.value = 0.6
}, 100)
</script>

<style lang="scss" scoped>
:deep(.arco-divider-horizontal) {
  margin: 16px 0;
}

.analyse {
  .card {
    margin-bottom: $margin;
    :deep(.arco-tag-size-medium) {
      width: 24px;
      padding: 0;
      justify-content: center;
    }
    .card-content {
      height: 30px;
      display: flex;
      align-items: center;
    }
  }
  .mini-card {
    transition: transform 0.3s;
    margin-bottom: $margin;
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      cursor: pointer;
    }
    span {
      margin-top: 8px;
    }
  }
}
</style>
