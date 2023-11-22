<template>
  <GiChart height="50px" :option="chartOption"></GiChart>
</template>

<script lang="ts" setup>
import { graphic } from 'echarts'
import { useLoading, useChart } from '@/hooks'
// import { ToolTipFormatterParams } from '@/types/echarts';

function graphicFactory(side: AnyObject) {
  return {
    type: 'text',
    bottom: '8',
    ...side,
    style: {
      text: '',
      textAlign: 'center',
      fill: '#4E5969',
      fontSize: 12
    }
  }
}
const { setLoading } = useLoading(true)
const xAxis = ref<string[]>([])
const chartsData = ref<number[]>([])
const graphicElements = ref([graphicFactory({ left: '2.6%' }), graphicFactory({ right: 0 })])
const { chartOption } = useChart(() => {
  return {
    grid: {
      left: '2.6%',
      right: '0',
      top: '10',
      bottom: '10'
    },
    xAxis: {
      type: 'category',
      offset: 2,
      data: xAxis.value,
      boundaryGap: false,
      axisLabel: {
        color: '#4E5969',
        formatter(value: number, idx: number) {
          if (idx === 0) return ''
          if (idx === xAxis.value.length - 1) return ''
          return `${value}`
        }
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false,
        interval: (idx: number) => {
          if (idx === 0) return false
          if (idx === xAxis.value.length - 1) return false
          return true
        },
        lineStyle: {
          color: '#E5E8EF'
        }
      },
      axisPointer: {
        show: true,
        lineStyle: {
          color: '#23ADFF',
          width: 2
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisLabel: {
        formatter(value: any, idx: number) {
          if (idx === 0) return value
          return `${value}k`
        }
      },
      splitLine: {
        show: false,
        lineStyle: {
          type: 'dashed',
          color: '#E5E8EF'
        }
      }
    },
    tooltip: {
      trigger: 'axis',
      formatter(params) {
        const [firstElement] = params as any[]
        return `<div>
            <p class="tooltip-title">${firstElement.axisValueLabel}</p>
            <div class="content-panel"><span>订单量</span><span class="tooltip-value">${(
              Number(firstElement.value) * 100
            ).toLocaleString()}</span></div>
          </div>`
      },
      className: 'echarts-tooltip-diy'
    },
    graphic: {
      elements: graphicElements.value
    },
    series: [
      {
        data: chartsData.value,
        type: 'line',
        smooth: true,
        // symbol: 'circle',
        symbolSize: 12,
        emphasis: {
          focus: 'series',
          itemStyle: {
            borderWidth: 2
          }
        },
        lineStyle: {
          width: 3,
          color: new graphic.LinearGradient(0, 0, 1, 0, [
            {
              offset: 0,
              color: 'rgba(250, 220, 25, 1)'
            },
            {
              offset: 0.5,
              color: 'rgba(255, 125, 0, 1)'
            },
            {
              offset: 1,
              color: 'rgba(245, 63, 63, 1)'
            }
          ])
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(255, 125, 0, 0.3)'
            },
            {
              offset: 1,
              color: 'rgba(250, 220, 25, 0)'
            }
          ])
        }
      }
    ]
  }
})
const fetchData = () => {
  setLoading(true)
  try {
    const data = [
      { y: 50, x: '' },
      { y: 10, x: '' },
      { y: 150, x: '' },
      { y: 80, x: '' },
      { y: 100, x: '' },
      { y: 50, x: '' },
      { y: 10, x: '' },
      { y: 160, x: '' }
    ]
    data.forEach((item: any, index: number) => {
      xAxis.value.push(item.x)
      chartsData.value.push(item.y)
      if (index === 0) {
        graphicElements.value[0].style.text = item.x
      }
      if (index === data.length - 1) {
        graphicElements.value[1].style.text = item.x
      }
    })
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    setLoading(false)
  }
}
fetchData()
</script>

<style lang="scss" scoped></style>
