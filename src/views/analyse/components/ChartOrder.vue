<template>
  <a-card title="订单数据" :bordered="false" class="h-full gi_card_title">
    <template #extra>
      <a-link status="warning">查看更多</a-link>
    </template>
    <VCharts :loading="loading" :option="option" autoresize :style="{ height: '300px' }"></VCharts>
  </a-card>
</template>

<script lang="ts" setup>
import VCharts from 'vue-echarts'
import { graphic } from 'echarts'
import { useChart } from '@/hooks'

const loading = ref(true)
const xData = ref<string[]>([])
const yData = ref<number[]>([])
const { option } = useChart(() => {
  return {
    grid: {
      left: '8%',
      right: '5%',
      top: '10',
      bottom: '10%'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: xData.value
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [
      {
        data: yData.value,
        type: 'bar',
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(111, 66, 251, 1)'
          },
          {
            offset: 0.5,
            color: 'rgba(36, 154, 255, 1)'
          },
          {
            offset: 1,
            color: 'rgba(30, 231, 255, 1)'
          }
        ])
      }
    ]
  }
})

const getChartData = async () => {
  try {
    const data = [
      { y: 120, x: '1月' },
      { y: 200, x: '2月' },
      { y: 150, x: '3月' },
      { y: 80, x: '4月' },
      { y: 70, x: '5月' },
      { y: 110, x: '6月' },
      { y: 130, x: '7月' },
      { y: 100, x: '8月' },
      { y: 90, x: '9月' },
      { y: 60, x: '10月' },
      { y: 140, x: '11月' },
      { y: 130, x: '12月' }
    ]
    data.forEach((item) => {
      xData.value.push(item.x)
      yData.value.push(item.y)
    })
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    loading.value = false
  }
}
getChartData()
</script>

<style lang="scss" scoped></style>